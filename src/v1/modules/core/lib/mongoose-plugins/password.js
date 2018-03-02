import PasswordHandler from '../../../auth/lib/password-handler';

export default (schema) => {
  schema.add({ password: String });

  schema.pre('save', function(next) { //eslint-disable-line
    if (this.password && this.password !== '' && this.isModified('password')) {
      this.password = PasswordHandler.createHash(this.password);
      next();
    } else {
      next();
    }
  });
};
