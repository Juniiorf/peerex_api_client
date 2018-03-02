import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLFloat,
} from 'graphql/type';


import DiscountType from '../../../../core/enums/discount-type';
import DateScalarType from '../../../../core/types/date-scalar-type';

export const fields = {
  title: { type: new GraphQLNonNull(GraphQLString) },
  code: { type: new GraphQLNonNull(GraphQLString) },
  discountType: { type: new GraphQLNonNull(DiscountType) },
  discount: { type: new GraphQLNonNull(GraphQLFloat) },
  validDateFrom: { type: new GraphQLNonNull(DateScalarType) },
  validDateTo: { type: new GraphQLNonNull(DateScalarType) },
  active: { type: GraphQLBoolean, default: true },
};

export default new GraphQLInputObjectType({
  name: 'CouponInput',
  description: 'Coupon data',
  fields,
});
