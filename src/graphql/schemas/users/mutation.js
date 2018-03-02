import { GraphQLObjectType } from 'graphql/type';

import createUser from './mutations/create-user';
import updateUser from './mutations/update-user';

export const fields = {
  createUser,
  updateUser,
};

export default new GraphQLObjectType({
  name: 'UserMutation',
  fields,
});
