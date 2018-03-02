import i18n from '../../config/initializers/i18n';
import errors from '../errors/codes.json';

export default (code, httpStatus = null, description = null) => ({
  code,
  httpStatus: httpStatus || (errors[code] || {}).httpStatus || 400,
  description: description || i18n.__((errors[code] || {}).i18n || 'global.general'),
});
