import padLeft from 'pad-left';
import I18nMongooseError from 'mongoose-i18n-error';
import i18n from 'i18n';

import formatGraphQLErrorObject from '../../../../lib/util/format-graphql-error';
import { logger } from '../../../../config/initializers/logger';

const i18nMongooseError = new I18nMongooseError({ prefix: 'modelValidationErrors.' });

export default (err) => {
  const error = err.originalError || err;
  const description = (error.description || error.message) || 'global.general';

  logger.debug(error);
  const mongooseErrors = i18nMongooseError.parseValidationError(error, i18n.__);

  // Validate mongoose errors
  if (mongooseErrors) {
    const _mongooseErrors = Object.values(mongooseErrors).map(v => v.message).join('; ');
    try {
      return formatGraphQLErrorObject(422, 'MGO0001', _mongooseErrors, false);
    } catch (e) {
      logger.error(e);
    }
  }

  if (error.name === 'UnauthorizedError') {
    return formatGraphQLErrorObject(401, 'GLO0003', 'global.notAuthorized', true);
  }
  if (error.name === 'MongoError') {
    return formatGraphQLErrorObject(400, `MONGO${padLeft(error.code, 3, '0')}`, description, false);
  }

  const statusCode = Number(error.statusCode) || Number(error.status) || Number(error.httpStatus) || 500;
  const type = error.type || error.name;
  const code = description === 'global.general' ? 'GLO0001' : (error.code || error.type || 'GRAPHQL');
  const localize = description === 'global.general';

  if (statusCode >= 500) logger.error(error);

  return formatGraphQLErrorObject(statusCode, code, description, localize, err.path, err.locations, type);
};
