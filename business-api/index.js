import express from 'express';
import cors from 'cors';
import EventosRouter from './src/rutas/EventosRouter.js';
import CuentaRouter from './src/rutas/CuentasRouter.js';
import EmpresasRouter from './src/rutas/EmpresasRouter.js';
import CategoriasRouter from './src/rutas/CategoriasRouter.js';
export const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use('/api/eventos', EventosRouter);
app.use('/api/cuenta', CuentaRouter);
app.use('/api/empresas', EmpresasRouter);
app.use('/api/categorias', CategoriasRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
