import express from "express";
import {
  ObtenerEventos,
  RegistrarEvento,
  EliminarEvento,
  ModificarEvento,
  InfoEvento,
  SubirArchivo,
} from "./controladores/EventosController.js";
const router = express.Router();
import multer from "multer";
import os from "os";
const upload = multer({ dest: os.tmpdir() });

router.get("/", ObtenerEventos);
router.post("/", upload.array('files', 12), SubirArchivo);
router.post("/agregar", RegistrarEvento);
router.post("/eliminar", EliminarEvento);
router.post("/modificar", ModificarEvento);
router.post("/info", InfoEvento);

export default router;
