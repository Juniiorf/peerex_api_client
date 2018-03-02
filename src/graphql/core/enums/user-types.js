import { GraphQLEnumType } from 'graphql/type';

import values from '../../../v1/modules/users/enums/user-types';

export default new GraphQLEnumType({
  name: 'UserType',
  description: 'User types',
  values,
});
