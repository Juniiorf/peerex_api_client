import {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLBoolean,
} from 'graphql/type';

import DiscountType from '../../../../core/enums/discount-type';
import DateScalarType from '../../../../core/types/date-scalar-type';

export const fields = {
  title: { type: GraphQLString },
  code: { type: GraphQLString },
  discountType: { type: DiscountType },
  discount: { type: GraphQLString },
  validDateFrom: { type: DateScalarType },
  validDateTo: { type: DateScalarType },
  active: { type: GraphQLBoolean },
};

export default new GraphQLInputObjectType({
  name: 'CouponUpdateInput',
  description: 'Coupon data',
  fields,
});
