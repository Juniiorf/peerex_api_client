/* Modules */
import authController from '../../auth/controllers/auth';

import couponController from '../../coupons/controllers/coupon';
import Coupon from '../../coupons/models/coupon';

import settingsController from '../../settings/controllers/settings';
import Settings from '../../settings/models/settings';

import userController from '../../users/controllers/user';
import User from '../../users/models/user';

/* Enums */
import userTypes from '../../users/enums/user-types';

/* Libs */
import AuthHandler from '../../auth/lib/auth-handler';

export default class ControllerFactory {
  /**
   * Returns a new instance of the controller, injecting its dependencies
   * @param controller
   * @returns {*}
   */
  static getController(controller) {
    return ControllerFactory[`_${controller}`]();
  }

  /**
   * Auth controller
   * @returns {*}
   * @private
   */
  static _auth() {
    return authController(ControllerFactory.getController('user'), AuthHandler);
  }

  /**
   * Coupons controller
   * @returns {*}
   * @private
   */
  static _coupon() {
    return couponController(Coupon, userTypes);
  }

  /**
   * Settings controller
   * @private
   */
  static _settings() {
    return settingsController(Settings);
  }

  /**
   * User controller
   * @private
   */
  static _user() {
    return userController(User, userTypes);
  }
}
