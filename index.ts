// Limpia la consola
import clear from "console-clear";
clear();

import express, { Request, Response } from "express";

import { log, path } from "@fn";
import cors from "cors";

// variables de entorno
const PORT = process.env.PORT || 4000;
const CORS_URL = process.env.CORS_URL || "*";

// Crear una instancia de express
const app = express();

// Usa cors como middleware
app.use(cors({ origin: CORS_URL }));

// Configurar el directorio public
app.use(express.static(path.join(__dirname, "src/public")));

// Configurar express-react-views como motor de vistas
import { createEngine } from "express-react-views";
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "tsx");
app.engine("tsx", createEngine());

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conexión a la base de datos
import sequelize from "@db";

sequelize.sync({ logging: false }).then(() => {
  log.cyan("db conectada!");
});

// Importar rutas
import { inicioRouter } from "@router";

app.use("/", inicioRouter);

// import { sendEmail } from "@email/index";

import appDB from "./src/admin/db/src/routers/admindb";
app.use("/admin-back/db", appDB);

// Middleware de manejo de errores
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send("¡Algo salió mal!");
});

app.listen(PORT, () => {
  log.green(`El servidor esta corriendo http://localhost:${PORT}`);
});
