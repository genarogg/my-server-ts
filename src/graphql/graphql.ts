import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schemas';
import resolvers from "./resolvers"

const router = Router();

router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

export default router;