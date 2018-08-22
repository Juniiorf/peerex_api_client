import UserType from '../types/user';
import ControllerFactory from '../../../../v1/modules/core/factories/controller-factory';

const controller = ControllerFactory.getController('user');

export default {
  type: UserType,
  resolve: ({ user }) => controller.getMe(user),
};
