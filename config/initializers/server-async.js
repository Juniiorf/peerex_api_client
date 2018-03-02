import bodyParser from 'body-parser';
import express from 'express';
import https from 'https';
import timeout from 'connect-timeout';
import git from 'git-rev';

import { logger, expressWinstonMiddleware, expressWinstonErrorMiddleware } from './logger';
import errorHandlerMiddleware from '../../middlewares/error-handler';
import i18n from './i18n';
import routes from './routes';
import graphql from './graphql';

const app = express();
const env = process.env;

const startAsync = new Promise((resolve, reject) => {
  app.use(i18n.init);
  app.use(timeout(env.NODE_REQ_TIMEOUT || 360000));

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

  app.all('/*', (req, res, next) => {
    const allowHeaders = 'Content-type,Accept,Accept-Encoding,Accept-Language,X-Access-Token,X-Key,Authorization';
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', allowHeaders);
    i18n.setLocale(req.language);

    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

  // routing logger
  app.use(expressWinstonMiddleware);

  // error logger and handler
  app.use(expressWinstonErrorMiddleware);
  routes(app);

  app.use(errorHandlerMiddleware);

  app.get('/', (req, res) => res.status(200).json({}));
  app.get('/lb', (req, res) => res.status(200).json({}));
  app.get('/version', (req, res) => {
    git.short((short) => {
      git.tag(tag => res.status(200).json({ s: short, t: tag }));
    });
  });

  let isRunningOnHTTP = false;
  let isRunningOnHTTPs = false;

  const server = app.listen(env.NODE_PORT || 5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`[SERVER] Running at http://${host}:${port}`);
    isRunningOnHTTP = true;

    if (isRunningOnHTTPs) {
      resolve();
    }
  });

  server.on('error', (e) => {
    const host = e.address;
    const port = e.port;

    logger.error(`Failed to run at http://${host}:${port} (${e.code})`);
  });

  const httpsServer = https.createServer({}, app).listen(process.env.NODE_PORT_SSL || 5001, () => {
    const host = httpsServer.address().address;
    const port = httpsServer.address().port;
    logger.info('[SERVER] Running on at https://%s:%s', host, port);
    isRunningOnHTTPs = true;
    if (isRunningOnHTTP) { resolve(); }
  });

  httpsServer.on('error', (e) => {
    const host = e.address;
    const port = e.port;
    logger.error(`Failed to run at https://${host}:${port} (${e.code})`);
    reject(e);
  });

  graphql(app);
  server.timeout = 0;
  httpsServer.timeout = 0;
  return app;
});

export {
  app,
  startAsync,
};
