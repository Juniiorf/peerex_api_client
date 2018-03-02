import { GraphQLString } from 'graphql/type';

import { logger } from '../../../../config/initializers/logger';
import ControllerFactory from '../../../v1/modules/core/factories/controller-factory';

const authController = ControllerFactory.getController('auth');

export default type => ({
  type,
  description: 'Viewer represents a logged in user.',
  args: {
    token: { type: GraphQLString },
  },
  resolve: async (root, { token }) => {
    let user = {};
    try {
      user = await authController.me(token) || {};
    } catch (err) {
      logger.error(err);
    }

    return { token, user };
  },
});
