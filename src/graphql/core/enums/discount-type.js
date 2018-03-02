import { GraphQLEnumType } from 'graphql/type';

import values from '../../../v1/modules/coupons/enums/discount-type';

export default new GraphQLEnumType({
  name: 'DiscountType',
  description: 'Discount types, either percent or value',
  values,
});
