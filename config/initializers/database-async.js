import mongoose from 'mongoose';

import { logger } from './logger';

export default env => new Promise((resolve, reject) => {
  logger.info(`[DATABASE] Starting Mongoose DB at: ${env.DATABASE_SERVER}`);

  // only recommended to set Promise until mongoose 5
  mongoose.Promise = global.Promise;

  const options = { promiseLibrary: global.Promise, useMongoClient: true };
  mongoose.connect(env.DATABASE_MAIN_URL, options, (err) => {
    if (err || !mongoose.connection.readyState) {
      reject(err);
      logger.error(err.message || err || 'Failed to connect to database.');
    } else {
      resolve();
      logger.info('[DATABASE] DB Started SUCCESSFULLY');
    }
  });
});
