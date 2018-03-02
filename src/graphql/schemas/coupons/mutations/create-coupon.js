import CouponInputType from '../types/inputs/coupon';
import CouponType from '../types/coupons';
import ControllerFactory from '../../../../v1/modules/core/factories/controller-factory';

const controller = ControllerFactory.getController('coupon');

export default {
  type: CouponType,
  description: 'Creates a new coupon',
  args: {
    data: { type: CouponInputType },
  },
  resolve: (parent = {}, { data }) => controller.create(data, parent.user),
};
