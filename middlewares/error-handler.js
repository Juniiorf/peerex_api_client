import { error, capitalize } from '../lib/util';
import { logger } from '../config/initializers/logger';

const prepareResponse = (code, description) => ({
  code,
  description,
});

module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (!err) {
    next();
    return;
  }

  let _err = err;

  if (err.name === 'UnauthorizedError') {
    _err = error('GLO0003');
  }

  if (!err.code) {
    logger.error(err);
    _err = error('GLO0001');
  }

  const statusCode = Number(_err.statusCode) || Number(_err.status) || Number(_err.httpStatus) || 500;
  const code = _err.code || 'GLO0001';
  const description = capitalize(_err.description || _err.message || 'Houve um erro.');

  const response = prepareResponse(code, description);
  res.status(statusCode || 400).json(response);
};
