import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLBoolean,
} from 'graphql/type';


import GenderEnumType from '../../../../core/enums/gender';
import UserTypeEnumType from '../../../../core/enums/user-types';

export const fields = {
  firstName: { type: new GraphQLNonNull(GraphQLString) },
  lastName: { type: new GraphQLNonNull(GraphQLString) },
  email: { type: new GraphQLNonNull(GraphQLString) },
  gender: { type: GenderEnumType },
  password: { type: new GraphQLNonNull(GraphQLString) },
  aud: { type: new GraphQLNonNull(UserTypeEnumType) },
  active: { type: GraphQLBoolean, default: true },
};

export default new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'User details',
  fields,
});
