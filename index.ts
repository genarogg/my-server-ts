// Limpia la consola
import clear from "console-clear";
clear();

import express from 'express';
import path from 'path';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_URL = process.env.CORS_URL || "*";

app.use(express.static(path.join(__dirname, "src/public")));

// Usa cors como middleware
app.use(cors({ origin: CORS_URL }));

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"))

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log("db conectada!");
  })
  .catch((error) => {
    console.error("Error al conectar a la db:", error);
  });

// Importar rutas
import { inicioRouter } from "@router";

app.use("/", inicioRouter);

// Middleware de manejo de errores
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("¡Algo salió mal!");
});


app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});