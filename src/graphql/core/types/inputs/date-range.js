import { GraphQLString, GraphQLInputObjectType } from 'graphql/type';

export const fields = {
  startDate: { type: GraphQLString },
  endDate: { type: GraphQLString },
};

export default new GraphQLInputObjectType({
  name: 'DateRangeInput',
  fields,
});
