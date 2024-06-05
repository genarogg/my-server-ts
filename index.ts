// Limpia la consola
import clear from "console-clear";
clear();

import express, { Request, Response } from "express";

import chalk from "chalk";
import cors from "cors";

// variables de entorno
const PORT = process.env.PORT || 3000;
const CORS_URL = process.env.CORS_URL || "*";

// Crear una instancia de express
const app = express();

// Usa cors como middleware
app.use(cors({ origin: CORS_URL }));

// Configurar el directorio public
app.use(express.static("./src/public"));

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conexión a la base de datos
import sequelize from "./src/config/db-conenction";

sequelize.sync({ logging: false }).then(() => {
  console.log(chalk.cyan("db conectada!"));
});

// Importar rutas
import { inicioRouter } from "@route/index";

app.use("/", inicioRouter);

// Middleware de manejo de errores
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send("¡Algo salió mal!");
});

app.listen(PORT, () => {
  console.log(
    chalk.green.bold(`El servidor esta corriendo http://localhost:${PORT}`)
  );
});
