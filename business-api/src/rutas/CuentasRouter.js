import express from 'express';
import { ActualizarCuenta, CrearCuenta, DesactivarCuenta, InfoCuenta } from './controladores/CuentasController.js';
const router = express.Router();

router.post('/crear', CrearCuenta);
router.post('/actualizar', ActualizarCuenta);
router.post('/eliminar', DesactivarCuenta);
router.post('/info', InfoCuenta);

export default router;