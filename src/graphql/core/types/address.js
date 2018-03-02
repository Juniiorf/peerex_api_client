import { GraphQLObjectType, GraphQLString } from 'graphql/type';

export const fields = {
  _id: { type: GraphQLString },
  zipCode: { type: GraphQLString },
  street: { type: GraphQLString },
  streetNumber: { type: GraphQLString },
  complement: { type: GraphQLString },
  neighbor: { type: GraphQLString },
  city: { type: GraphQLString },
  state: { type: GraphQLString },
  country: { type: GraphQLString },
  timeZone: { type: GraphQLString },
  fullAddress: {
    type: GraphQLString,
    resolve: (obj) => {
      if (!obj.street) return null;
      let address = `${obj.street}`;
      if (obj.streetNumber) address = `${address}, ${obj.streetNumber}`;
      if (obj.complement) address = `${address}, ${obj.complement}`;
      if (obj.neighbor) address = `${address}, ${obj.neighbor}`;
      if (obj.city) address = `${address}, ${obj.city}`;
      if (obj.state) address = `${address}, ${obj.uf}`;

      return address;
    },
  },
};

export default new GraphQLObjectType({
  name: 'Address',
  fields,
});
