export default (schema) => {
  schema.add({ createdAt: { type: Date, default: Date.now } });
};
