import mongoose from 'mongoose';

import { schema as CouponType } from '../../coupons/models/coupon';

const schema = new mongoose.Schema({
  total: { type: Number, default: 0 },
  totalWithoutDiscounts: { type: Number, default: 0 },
  totalWithDiscounts: { type: Number, default: 0 },
  discountsTotal: { type: Number, default: 0 },
  coupon: CouponType,

}, { collection: null, _id: null });


export default schema;
