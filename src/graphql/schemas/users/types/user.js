import { GraphQLObjectType, GraphQLString } from 'graphql/type';


export const fields = () => ({
  _id: {
    type: GraphQLString,
    description: 'User _id',
  },
  firstName: {
    type: GraphQLString,
    description: 'User first name',
  },
  lastName: {
    type: GraphQLString,
    description: 'User last name',
  },
  fullName: {
    type: GraphQLString,
    description: 'User full name',
  },
  email: {
    type: GraphQLString,
    description: 'User email',
  },
  aud: {
    type: GraphQLString,
    description: 'User audience',
  },
});

export default new GraphQLObjectType({
  name: 'User',
  description: 'User info',
  fields,
});
