import Joi from 'joi';
import axios from 'axios';

import AuthStrategy from './auth-strategy';
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
        accessToken: Joi.string().required(),
        accessId: Joi.string().required(),
      });
      await Joi.validate(data, schema);

      // Get user by provider id
      let user = await this.userController.getActiveUserByProviderId(data.accessId);
      if (user && !user.active) {
        // User found but not active
        return Promise.reject(error('GLO0003'));
      }

      // Get user data from facebook
      const userData = await this.getUserData(data.accessToken);
      if (!userData || !userData.email) {
        return Promise.reject(error('USR0020'));
      }

      // Get user by email
      user = await this.userController.User.findOne({ email: userData.email });
      if (user && !user.active) {
        return Promise.reject(error('GLO0003'));
      }

      const facebookProvider = {
        provider: 'facebook',
        _id: data.accessId,
      };

      if (user) {
        // User found, let's merge if needed
        if (!user.loginProviders.find(p => p.provider === 'facebook')) {
          user.loginProviders = user.loginProviders || [];
          user.loginProviders.push(facebookProvider);
          await user.save();
        }
      } else {
        userData.loginProviders = [];
        userData.loginProviders.push(facebookProvider);

        // Create user
        user = await this.userController.create(userData, null, true);
      }

      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getUserData(accessToken) {
    return axios.get('https://graph.facebook.com/v2.11/me', {
      params: {
        fields: 'first_name, middle_name, last_name, email, picture, gender',
        access_token: accessToken,
      },
    }).then((response) => {
      const data = response.data || {};
      return {
        firstName: data.first_name,
        lastName: `${data.middle_name} ${data.last_name}`,
        email: data.email,
        gender: data.gender,
        type: 'customer',
      };
    });
  }
}

export default userController => new EmailStrategy(userController);
