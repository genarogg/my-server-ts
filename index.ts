// Limpia la consola
import clear from "console-clear";
clear();

import express from 'express';
import path from 'path';
import cors from "cors";

import { log } from "@fn"

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_URL = process.env.CORS_URL || "*";

app.use(express.static(path.join(__dirname, "src/public")));

// Usa cors como middleware
app.use(cors({ origin: CORS_URL }));

// Configurar jsx como motor de vistas
app.set('view engine', 'jsx');
app.set("views", path.join(__dirname, "src/views"))
app.engine('jsx', require('express-react-views').createEngine());

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    log.info("db conectada!");
  })
  .catch((error) => {
    log.error(`Error al conectar a la db: ${error}`);
  });

// Importando grahpql
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import resolvers from "@graphql/resolvers";
import typeDefs from "@graphql/schemas";

async function startApolloServer(app: any) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Habilitar introspección en desarrollo
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ],
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

startApolloServer(app);


// Importar rutas
import { inicioRouter } from "@router";

app.use("/", inicioRouter);

// Middleware de manejo de errores
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("¡Algo salió mal!");
});


app.listen(PORT, () => {
  log.success(`El servidor esta corriendo en http://localhost:${PORT}`);
  log.info(`Graphql esta corriendo en http://localhost:${PORT}/graphql`);
});