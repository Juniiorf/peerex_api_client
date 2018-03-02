import { GraphQLInputObjectType } from 'graphql/type';
import DateScalarType from '../date-scalar-type';

export const fields = {
  date: {
    type: DateScalarType,
    description: 'Date type in YYYY-MM-DDTHH:MM:SS.SSSZ type',
  },
};

export default new GraphQLInputObjectType({
  name: 'DateInputType',
  fields,
});
