import graphqlHTTP from 'express-graphql';
import { apolloUploadExpress } from 'apollo-upload-server';

import formatError from '../../src/graphql/core/helpers/error-formatter';
import RootSchema from '../../src/graphql/schema';
import { logger } from './logger';

export default (app) => {
  const context = { user: {} };

  app.use(
    '/graphql',
    apolloUploadExpress({
      uploadDir: '/tmp/uploads',
    }),
    graphqlHTTP(() => ({ schema: RootSchema, graphiql: true, context, formatError }))
  );
  logger.info('[GRAPHQL] Successfully started');
};
