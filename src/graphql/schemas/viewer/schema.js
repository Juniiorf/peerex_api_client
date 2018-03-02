import { GraphQLSchema } from 'graphql/type';

import ViewerQuery from './query';
import ViewerMutation from './mutation';

export default new GraphQLSchema({
  query: ViewerQuery,
  mutation: ViewerMutation,
});
