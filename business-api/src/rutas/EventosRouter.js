import express from 'express';
import { ObtenerEventos } from './controladores/EventosController.js';
const router = express.Router();

router.get('/', ObtenerEventos);

export default router;