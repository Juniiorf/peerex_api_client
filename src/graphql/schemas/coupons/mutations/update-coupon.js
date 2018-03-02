import { GraphQLNonNull, GraphQLID } from 'graphql/type';

import CouponUpdateInputType from '../types/inputs/coupon-update';
import CouponType from '../types/coupons';
import ControllerFactory from '../../../../v1/modules/core/factories/controller-factory';

const controller = ControllerFactory.getController('coupon');

export default {
  type: CouponType,
  description: 'Updates coupon data',
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    data: { type: CouponUpdateInputType },
  },
  resolve: ({ user }, { _id, data }) => controller.update({ _id, ...data }, user),
};
