import express from 'express';
import { ActualizarCuenta, CrearCuenta, DesactivarCuenta, InfoCuenta } from './controladores/CuentasController.js';
const router = express.Router();
import multer from "multer";
import os from "os";
const upload = multer({ dest: os.tmpdir() });

router.post('/crear',upload.single('file'), CrearCuenta);
router.post('/actualizar', ActualizarCuenta);
router.post('/eliminar', DesactivarCuenta);
router.post('/info', InfoCuenta);

export default router;