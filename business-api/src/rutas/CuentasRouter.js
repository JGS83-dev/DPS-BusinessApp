import express from 'express';
import { CrearCuenta } from './controladores/CuentasController.js';
const router = express.Router();

router.get('/', CrearCuenta);

export default router;