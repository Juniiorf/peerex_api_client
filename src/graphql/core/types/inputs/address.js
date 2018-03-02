import { GraphQLNonNull, GraphQLString, GraphQLInputObjectType } from 'graphql/type';

export const fields = {
  street: { type: new GraphQLNonNull(GraphQLString), description: 'Zipcode' },
  streetNumber: { type: GraphQLString, description: 'Street number' },
  complement: { type: new GraphQLNonNull(GraphQLString), description: 'Complement' },
  zipCode: { type: new GraphQLNonNull(GraphQLString), description: 'Zipcode' },
  neighbor: { type: GraphQLString, description: 'Neighbor' },
  city: { type: GraphQLString, description: 'City' },
  state: { type: GraphQLString, description: 'State' },
  country: { type: GraphQLString, description: 'Country' },
  timeZone: { type: GraphQLString, description: 'timeZone' },
};

export default new GraphQLInputObjectType({
  name: 'AddressInput',
  fields,
});
