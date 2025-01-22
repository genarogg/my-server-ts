const demo = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
];

const resolvers = {
  Query: {
    demo: (_: any, { id }: { id: string }) => {
      return demo.find(demo => demo.id === id);
    },
  },
  Mutation: {
    createDemo: (_: any, { name, email }: { name: string, email: string }) => {
      const newDemo = { id: `${demo.length + 1}`, name, email };
      demo.push(newDemo);
      return newDemo;
    },
  },
};

export default resolvers;