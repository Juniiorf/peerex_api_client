import { GraphQLInputObjectType, GraphQLString } from 'graphql/type';

export const fields = {
  countryCode: {
    type: GraphQLString,
    description: 'Phone\'s country code',
  },
  areaCode: {
    type: GraphQLString,
    description: 'Phone\'s area code',
  },
  number: {
    type: GraphQLString,
    description: 'Phone number',
  },
};

export default new GraphQLInputObjectType({
  name: 'PhoneInputType',
  fields,
});
