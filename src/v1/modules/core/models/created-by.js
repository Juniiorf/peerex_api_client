import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  _id: String,
  email: String,
  firstName: String,
  lastName: String,
  fullName: String,
  aud: String,
}, { collection: null });

export default schema;
