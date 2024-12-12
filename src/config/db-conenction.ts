import { Sequelize } from "sequelize";
import { log, path } from "functions";

const sequelize = new Sequelize({
  dialect: "sqlite",
  /* storage: ":memory:", */
  storage: path.join(__dirname, "/db.sqlite"),
  logging: false,
});

sequelize
  .query("CREATE DATABASE IF NOT EXISTS hola")
  .then(() => {
    log.cyan("Base de datos 'hola' creada o ya existe");
    return sequelize.sync();
  })
  .then(() => log.cyan("Base de datos y tablas creadas"))
  .catch((error) => log.red("Error al sincronizar:", error));

export default sequelize;
