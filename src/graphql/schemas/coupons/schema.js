import { GraphQLSchema } from 'graphql/type';

import CouponQuery from './query';

export default new GraphQLSchema({
  query: CouponQuery,
});
