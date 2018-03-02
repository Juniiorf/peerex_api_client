import { GraphQLObjectType, GraphQLString } from 'graphql/type';
import UserType from './user';

export const fields = {
  token: {
    type: GraphQLString,
    description: 'Access token',
  },
  user: {
    type: UserType,
    description: 'User information',
  },
};

export default new GraphQLObjectType({
  name: 'UserAuth',
  description: 'User Authentication type with token and user info',
  fields,
});
