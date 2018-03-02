import { GraphQLNonNull, GraphQLString } from 'graphql/type';

import UserAuthType from '../types/user-auth';
import ControllerFactory from '../../../../v1/modules/core/factories/controller-factory';

const controller = ControllerFactory.getController('auth');

export default {
  type: UserAuthType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_, { email, password }) => controller.authenticate('email', { email, password }),
};
