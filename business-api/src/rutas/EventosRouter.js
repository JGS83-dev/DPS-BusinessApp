import express from 'express';
import { ObtenerEventos,RegistrarEvento } from './controladores/EventosController.js';
const router = express.Router();

router.get('/', ObtenerEventos);
router.post('/agregar', RegistrarEvento);

export default router;