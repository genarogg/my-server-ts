// ...existing code...
const typeDefs = /* GraphQL */ `
  type Demo {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    demo(id: ID!): Demo
  }

  type Mutation {
    createDemo(name: String!, email: String!): Demo
  }

  type Subscription {
    demoCreated: Demo
  }
`
// ...existing code...
export default typeDefs