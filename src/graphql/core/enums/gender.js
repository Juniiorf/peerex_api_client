import { GraphQLEnumType } from 'graphql/type';

import values from '../../../v1/modules/core/enums/gender';

export default new GraphQLEnumType({
  name: 'Gender',
  values,
});
