import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLBoolean,
} from 'graphql/type';

import GenderEnumType from '../../../../core/enums/gender';
import DateScalarType from '../../../../core/types/date-scalar-type';

export const fields = {
  firstName: { type: GraphQLString },
  lastName: { type: GraphQLString },
  aud: { type: GraphQLString },
  password: { type: GraphQLString },
  email: { type: new GraphQLNonNull(GraphQLString) },
  gender: { type: GenderEnumType },
  birthdate: { type: DateScalarType },
  active: { type: GraphQLBoolean, default: true },
};

export default new GraphQLInputObjectType({
  name: 'UserUpdateInput',
  description: 'User details',
  fields,
});
