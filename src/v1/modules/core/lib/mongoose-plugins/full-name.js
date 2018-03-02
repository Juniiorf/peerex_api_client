import capitalizeAll from '../../../../../../lib/util/capitalize';

export default (schema) => {
  schema.add({ fullName: String });

  schema.pre('save', function(next) { //eslint-disable-line
    this.fullName = capitalizeAll(`${this.firstName} ${this.lastName}`);
    next();
  });
};
