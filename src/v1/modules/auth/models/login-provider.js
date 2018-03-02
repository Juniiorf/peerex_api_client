import mongoose from 'mongoose';

import createdAt from '../../core/lib/mongoose-plugins/created-at';
import updatedAt from '../../core/lib/mongoose-plugins/updated-at';

export const schema = new mongoose.Schema({
  provider: String, // Facebook, Google, etc.
  _id: { type: String },
}, { collection: 'user' });

// Add default plugins
schema.plugin(createdAt);
schema.plugin(updatedAt);

export default schema;
