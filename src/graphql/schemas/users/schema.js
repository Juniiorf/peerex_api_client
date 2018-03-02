import { GraphQLSchema } from 'graphql/type';

import UserQuery from './query';

export default new GraphQLSchema({
  query: UserQuery,
});
