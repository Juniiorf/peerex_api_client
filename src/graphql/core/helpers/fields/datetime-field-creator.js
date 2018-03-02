import moment from 'moment-timezone';
import { GraphQLString } from 'graphql/type';
import nconf from 'nconf';
import DateTimeType from '../../types/datetime';

export default (dateFieldName, fieldMerge = {}) => ({
  ...fieldMerge,
  type: DateTimeType,
  args: { timezone: { type: GraphQLString } },
  resolve: (data, { timezone }) => (data[dateFieldName] ?
    moment.tz(data[dateFieldName], timezone || nconf.get('defaultTimeZone')) : null),
});
