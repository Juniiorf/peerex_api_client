import CouponType from '../types/coupons';
import ControllerFactory from '../../../../v1/modules/core/factories/controller-factory';
import CouponFilterType from '../types/inputs/coupon-filter';

import { fields as paginationInterfaceFields } from '../../../core/interfaces/pagination';
import createPaginationType from '../../../core/helpers/types/pagination-type-creator';

const controller = ControllerFactory.getController('coupon');


export default {
  type: createPaginationType(CouponType),
  args: {
    ...paginationInterfaceFields,
    filter: { type: CouponFilterType },
  },
  resolve: ({ user }, { filter, ...pagination }) => controller.getCoupons(filter, pagination, user),
};
