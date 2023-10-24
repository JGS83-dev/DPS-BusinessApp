import firebase from "./../../config/FirebaseConfig.js";
import { getFirestore } from "firebase-admin/firestore";
const db = getFirestore(firebase);

export const ObtenerCategorias = async (req, res, next) => {
  let response = {};
  try {
    const categorias = db.collection("categorias");
    const snapshot = categorias
      .where("estado", "==", "activo")
      .get()
      .then((result) => {
        // console.log('Resultado:',result);
        if (result.empty) {
          response.data = [];
          response.message = "No se econtraron Categorias activas";
          res.status(400).json(response);
        } else {
          let data = [];
          result.forEach((doc) => {
            // console.log('Resultado',doc);
            let tempCategoria = {
              id: doc.id,
              titulo: doc._fieldsProto.titulo.stringValue,
              descripcion: doc._fieldsProto.descripcion.stringValue,
              estado: doc._fieldsProto.estado.stringValue,
              icono: doc._fieldsProto.icono.stringValue,
            };
            data.push(tempCategoria);
          });
          response.data = data;
          response.message = "Categorias activas";
          res.status(200).json(response);
        }
      })
      .catch((e) => {
        console.log("Se produjo una excepcion al procesar la información:", e);
        response.message = "Ocurrió un error al procesar la información";
        res.status(400).json(response);
      });
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const RegistrarCategoria = async (req, res, next) => {
  let response = {};
  try {
    // console.log("Cuerpo Peticion:", req.body);
    const dataBody = req.body;
    if (dataBody === undefined) {
      response.message = "Información de la categoria requerida";
      res.status(400).json(response);
    }
    const categorias = db.collection("categorias");
    const idCategoria = categorias
      .add({
        titulo: dataBody.titulo,
        descripcion: dataBody.descripcion,
        icono: dataBody.icono,
        estado: 'activo'
      })
      .then((result) => {
        // console.log(result);
        response.message = "Categoria creada exitosamente";
        res.status(200).json(response);
      })
      .catch((e) => {
        console.log("Se produjo una excepcion al procesar la información:", e);
        response.message = "Ocurrió un error al procesar la información";
        res.status(400).json(response);
      });
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const EliminarCategoria = async (req, res, next) => {
  let response = {};
  try {
    const categoria = db.collection("categorias").doc(req.body.id);
    const resultado = await categoria.update({
      estado: "inactivo",
    });

    response.message = "Categoria desactivada";
    res.status(200).json(response);
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const ModificarCategoria = async (req, res, next) => {
    let response = {};
    try {
      const categoria = db.collection("categorias").doc(req.body.id);
      const resultado = await categoria.update({
        ...req.body.cambios
      });
  
      response.message = "Categoria actualizada";
      res.status(200).json(response);
    } catch (error) {
      console.log("Se produjo una excepcion al procesar la peticion:", error);
      response.message = "Ocurrió un error al procesar la petición";
      res.status(400).json(response);
    }
  };
