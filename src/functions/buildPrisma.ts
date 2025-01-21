const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '../models');
const outputFile = path.join(__dirname, '../../prisma/schema.prisma');

// Leer todos los archivos .prisma en la carpeta de modelos
const files = fs.readdirSync(modelsDir).filter((file: any) => file.endsWith('.prisma'));

// Combinar contenido de los archivos
const mergedSchema = files
  .map((file: any) => fs.readFileSync(path.join(modelsDir, file), 'utf-8'))
  .join('\n');

// Escribir el esquema combinado en schema.prisma
fs.writeFileSync(outputFile, mergedSchema);

console.log('Modelos combinados exitosamente en schema.prisma');