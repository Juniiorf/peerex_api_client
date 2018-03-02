import UserInputType from '../types/inputs/user';
import UserType from '../types/user';
import ControllerFactory from '../../../../v1/modules/core/factories/controller-factory';

const controller = ControllerFactory.getController('user');

export default {
  type: UserType,
  description: 'Creates a new user',
  args: {
    data: { type: UserInputType },
  },
  resolve: (parent = {}, { data }) => controller.create(data, parent.user),
};
