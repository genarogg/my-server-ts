const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  // Crea la ventana del navegador.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // y carga el archivo index.html de la aplicación.
  win.loadFile("index.html"); // Asegúrate de tener un archivo HTML para cargar o cambia esto para cargar una URL
};

app.on("ready", createWindow);
