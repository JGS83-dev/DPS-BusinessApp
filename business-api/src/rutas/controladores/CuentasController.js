// import { UploadFileToBucket } from "../../utils/CloudStorage.js";
import firebase from "./../../config/FirebaseConfig.js";
import { getFirestore } from "firebase-admin/firestore";
const db = getFirestore(firebase);

export const CrearCuenta = async (req, res, next) => {
  let response = {};
  try {
    const dataBody = req.body;
    if (dataBody === undefined) {
      response.message = "Información de la cuenta requerida";
      res.status(400).json(response);
    }
    const usuarios = db
      .collection("usuarios")
      .doc(dataBody.auth)
      .set({
        nombre: dataBody.nombre,
        apellido: dataBody.apellido,
        correo: dataBody.correo,
        estado: "activo",
        imagen: dataBody.imagen,
      })
      .then((result) => {
        console.log("Cuenta creada:", req.body.auth);
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

    response.message = "Usuario actualizado";
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
      .where("correo","==",req.body.auth)
      .get()
      .then((doc) => {
        if (doc.empty) {
          response.data = [];
          response.message = "No se econtro al usuario";
          res.status(400).json(response);
        } else {
            // console.log('Resultado',doc);
            doc.forEach(doc=>{
              let tempUsuario = {
                id: doc.id,
                estado: doc._fieldsProto.estado.stringValue,
                correo: doc._fieldsProto.correo.stringValue,
                imagen: doc._fieldsProto.imagen.stringValue,
                nombre: doc._fieldsProto.nombre.stringValue,
                apellido: doc._fieldsProto.apellido.stringValue,
              };
              response.data = tempUsuario;
              response.message = "Usuario activo";
              res.status(200).json(response);
            })
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
