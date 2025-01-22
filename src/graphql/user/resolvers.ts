const usuarios = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
  ];
  
  const usuarioResolvers = {
    Query: {
      usuario: (_: any, { id }: { id: string }) => {
        return usuarios.find(usuario => usuario.id === id);
      },
    },
    Mutation: {
      createUsuario: (_: any, { name, email }: { name: string, email: string }) => {
        const newUsuario = { id: `${usuarios.length + 1}`, name, email };
        usuarios.push(newUsuario);
        return newUsuario;
      },
    },
  };
  
  export default usuarioResolvers;