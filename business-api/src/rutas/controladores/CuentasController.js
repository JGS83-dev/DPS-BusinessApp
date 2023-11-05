import { UploadFileToBucket } from "../../utils/CloudStorage.js";
import firebase from "./../../config/FirebaseConfig.js";
import { getFirestore } from "firebase-admin/firestore";
const db = getFirestore(firebase);

export const CrearCuenta = async (req, res, next) => {
  let response = {};
  try {
    //Se sube el archivo
    const file = req.body.file;
    const buffer = Buffer.from(file, 'base64')
    const nombre = req.body.filename;
    const url = await UploadFileToBucket(buffer,nombre);

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
        auth: dataBody.auth,
        apellido: dataBody.apellido,
        correo: dataBody.correo,
        estado: "activo",
        imagen: url,
      })
      .then((result) => {
        console.log("Cuenta creada:", req.body.auth);
      })
      .catch((e) => {
        console.log("Se produjo una excepcion al procesar la información:", e);
        response.message = "Ocurrió un error al procesar la información";
        res.status(400).json(response);
      });

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
                auth: doc._fieldsProto.auth.stringValue,
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
