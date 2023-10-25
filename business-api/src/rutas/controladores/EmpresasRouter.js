import express from 'express';
import { ActualizarEmpresa, CrearEmpresa, DesactivarEmpresa, InfoEmpresa, InfoEmpresas, InfoEmpresasCategoria, InfoEmpresasCategoriaFiltro } from './controladores/EmpresasController.js';
const router = express.Router();

router.post('/crear', CrearEmpresa);
router.post('/actualizar', ActualizarEmpresa);
router.post('/eliminar', DesactivarEmpresa);
router.get('/', InfoEmpresas);
router.post('/info', InfoEmpresa);
router.post('/categoria', InfoEmpresasCategoria);
router.post('/categoria/filtro', InfoEmpresasCategoriaFiltro);

export default router;