import {verify, decode, JsonWebTokenError} from 'jsonwebtoken';
import CreateError from 'http-errors';
import Utils from '../../helper/utils';
import {DELIMITERS, ErrorCodes, HTTP_STATES} from '../../helper/enums';

const { JWT_KEY } = process.env;
// Gönderilen istekteki content-type ve schema kontrolü
const validateSchema = (schema) => async (ctx, inputs) => {
  if (inputs.method === 'POST' || inputs.method === 'PUT') {
    if (inputs.headers['content-type'] !== 'application/json') {
      throw new CreateError(400, 'NOT_ALLOWED_CONTENT_TYPE');
    }
    if (Utils.isReallyNull(inputs.body)) {
      throw new CreateError(400, 'NOT_ALLOWED_EMPTY_BODY');
    }

    if (schema) {
      const result = schema.validate(inputs.body);
      if (!result.error) {
        await ctx.next();
      } else {
        throw new CreateError(400, result.error.details[0].message);
      }
    } else await ctx.next();
  } else await ctx.next();
};
// Authorization token kontrolü
const validateAuth = () => async (ctx, inputs) => {
  if (inputs.headers.authorization) {
    const token = inputs.headers.authorization.replace('Bearer ', '');
    const promise = (): Promise<{ err: JsonWebTokenError }> => {
      return new Promise((resolve) => {
        verify(token, JWT_KEY, (err: JsonWebTokenError) => {
          resolve({ err });
        });
      });
    };
    /* eslint @typescript-eslint/no-explicit-any: "off" */
    const promiseRes: { err: JsonWebTokenError } = await promise();
    if ( promiseRes?.err?.name == "TokenExpiredError" ) throw new CreateError(401, ErrorCodes.JWTExpired)
    else {
      ctx.userData = decode(token);
      ctx.user = () => ctx.userData;
      Object.assign(inputs.body, { user: ctx.userData });
      await ctx.next();
    }
  } else {
    throw new CreateError(401, ErrorCodes.UnAuthorizedToken);
  }
};

// Ara katman tanımları
export default class MiddlewareHandler {
  /* eslint @typescript-eslint/no-explicit-any: "off" */
  stack: Array<any> = [];
  constructor() {
    this.stack = [];
  }
  // Schema kontrolü
  validate(schema) {
    this.stack = [
      {
        fn: validateSchema(schema),
      },
      ...this.stack,
    ];
    return this;
  }
  // Auth kontrolü
  auth() {
    this.stack = [
      {
        fn: validateAuth(),
      },
      ...this.stack,
    ];
    return this;
  }
  // Asıl fonksiyonun çalıştırılması
  use(fn) {
    this.stack.push({
      fn,
    });
    return this;
  }
  // Adımları tanımlar
  iterate(args, iterator) {
    let arg;
    for (let i = 0; i < args.length; i++) {
      arg = args[i];
      this.stack.push({
        fn: iterator(arg),
      });
    }
    return this;
  }
  // Asıl fonksiyonu koşullu çalıştırılması
  useIf(predicate, fn) {
    this.stack.push({
      fn,
      predicate,
      optional: true,
    });
    return this;
  }
  // Hata durumunda dinlenmek istenen fonksiyon
  catch(fn) {
    this.stack.push({
      fn,
      error: true,
    });
    return this;
  }
  // İsteklerin karşılanması
  listen() {
    const self = this;
    // Express apideki karşılıkları - inputs=request, context=response
    return async (inputs, context, ...args) => await self._handle(context, inputs, ...args);
  }
  // İşleme
  async _handle(ctx, input, ...args) {
    /* eslint @typescript-eslint/no-explicit-any: "off" */
    /* eslint @typescript-eslint/no-unused-vars: "off" */
    const originalDoneImplementation = (params: any) => {
      ctx.status(200).send();
    };
    const { stack } = this;
    let index = 0;
    let doneWasCalled = false;

    ctx.done = async (...params) => {
      if (doneWasCalled) return;
      doneWasCalled = true;
      originalDoneImplementation(params);
    };

    ctx.next = async (err) => {
      try {
        const layer = stack[index++];
        // Katman yok ise
        if (!layer) return await ctx.done(err);
        // Hata durumunu dinleyen fonksiyon yönlendirmesi
        if (err && layer.error) return await layer.fn(err, ctx, input, ...args);
        // Hata durumu veya hata dinleyen fonksiyon var ise sonraki adıma geçme
        if (err || layer.error) return await ctx.next(err);
        // Koşullu istek var ise yönlendirme
        if (layer.optional && !layer.predicate(ctx, input)) return await ctx.next();

        // Fonksiyonun çalıştırılması
        return await layer.fn(ctx, input, ...args);
      } catch (e) {
        console.log(e);
        let response: {
          code: number,
          message: string
        };
        let statusCode: number
        switch (e.status) {
          case HTTP_STATES.DEFAULT_ERROR:
          case HTTP_STATES.UNAUTHORIZED:
          case HTTP_STATES.NOT_PERMITTED: {
            statusCode = e.status
            response = {
              code: e.message,
              message: Object.entries(ErrorCodes).find(([key, error]) => error == e.message)[0]
            };
            break;
          }
          default  : {
            statusCode = 500
            response = {
              code: 500,
              message: e.message
            };
          }
        }
        ctx.status(statusCode).send(response);
        ctx.done();
      }
    };
    await ctx.next();
  }
}
