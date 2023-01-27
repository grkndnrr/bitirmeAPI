import winston, { format, transports } from 'winston';
import { LogType } from './helper/enums';

export default class ApiLogger {
  static logger: winston.Logger = null;

  static async initialize() {
    this.logger = winston.createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      defaultMeta: { service: 'API' },
      transports: [
        new transports.Console({}),
        //new winston.transports.File({ filename: '_log/error.log', level: 'error' }),
        //new winston.transports.File({ filename: '_log/info.log', level: 'info' }),
      ],
    });

    this.logger.info('[LOGGER] STARTED');
  }
  static async log(data, type: LogType = LogType.Info) {
    if(!this.logger)
      return;
    const message = typeof data === 'object' ? JSON.stringify(data) : data;
    if (type == 'INFO') await this.logger.info(message);
    else if (type == 'ERROR') await this.logger.error(message);
  }
}
