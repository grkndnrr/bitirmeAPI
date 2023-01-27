import ApiLogger from '../../logger';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {studentRouter} from "./student";
import {lecturerRouter} from "./lecturer";
const basePath = '/v1';

export const apiRouter = (serviceLocator) => {
  const routes = express.Router();

  routes.route('/').get((req, res) => {
    res.send('Senior Project BACKEND V1 - NODEJS');
  });
  routes.use(`${basePath}/lecturer`, lecturerRouter(serviceLocator()));
  routes.use(`${basePath}/student`, studentRouter(serviceLocator()));

  try {
    /* eslint @typescript-eslint/no-var-requires: "off" */
    routes.use(`${basePath}/api-doc`, swaggerUi.serve, swaggerUi.setup(require('../../swagger.json')));
  } catch (err) {
    ApiLogger.log(`[API DOC] Swagger.json notfound`);
  }

  ApiLogger.log(`[API DOC] Generated. ${basePath}/api-doc`);

  return routes;
};
