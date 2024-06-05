import { Sequelize } from "sequelize";
import chalk from "chalk";

const sequelize = new Sequelize({
  dialect: "sqlite",
  /* storage: ":memory:", */
  storage: "./src/config/db.sqlite",
  logging: false,
});

sequelize
  .sync()
  .then(() => console.log(chalk.cyan("Base de datos y tablas creadas")))
  .catch((error) => console.error(chalk.red("Error al sincronizar:", error)));

export default sequelize;
