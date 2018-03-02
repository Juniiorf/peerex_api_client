import { GraphQLObjectType, GraphQLList, GraphQLInt } from 'graphql/type';

export default (type, fieldNameToResolve = 'docs') => new GraphQLObjectType({
  name: `Paginated${type.name}`,
  fields: () => ({
    total: { type: GraphQLInt, default: 0 },
    limit: { type: GraphQLInt, default: 10 },
    offset: { type: GraphQLInt, default: 0 },
    nodes: { type: new GraphQLList(type), resolve: result => result[fieldNameToResolve] },
  }),
});
