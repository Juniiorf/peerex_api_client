import { GraphQLString, GraphQLList, GraphQLBoolean, GraphQLID, GraphQLInputObjectType } from 'graphql/type';

export const fields = {
  _id: { type: new GraphQLList(GraphQLID) },
  name: { type: GraphQLString },
  userType: { type: GraphQLString },
  aud: { type: GraphQLString },
  premium: { type: GraphQLBoolean },
};

export default new GraphQLInputObjectType({
  name: 'UserFilterInput',
  fields,
});
