import { urlencoded, json } from 'body-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { apiRouter } from './routes';
import cors from "cors";
import {services} from "../infastructure/servicelocator";

export class Server {
  /* eslint @typescript-eslint/no-explicit-any: "off" */
  app: any = null;

  constructor() {
    this.app = express();
    this.config();

    this.app.set('serviceLocator', services);
    this.app.use('/', apiRouter(this.app.get('serviceLocator')));

  }

  config() {
    this.app.use(cookieParser());
    
    this.app.use(cors()); // For Development Purposes

    this.app.use(
      fileUpload({
        createParentPath: true,
      }),
    );
    this.app.use(
      urlencoded({
        extended: true,
      }),
    );
    this.app.use(
      json({
        limit: '50mb',
      }),
    );
    this.app.use(
      json({
        type: 'application/vnd.api+json',
      }),
    );
    this.app.use(methodOverride('X-HTTP-Method-Override'));
    this.app.use((_req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });

    this.app.use((err, _req, res, next) => {
      res.status(err.status || 500).json({
        code: 0,
        msg: 'Success',
      });
      next(err);
    });
  }

  async create() {
    return new Promise((resolve) => {
      resolve(createServer(this.app));
    });
  }
}
