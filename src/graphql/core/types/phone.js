import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql/type';

export const fields = {
  phoneType: {
    type: GraphQLString,
    description: 'Phone type',
  },
  countryCode: {
    type: GraphQLInt,
    description: 'Phone\'s country code',
  },
  areaCode: {
    type: GraphQLInt,
    description: 'Phone\'s area code',
  },
  number: {
    type: GraphQLInt,
    description: 'Phone number',
  },
};

export default new GraphQLObjectType({
  name: 'Phone',
  fields,
});
