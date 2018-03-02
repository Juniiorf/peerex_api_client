import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import uniqueValidator from 'mongoose-unique-validator';

import createdAt from '../../core/lib/mongoose-plugins/created-at';
import updatedAt from '../../core/lib/mongoose-plugins/updated-at';
import createdBy from '../../core/lib/mongoose-plugins/created-by';
import active from '../../core/lib/mongoose-plugins/active';
import password from '../../core/lib/mongoose-plugins/password';
import fullName from '../../core/lib/mongoose-plugins/full-name';

import userTypes from '../enums/user-types';
import gender from '../../core/enums/gender';
import loginProvider from '../../auth/models/login-provider';

export const schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true, uniqueCaseInsensitive: true },
  aud: { type: String, required: true, enum: Object.values(userTypes).map(u => u.value) },
  loginProviders: [loginProvider],
  gender: { type: String, enum: Object.values(gender).map(i => i.value) },
}, { collection: 'user' });

// Add default plugins
schema.plugin(createdAt);
schema.plugin(updatedAt);
schema.plugin(createdBy);
schema.plugin(active);
schema.plugin(password);
schema.plugin(fullName);
schema.plugin(mongoosePaginate);
schema.plugin(uniqueValidator, { type: 'userUnique' });

export default mongoose.model('User', schema);
