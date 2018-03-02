import jwt from 'jsonwebtoken';
import { pick } from 'lodash';

import error from '../../../../../lib/util/error';

import EmailStrategy from '../../auth/strategy/email';
import FacebookStrategy from '../../auth/strategy/facebook';

class Auth {
  constructor(userController, AuthHandler) {
    this.userController = userController;
    this.AuthHandler = AuthHandler;
  }

  /**
   * Authenticate user
   * @param strategy
   * @param data
   */
  async authenticate(strategy, data) {
    const authHandler = new this.AuthHandler();

    try {
      const user = await authHandler.setData(data)
        .then(() => authHandler.setStrategy(this.getAuthStrategy(strategy)))
        .then(() => authHandler.authenticate());

      const token = this.createAuthToken(user, user.type);
      return Promise.resolve({ user, token });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Get provided strategy handler
   * @param strategy
   * @returns {*}
   */
  getAuthStrategy(strategy) {
    switch (strategy) {
      case 'email':
      default:
        return EmailStrategy(this.userController);
      case 'facebook':
        return FacebookStrategy(this.userController);
    }
  }

  /**
   * Get current logged in user info
   */
  me(token) {
    try {
      const tokenInfo = this.decodeAuthToken(token);
      if (!tokenInfo) {
        return Promise.reject(error('GLO0004'));
      }

      return this.userController.getActiveUserById(tokenInfo._id);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Create authentication token
   * @param tokenData
   * @param audience
   * @param _daysBeforeExpire
   * @returns {*}
   */
  createAuthToken(tokenData, audience, _daysBeforeExpire = 30) { //eslint-disable-line
    const data = pick(tokenData, ['_id', 'firstName', 'lastName', 'email', 'aud' ]);
    return jwt.sign(data, process.env.NODE_JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * _daysBeforeExpire,
      audience,
    });
  }

  /**
   * Decode authentication token
   * @param token
   * @param secret
   * @returns {*}
   */
  decodeAuthToken(token, secret = process.env.NODE_JWT_SECRET) { //eslint-disable-line
    return jwt.verify(token, secret);
  }
}

export default (userController, AuthHandler) =>
  new Auth(userController, AuthHandler);
