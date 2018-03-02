import { GraphQLObjectType } from 'graphql/type';

import { field as viewer } from './schemas/viewer/query';
import { publicFields as couponPublicFields } from './schemas/coupons/query';
import { publicFields as userPublicFields } from './schemas/users/query';

export const fields = {
  viewer,
  ...couponPublicFields,
  ...userPublicFields,
};

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'List with all possible queries',
  fields,
});
