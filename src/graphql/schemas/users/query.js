import { GraphQLObjectType } from 'graphql/type';

import UsersQuery from './queries/users';
import MeQuery from './queries/me';

export const publicFields = {
};

export const privateFields = {
  users: UsersQuery,
  me: MeQuery,
};

export const fields = {
  ...publicFields,
  ...privateFields,
};

export default new GraphQLObjectType({
  name: 'RootUserQuery',
  fields,
});
