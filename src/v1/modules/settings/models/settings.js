import mongoose from 'mongoose';

export const schema = new mongoose.Schema({
  _id: { type: String },

}, { collection: 'settings' });


export default mongoose.model('Settings', schema);
