import Joi from 'joi';
import { omit, isEmpty } from 'lodash';

import error from '../../../../../lib/util/error';
import { logger } from '../../../../../config/initializers/logger';

class UserController {
  /**
   * Inject dependencies
   * @param User
   * @param userTypes
   */
  constructor(User, userTypes) {
    this.User = User;
    this.userTypes = userTypes;
  }

  /**
   * Get all users available
   * @param filter User filter
   * @param pagination User pagination options
   * @param reqUser Info about the user requesting this info
   */
  async getUsers(filter = {}, pagination, reqUser) {
    try {
      if (!reqUser || reqUser.aud !== this.userTypes.ADMIN.value) {
        return Promise.reject(error('GLO0003'));
      }

      const schema = Joi.object().keys({
        _id: Joi.string().allow(null),
        email: Joi.string().email().allow(null),
      }).allow(null);

      // Validate filter
      await Joi.validate(filter, schema);

      // Search
      const query = {};

      if (filter._id) {
        query._id = filter._id;
      }

      if (filter.email) {
        query.email = filter.email;
      }

      return this.User.paginate(query, pagination);
    } catch (e) {
      logger.error(e);
      return Promise.reject(error('USR0001'));
    }
  }

  /**
   * Get single active user by email
   * @param _id
   * @param fields
   * @returns {void|Query|*}
   */
  getActiveUserById(_id, fields = {}) {
    return this.User.findOne({ _id, active: true }, fields);
  }

  /**
   * Get single active user by email
   * @param email
   * @param fields
   * @returns {void|Query|*}
   */
  getActiveUserByEmail(email, fields = {}) {
    return this.User.findOne({ email, active: true }, fields);
  }

  /**
   * Get single active user by provider id, such as Facebook
   * @param id
   * @param fields
   * @returns {void|Query|*}
   */
  getActiveUserByProviderId(id, fields = {}) {
    return this.User.findOne({ 'loginProviders._id': id }, fields);
  }

  /**
   * Creates a user
   * @param data
   * @param reqUser
   */
  async create(data = {}, reqUser = {}) {
    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      aud: Joi.string().required(),
      password: Joi.string(),
      gender: Joi.string(),
      active: Joi.boolean(),
      loginProviders: Joi.array(),
    });

    try {
      // Validate input
      await Joi.validate(data, schema);

      if (!data.aud) {
        data.aud = this.userTypes.CUSTOMER.value;
      }

      if (data.aud !== this.userTypes.CUSTOMER.value && reqUser.aud !== this.userTypes.ADMIN.value) {
        return Promise.reject(error('GLO0004'));
      }

      const user = new this.User(data);
      user.createdBy = reqUser;

      return user.save();
    } catch (e) {
      logger.error(e);
      return Promise.reject(error('USR0002'));
    }
  }

  /**
   * Updates a user
   * @param data
   * @param reqUser
   */
  async update(data = {}, reqUser = {}) {
    if (!reqUser || reqUser.aud !== this.userTypes.ADMIN.value) {
      return Promise.reject(error('GLO0003'));
    }

    const schema = Joi.object().keys({
      _id: Joi.string(),
      firstName: Joi.string().allow(null),
      lastName: Joi.string().allow(null),
      email: Joi.string().email().allow(null),
      aud: Joi.string().allow(null),
      password: Joi.string().allow(null),
      active: Joi.boolean().allow(null),
    });

    try {
      // Validate input
      await Joi.validate(data, schema);

      if (data.aud && (data.aud !== this.userTypes.CUSTOMER.value && reqUser.aud !== this.userTypes.ADMIN.value)) {
        return Promise.reject(error('GLO0004'));
      }

      const user = await this.User.findById(data._id);
      if (!user) {
        return Promise.reject(error('USR0001'));
      }

      Object.assign(user, omit(data, !isEmpty));

      return user.save();
    } catch (e) {
      logger.error(e);
      return Promise.reject(error('USR0003'));
    }
  }

  /**
   * Deletes a user
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

      await this.User.findByIdAndRemove(data._id);
      return Promise.resolve(true);
    } catch (e) {
      logger.error(e);
      return Promise.reject(error('USR0003'));
    }
  }
}

export default (User, userTypes) =>
  new UserController(User, userTypes);
