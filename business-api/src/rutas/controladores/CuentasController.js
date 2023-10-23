// import { UploadFileToBucket } from "../../utils/CloudStorage.js";
import firebase from "./../../config/FirebaseConfig.js";
import { getFirestore } from "firebase-admin/firestore";
const db = getFirestore(firebase);

export const CrearCuenta = async (req, res, next) => {
  let response = {};
  try {
    const dataBody = req.body;
    if (dataBody === undefined) {
      response.message = "Información del evento requerida";
      res.status(400).json(response);
    }
    const usuarios = db.collection("usuarios");
    const idCuenta = usuarios
      .add({
        auth: dataBody.auth,
        nombre: dataBody.nombre,
        apellido: dataBody.apellido,
        correo: dataBody.correo,
        estado: "activo",
        imagen: dataBody.imagen,
      })
      .then((result) => {
        // console.log(result);
        response.data = {};
        response.message = "Cuenta creada exitosamente";
        res.status(200).json(response);
      })
      .catch((e) => {
        console.log("Se produjo una excepcion al procesar la información:", e);
        response.message = "Ocurrió un error al procesar la información";
        res.status(400).json(response);
      });
    // await UploadFileToBucket();
    response.message = "Cuenta creada exitosamente";
    res.status(200).json(response);
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const DesactivarCuenta = async (req, res, next) => {
  let response = {};
  try {
    const usuario = db.collection("usuarios").doc(req.body.id);
    const resultado = await usuario.update({
      estado: "inactivo",
    });

    response.message = "Usuario desactivado";
    res.status(200).json(response);
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const ActualizarCuenta = async (req, res, next) => {
  let response = {};
  try {
    const usuario = db.collection("usuarios").doc(req.body.id);
    const resultado = await usuario.update({
      ...req.body.cambio,
    });

    response.message = "Usuario desactivado";
    res.status(200).json(response);
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const InfoCuenta = async (req, res, next) => {
  let response = {};
  try {
    const usuario = db.collection("usuarios");
    const snapshot = usuario
      .where("auth", "==", req.body.auth)
      .get()
      .then((result) => {
        if (result.empty) {
          response.data = [];
          response.message = "No se econtro al usuario";
          res.status(400).json(response);
        } else {
          let data = [];
          result.forEach((doc) => {
            // console.log('Resultado',doc);
            let tempUsuario = {
              id: doc.id,
              estado: doc._fieldsProto.estado.stringValue,
              auth: doc._fieldsProto.auth.stringValue,
              correo: doc._fieldsProto.correo.stringValue,
              imagen: doc._fieldsProto.imagen.stringValue,
              nombre: doc._fieldsProto.nombre.stringValue,
              apellido: doc._fieldsProto.apellido.stringValue,
            };
            data.push(tempUsuario);
          });
          response.data = data;
          response.message = "Usuario activo";
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
