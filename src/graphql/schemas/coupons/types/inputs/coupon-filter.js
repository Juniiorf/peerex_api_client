import { GraphQLString, GraphQLID, GraphQLInputObjectType } from 'graphql/type';

export const fields = {
  _id: { type: GraphQLID },
  code: { type: GraphQLString },
};

export default new GraphQLInputObjectType({
  name: 'CouponFilterInput',
  fields,
});
