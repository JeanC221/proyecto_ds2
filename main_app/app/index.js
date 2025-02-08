require('dotenv').config();
const express = require('express');
const app = express();

// Configurar el puerto
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Importar el router de empleados
const empleadosRouter = require('./routes/empleados'); 

// Usar el router para las rutas /empleados
app.use('/empleados', empleadosRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
