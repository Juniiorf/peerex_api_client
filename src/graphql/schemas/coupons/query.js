import { GraphQLObjectType } from 'graphql/type';

import CouponsQuery from './queries/coupons';

export const publicFields = {
};

export const privateFields = {
  coupons: CouponsQuery,
};

export const fields = {
  ...publicFields,
  ...privateFields,
};

export default new GraphQLObjectType({
  name: 'CouponRootQuery',
  fields,
});
