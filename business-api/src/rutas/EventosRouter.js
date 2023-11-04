import express from "express";
import {
  ObtenerEventos,
  RegistrarEvento,
  EliminarEvento,
  ModificarEvento,
  InfoEvento,
} from "./controladores/EventosController.js";
const router = express.Router();

router.get("/", ObtenerEventos);
router.post("/agregar", RegistrarEvento);
router.post("/eliminar", EliminarEvento);
router.post("/modificar", ModificarEvento);
router.post("/info", InfoEvento);

export default router;
