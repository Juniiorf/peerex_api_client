import { GraphQLObjectType, GraphQLString } from 'graphql/type';

export const fields = {
  title: { type: GraphQLString },
  description: { type: GraphQLString },
};

export default new GraphQLObjectType({
  name: 'SEO',
  fields,
});
