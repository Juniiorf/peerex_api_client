import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import uniqueValidator from 'mongoose-unique-validator';

import createdAt from '../../core/lib/mongoose-plugins/created-at';
import updatedAt from '../../core/lib/mongoose-plugins/updated-at';
import createdBy from '../../core/lib/mongoose-plugins/created-by';
import active from '../../core/lib/mongoose-plugins/active';

export const schema = new mongoose.Schema({
  title: { type: String, default: 'Sem título' },
  code: { type: String, required: true, unique: true, uniqueCaseInsensitive: true },
  discountType: { type: String, enum: ['P', 'V'] }, // TODO: Use enum
  discount: { type: Number, default: 0 },
  validDateFrom: { type: Date, required: true },
  validDateTo: { type: Date, required: true },
}, { collection: 'coupon' });

// Add default plugins
schema.plugin(createdAt);
schema.plugin(updatedAt);
schema.plugin(createdBy);
schema.plugin(active);
schema.plugin(uniqueValidator, { type: 'couponUnique' });
schema.plugin(mongoosePaginate);

export default mongoose.model('Coupon', schema);
