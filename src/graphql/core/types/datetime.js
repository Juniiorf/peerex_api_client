import moment from 'moment-timezone';
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql/type';

import DateScalarType from './date-scalar-type';

const getMomentDate = date => (date ? moment(date) : null);

export const fields = {
  date: { type: DateScalarType, resolve: date => getMomentDate(date).toDate() },
  iso: { type: GraphQLString, resolve: date => getMomentDate(date).toISOString() },
  format: {
    type: GraphQLString,
    args: { format: { type: GraphQLString } },
    resolve: (date, { format }) => getMomentDate(date).format(format),
  },
  timestamp: { type: GraphQLString, resolve: date => getMomentDate(date).toDate().valueOf() },
  timezone: { type: GraphQLString, resolve: date => getMomentDate(date).tz() },
  weekday: { type: GraphQLInt, resolve: date => getMomentDate(date).weekday() },
};

export default new GraphQLObjectType({
  name: 'DateTime',
  fields,
});
