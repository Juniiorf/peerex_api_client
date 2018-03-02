import Helper from '../../../../lib/helper';

/**
 * This class handles all authentication related functions for GraphQL
 */
export default class AuthHandler {

  /**
   * Check if user type is in the list of provided roles
   * @param roles   List of user types
   * @param aud     User type to be checked
   * @returns {boolean} Returns weather the user is in the list of roles or not
   */
  static checkUserRoles(roles, aud) {
    if (!(roles || []).length) return true;
    return roles.indexOf(aud) >= 0;
  }

  /**
   * Resolves requested access according to the provided roles and returns the requested field.
   * @param roles     Array of roles from UserRoles
   * @returns {function()}  Returns a GraphQL resolve function
   */
  static resolveFieldAccess(roles, _fieldName) {
    return (obj, params, context, info) =>
      // TODO: Fix this
       obj[_fieldName || info.fieldName]
      // return (
      //   AuthHandler.checkUserRoles(roles, obj.user.aud) ? obj[_fieldName || info.fieldName] : null
      // );
    ;
  }

  static resolveAccess(accessResolvers, next) {
    return (root, params, context) => {
      const fns = typeof accessResolvers === 'object' && Array.isArray(accessResolvers) ? accessResolvers : [accessResolvers]; //eslint-disable-line

      for (const resolve of fns) {
        if (typeof resolve !== 'function') continue; //eslint-disable-line
        if (!resolve(root, params, context)) return Promise.reject(Helper.formatErrorObject(401, 'GLO0003', 'global.notAuthorized', true)); //eslint-disable-line
      }

      return next ? next(root, params, context) : null;
    };
  }
}
