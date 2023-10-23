import express from 'express';
import { ObtenerEventos,RegistrarEvento,EliminarEvento, ModificarEvento } from './controladores/EventosController.js';
const router = express.Router();

router.get('/', ObtenerEventos);
router.post('/agregar', RegistrarEvento);
router.post('/eliminar', EliminarEvento);
router.post('/modificar', ModificarEvento);

export default router;