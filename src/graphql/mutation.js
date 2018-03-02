import { GraphQLObjectType } from 'graphql/type';

// User
import createUser from './schemas/users/mutations/create-user';
import UserLoginMutation from './schemas/users/mutations/authenticate';

import { field as viewer } from './schemas/viewer/mutation';

export const fields = {
  viewer,
  createUser,
  login: UserLoginMutation,
};

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'List with all possible mutations',
  fields,
});
