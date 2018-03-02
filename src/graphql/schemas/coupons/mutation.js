import { GraphQLObjectType } from 'graphql/type';

import createCoupon from './mutations/create-coupon';
import updateCoupon from './mutations/update-coupon';

export const fields = {
  createCoupon,
  updateCoupon,
};

export default new GraphQLObjectType({
  name: 'CouponRootMutation',
  fields,
});
