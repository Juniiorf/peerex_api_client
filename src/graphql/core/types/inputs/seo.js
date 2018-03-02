import { GraphQLNonNull, GraphQLString, GraphQLInputObjectType } from 'graphql/type';

export const fields = () => ({
  title: { type: new GraphQLNonNull(GraphQLString) },
  description: { type: new GraphQLNonNull(GraphQLString) },
});

export default new GraphQLInputObjectType({
  name: 'SEOInput',
  fields,
});
