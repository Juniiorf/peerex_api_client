export default (schema, options) => {
  schema.add({ updatedAt: Date });

  schema.pre('save', function(next) { //eslint-disable-line
    if (this) {
      this.updatedAt = new Date();
    }
    next();
  });

  if (options && options.index) {
    schema.path('updatedAt').index(options.index);
  }
};
