import i18n from 'i18n';

export default (statusCode, code, message, localize, path, locations, type) => ({
  statusCode,
  type,
  code,
  message: localize ? i18n.__(message) : message,
  path,
  locations,
});
