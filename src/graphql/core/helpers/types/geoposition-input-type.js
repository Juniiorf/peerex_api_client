import { GraphQLInputObjectType, GraphQLNonNull, GraphQLFloat } from 'graphql/type';

export default new GraphQLInputObjectType({
  name: 'Geoposition',
  fields: () => ({
    latitude: { type: new GraphQLNonNull(GraphQLFloat) },
    longitude: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});
