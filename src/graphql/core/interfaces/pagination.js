import { GraphQLInterfaceType, GraphQLInt } from 'graphql/type';

export const fields = {
  limit: { type: GraphQLInt, description: 'Number of items per page' },
  offset: { type: GraphQLInt, description: 'Number of items to skip' },
  page: { type: GraphQLInt, description: 'Number of the page to load' },
};

export default new GraphQLInterfaceType({
  name: 'PaginationInterface',
  fields,
});
