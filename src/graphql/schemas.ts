import { buildSchema } from 'graphql';
import usuarioSchema from './user/schema';


const schema = buildSchema(`
  ${usuarioSchema}
`);

export default schema;