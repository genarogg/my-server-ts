import ejs from "ejs";
import { join } from "path";

/**
 * Compila un archivo EJS con los datos proporcionados y devuelve el HTML resultante.
 *
 * @param templateName Nombre del archivo EJS (sin la extensión .ejs).
 * @param data Objeto con los datos que se pasarán al template EJS.
 * @param callback Función de callback que se llama con el error o el HTML resultante.
 */

const compileEJSTemplate = (
  templateName: string,
  data: object,
  callback: (err: Error | null, html?: string) => void
) => {
  // Define la ruta al archivo EJS basado en el nombre proporcionado
  const templatePath = join(__dirname, `${templateName}.ejs`);

  // Lee el archivo EJS y compila el template con los datos proporcionados
  ejs.renderFile(templatePath, data, (err, html) => {
    if (err) {
      console.error(
        `Error al renderizar el template EJS (${templateName}):`,
        err
      );
      return callback(err);
    }
    // Retorna el HTML compilado
    callback(null, html);
  });
};

export default compileEJSTemplate;
