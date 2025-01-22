const usuarioSchema = `
  type Usuario {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    usuario(id: ID!): Usuario
  }

  type Mutation {
    createUsuario(name: String!, email: String!): Usuario
  }
`;

export default usuarioSchema;