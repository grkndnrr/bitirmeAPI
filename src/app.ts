import './config';
import { Server } from './api/server';
import ApiLogger from './logger';
import { LogType } from './helper/enums';

class App {
  static async initialize() {
    ApiLogger.initialize();

    ApiLogger.log('[API] STARTING');
    const server = new Server();
    /* eslint @typescript-eslint/no-explicit-any: "off" */
    const serverInstance: any = await server.create();
    serverInstance.listen( process.env.PORT, () => {
      ApiLogger.log( `[EXPRESS] http://localhost:${process.env.PORT}` )
    } )
    return serverInstance;
  }
}
App.initialize()
  .then(() => {
    // server oluşturulduktan sonra yapılmak istenen işlem var ise burada yapılacak
    ApiLogger.log('[API] STARTED');

    // RTC Controller
  })
  .catch((err) => {
    // Handle Error
    ApiLogger.log(err, LogType.Error);
  });
