import Joi from 'joi';

import AuthStrategy from './auth-strategy';
import PasswordHandler from '../lib/password-handler';
import error from '../../../../../lib/util/error';

class EmailStrategy extends AuthStrategy {
  constructor(userController) {
    super();
    this.userController = userController;
  }

  /**
   * Authenticate user using email and password
   * @param data
   * @returns {Promise<*>}
   */
  async authenticate(data) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      await Joi.validate(data, schema);

      // Get user
      const user = await this.userController.getActiveUserByEmail(data.email);
      if (!user) {
        return Promise.reject(error('USR0001'));
      }

      // Validate password
      const isValid = PasswordHandler.validateHash(data.password, user.password);
      if (!isValid) {
        return Promise.reject(error('USR0010'));
      }

      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export default userController => new EmailStrategy(userController);
