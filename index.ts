// Limpia la consola
import clear from "console-clear";
clear();

import express from 'express';
import path from 'path';
import cors from "cors";

import { log } from "@fn"

const app = express();

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
  .catch((error: any) => {
    log.error(`Error al conectar a la db: ${error}`);
  });

// Importando grahpql
import startApolloServer from "@config/graphql";
startApolloServer(app);


// Importar rutas
import { inicioRouter } from "@router";

app.use("/", inicioRouter);

// Middleware de manejo de errores
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("¡Algo salió mal!");
});


import startServer from "@config/startServer";
startServer(app);