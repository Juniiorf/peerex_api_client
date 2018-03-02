import { GraphQLObjectType } from 'graphql/type';

import generateField from './field-generator';

import { fields as RootCouponQueryFields } from '../coupons/query';
import { fields as RootUserQueryFields } from '../users/query';

export const fields = {
  ...RootCouponQueryFields,
  ...RootUserQueryFields,
};

const RootViewerQuery = new GraphQLObjectType({
  name: 'RootViewerQuery',
  description: 'List all available queries',
  fields,
});

export const field = generateField(RootViewerQuery);

export default RootViewerQuery;
