import humps from 'humps';

export default class Utils {
  /* eslint @typescript-eslint/no-explicit-any: "off" */
  static SUCCESS_RESPONSE = <T>(ctx: any, result: T) => {
    ctx.status(200).send(humps.camelizeKeys(result));
  };

  static REQUEST_HANDLER = (ctx: any, inputs: any, controller: any) => {
    let response: any;
    if (inputs.method == 'GET' && inputs.params.uniqueKey) {
      response = controller.get(inputs.params.uniqueKey);
    } else if (inputs.method == 'GET') {
      response = controller.list();
    } else if (inputs.method == 'POST') {
      response = controller.add(inputs.body);
    } else if (inputs.method == 'PUT') {
      response = controller.update(inputs.body);
    } else if (inputs.method == 'DELETE') {
      response = controller.delete(inputs.params.uniqueKey);
    }
    return response;
  };
}
