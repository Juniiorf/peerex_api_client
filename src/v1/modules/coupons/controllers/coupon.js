import Joi from 'joi';
import { omit, isEmpty } from 'lodash';

import error from '../../../../../lib/util/error';
import { logger } from '../../../../../config/initializers/logger';

class CouponController {
  /**
   * Inject dependencies
   * @param Coupon
   * @param userTypes
   */
  constructor(Coupon, userTypes) {
    this.Coupon = Coupon;
    this.userTypes = userTypes;
  }

  /**
   * Get all coupons available
   * @param filter Coupon filter
   * @param pagination Coupon pagination options
   * @param reqUser Info about the user requesting this info
   */
  async getCoupons(filter = {}, pagination, reqUser) {
    try {
      if (!reqUser || reqUser.aud !== this.userTypes.ADMIN.value) {
        return Promise.reject(error('GLO0003'));
      }

      const schema = Joi.object().keys({
        _id: Joi.string().allow(null),
        code: Joi.string().allow(null),
      }).allow(null);

      // Validate filter
      await Joi.validate(filter, schema);

      // Search
      const query = {};

      if (filter._id) {
        query._id = filter._id;
      }

      if (filter.code) {
        query.code = filter.code;
      }

      return this.Coupon.paginate(query, {
        sort: { title: 1 },
        ...pagination,
      });
    } catch (e) {
      logger.error(e);
      return Promise.reject(error('CPN0001'));
    }
  }

  /**
   * Creates a coupon
   * @param data
   * @param reqUser
   */
  async create(data, reqUser) {
    if (!reqUser || reqUser.aud !== this.userTypes.ADMIN.value) {
      return Promise.reject(error('GLO0003'));
    }

    const schema = Joi.object().keys({
      title: Joi.string().required(),
      code: Joi.string().required(),
      discount: Joi.number().required(),
      discountType: Joi.string().required(),
      validDateFrom: Joi.date().required(),
      validDateTo: Joi.date().required(),
      active: Joi.boolean(),
    });

    try {
      // Validate input
      await Joi.validate(data, schema);

      const coupon = new this.Coupon(data);
      coupon.createdBy = reqUser;

      return coupon.save();
    } catch (e) {
      logger.error(e);
      return Promise.reject(error('CPN0002'));
    }
  }

  /**
   * Updates a coupon
   * @param data
   * @param reqUser
   */
  async update(data, reqUser) {
    if (!reqUser || reqUser.aud !== this.userTypes.ADMIN.value) {
      return Promise.reject(error('GLO0003'));
    }

    const schema = Joi.object().keys({
      _id: Joi.string(),
      title: Joi.string().allow(null),
      code: Joi.string().allow(null),
      discount: Joi.number().allow(null),
      discountType: Joi.string().allow(null),
      validDateFrom: Joi.date().allow(null),
      validDateTo: Joi.date().allow(null),
      active: Joi.boolean().allow(null),
    });

    try {
      // Validate input
      await Joi.validate(data, schema);

      const coupon = await this.Coupon.findById(data._id);
      if (!coupon) {
        return Promise.reject(error('CPN0001'));
      }

      Object.assign(coupon, omit(data, !isEmpty));

      return coupon.save();
    } catch (e) {
      logger.error(e);
      return Promise.reject(error('CPN0003'));
    }
  }

  /**
   * Deletes a coupon
   * @param data
   * @param reqUser
   */
  async delete(data = {}, reqUser = {}) {
    if (!reqUser || reqUser.aud !== this.userTypes.ADMIN.value) {
      return Promise.reject(error('GLO0003'));
    }

    const schema = Joi.object().keys({
      _id: Joi.string(),
    });

    try {
      // Validate input
      await Joi.validate(data, schema);

      await this.Coupon.findByIdAndRemove(data._id);
      return Promise.resolve(true);
    } catch (e) {
      logger.error(e);
      return Promise.reject(error('CPN0003'));
    }
  }
}

export default (Coupon, userTypes) =>
  new CouponController(Coupon, userTypes);
