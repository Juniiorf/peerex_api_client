import mongoose from 'mongoose';

import createdAt from '../../core/lib/mongoose-plugins/created-at';
import createdBy from '../../core/lib/mongoose-plugins/created-by';

const schema = new mongoose.Schema({
  _id: String,
  uploadedFile: String,
  file: String,
  url: String,
  fileType: String,
  size: Number,
}, { collection: null });

schema.plugin(createdAt);
schema.plugin(createdBy);

export default schema;
