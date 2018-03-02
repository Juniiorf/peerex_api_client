import { GraphQLObjectType, GraphQLString } from 'graphql/type';
import createDateTimeField from '../helpers/fields/datetime-field-creator';

export const fields = {
  parseId: {
    type: GraphQLString,
    description: 'Parse id used to send push notification',
  },
  createdAt: {
    ...createDateTimeField('createdAt'),
    description: 'Device\'s created date',
  },
  updatedAt: {
    ...createDateTimeField('updatedAt'),
    description: 'Device\'s updated date',
  },
  os: {
    type: GraphQLString,
    description: 'Device\'s OS',
  },
  version: {
    type: GraphQLString,
    description: 'Device\'s version',
  },
};

export default new GraphQLObjectType({
  name: 'Device',
  fields,
});
