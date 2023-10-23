import express from 'express';
import { ActualizarEmpresa, CrearEmpresa, DesactivarEmpresa, InfoEmpresa, InfoEmpresas } from './controladores/EmpresasController.js';
const router = express.Router();

router.post('/crear', CrearEmpresa);
router.post('/actualizar', ActualizarEmpresa);
router.post('/eliminar', DesactivarEmpresa);
router.get('/', InfoEmpresas);
router.post('/info', InfoEmpresa);

export default router;