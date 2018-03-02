import moment from 'moment-timezone';
import dotenv from 'dotenv';

import { logger } from './config/initializers/logger';
import { app, startAsync } from './config/initializers/server-async';
import database from './config/initializers/database-async';

// Load environment settings from .env file
dotenv.config({ path: `${__dirname}/.env` });

// set default server timezone before everything
moment.tz.setDefault('Greenwich');

logger.info(`[APP] Starting server initialization on ENV: ${process.env.NODE_ENV}`);


const jobs = [
  database(process.env),
  startAsync,
];

Promise.all(jobs)
  .then(() => logger.info('[APP] Initialized SUCCESSFULLY.'))
  .catch(e => logger.error('[APP] Initialization failed.', e));

export default app;
