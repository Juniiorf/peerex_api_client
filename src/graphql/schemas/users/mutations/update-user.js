import { GraphQLNonNull, GraphQLID } from 'graphql/type';

import UserUpdateInputType from '../types/inputs/user-update';
import UserType from '../types/user';
import ControllerFactory from '../../../../v1/modules/core/factories/controller-factory';

// const controller = ControllerFactory.getController('user');

export default {
  type: UserType,
  description: 'Updates user main information',
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    data: { type: UserUpdateInputType },
  },
  // resolve: ({ user }, { _id, data }) => controller.updateUser(_id, data, user),
};
