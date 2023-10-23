import express from 'express';
import { EliminarCategoria, ModificarCategoria, ObtenerCategorias, RegistrarCategoria } from './controladores/CategoriasController.js';
const router = express.Router();

router.get('/', ObtenerCategorias);
router.post('/agregar', RegistrarCategoria);
router.post('/eliminar', EliminarCategoria);
router.post('/modificar', ModificarCategoria);

export default router;