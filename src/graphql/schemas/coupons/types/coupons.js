import { GraphQLObjectType, GraphQLID, GraphQLFloat, GraphQLBoolean, GraphQLString } from 'graphql/type';

import DiscountType from '../../../core/enums/discount-type';
import DateType from '../../../core/types/datetime';

export const fields = () => ({
  _id: {
    type: GraphQLID,
    description: 'Coupon _id',
  },
  title: {
    type: GraphQLString,
    description: 'Coupon title',
  },
  code: {
    type: GraphQLString,
    description: 'Coupon code',
  },
  discountType: {
    type: DiscountType,
    description: 'Coupon type, either percent of value',
  },
  discount: {
    type: GraphQLFloat,
    description: 'Discount value',
  },
  validDateFrom: {
    type: DateType,
    description: 'Coupon is valid from this date on',
  },
  validDateTo: {
    type: DateType,
    description: 'Coupon is valid until this date',
  },
  active: {
    type: GraphQLBoolean,
    description: 'Coupon availability',
  },
});

export default new GraphQLObjectType({
  name: 'Coupon',
  description: 'Coupon info',
  fields,
});
