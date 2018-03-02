import { GraphQLInputObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } from 'graphql/type';

export const fields = {
  name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  type: {
    type: new GraphQLNonNull(GraphQLString),
  },
  size: {
    type: new GraphQLNonNull(GraphQLInt),
  },
  path: {
    type: new GraphQLNonNull(GraphQLString),
  },
};

export default new GraphQLInputObjectType({
  name: 'FileInputType',
  fields,
});
