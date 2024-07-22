import { Sequelize } from "sequelize";
import chalk from "chalk";

import path from "path";

const sequelize = new Sequelize({
  dialect: "sqlite",
  /* storage: ":memory:", */
  storage: path.join(__dirname, "/db.sqlite"),
  logging: false,
});

sequelize
  .sync()
  .then(() => console.log(chalk.cyan("Base de datos y tablas creadas")))
  .catch((error) => console.error(chalk.red("Error al sincronizar:", error)));

export default sequelize;
