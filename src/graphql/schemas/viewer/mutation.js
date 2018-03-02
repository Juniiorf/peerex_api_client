import { GraphQLObjectType } from 'graphql/type';

import generateField from './field-generator';
import { fields as CouponMutationFields } from '../coupons/mutation';
import { fields as UserMutationFields } from '../users/mutation';

export const fields = {
  ...CouponMutationFields,
  ...UserMutationFields,
};

const RootViewerMutation = new GraphQLObjectType({
  name: 'RootViewerMutation',
  description: 'List with all possible mutations',
  fields,
});

export const field = generateField(RootViewerMutation);

export default RootViewerMutation;
