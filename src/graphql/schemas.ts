import { buildSchema } from 'graphql';
import demoSchema from './demo/schema';


const schema = buildSchema(`
  ${demoSchema}
`);

export default schema;