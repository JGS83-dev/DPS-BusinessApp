import firebase from "./../../config/FirebaseConfig.js";
import { getFirestore } from "firebase-admin/firestore";
const db = getFirestore(firebase);

export const ObtenerEventos = async (req, res, next) => {
  let response = {};
  try {
    const eventos = db.collection("eventos");
    const snapshot = eventos
      .where("estado", "==", "activo")
      .get()
      .then((doc) => {
        // console.log('Resultado:',doc);
        if (doc.empty) {
          response.data = [];
          response.message = "No se econtraron Eventos activos";
          res.status(400).json(response);
        } else {
          let data = [];
          doc.forEach((doc) => {
            // console.log('Resultado',doc);
            let tempEvento = {
              id: doc.id,
              titulo: doc._fieldsProto.titulo.stringValue,
              estado: doc._fieldsProto.estado.stringValue,
              descripcion: {
                completa:
                  doc._fieldsProto.descripcion.mapValue.fields.completa
                    .stringValue,
                otros:
                  doc._fieldsProto.descripcion.mapValue.fields.otros
                    .stringValue,
                resumen:
                  doc._fieldsProto.descripcion.mapValue.fields.resumen
                    .stringValue,
              },
              imagenes: {
                principal:
                  doc._fieldsProto.imagenes.mapValue.fields.principal
                    .stringValue,
                otras:
                  doc._fieldsProto.imagenes.mapValue.fields.otras.arrayValue
                    .values,
              },
              fechaInicio: doc._fieldsProto.fechaInicio.stringValue,
              fechaFin: doc._fieldsProto.fechaFin.stringValue,
              autor: doc._fieldsProto.autor.integerValue,
            };
            data.push(tempEvento);
          });
          response.data = data;
          response.message = "Eventos activos";
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

export const RegistrarEvento = async (req, res, next) => {
  let response = {};
  try {
    // console.log("Cuerpo Peticion:", req.body);
    const dataBody = req.body;
    if (dataBody === undefined) {
      response.message = "Información del evento requerida";
      res.status(400).json(response);
    }
    const eventos = db.collection("eventos");
    const idEvento = eventos
      .add({
        titulo: dataBody.titulo,
        descripcion: dataBody.descripcion,
        imagenes: dataBody.imagenes,
        fechaInicio: dataBody.fechaInicio,
        fechaFin: dataBody.fechaFin,
        estado: dataBody.estado,
        autor: dataBody.autor,
      })
      .then((doc) => {
        // console.log(doc);
        response.data = {};
        response.message = "Evento creado exitosamente";
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

export const EliminarEvento = async (req, res, next) => {
  let response = {};
  try {
    const evento = db.collection("eventos").doc(req.body.id);
    const resultado = await evento.update({
      estado: "inactivo",
    });

    response.message = "Evento desactivado";
    res.status(200).json(response);
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const ModificarEvento = async (req, res, next) => {
  let response = {};
  try {
    const evento = db.collection("eventos").doc(req.body.id);
    const resultado = await evento.update({
      ...req.body.cambios,
    });

    response.message = "Evento actualizado";
    res.status(200).json(response);
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const InfoEvento = async (req, res, next) => {
  let response = {};
  try {
    const eventos = db
      .collection("eventos")
      .doc(req.body.id)
      .get()
      .then((doc) => {
        // console.log('Resultado:',doc);
        if (doc.empty) {
          response.data = [];
          response.message = "No se encontro la noticia";
          res.status(400).json(response);
        } else {
          // console.log('Resultado',doc);
          let tempEvento = {
            id: doc.id,
            titulo: doc._fieldsProto.titulo.stringValue,
            estado: doc._fieldsProto.estado.stringValue,
            descripcion: {
              completa:
                doc._fieldsProto.descripcion.mapValue.fields.completa
                  .stringValue,
              otros:
                doc._fieldsProto.descripcion.mapValue.fields.otros.stringValue,
              resumen:
                doc._fieldsProto.descripcion.mapValue.fields.resumen
                  .stringValue,
            },
            imagenes: {
              principal:
                doc._fieldsProto.imagenes.mapValue.fields.principal.stringValue,
              otras:
                doc._fieldsProto.imagenes.mapValue.fields.otras.arrayValue
                  .values,
            },
            fechaInicio: doc._fieldsProto.fechaInicio.stringValue,
            fechaFin: doc._fieldsProto.fechaFin.stringValue,
            autor: doc._fieldsProto.autor.integerValue,
          };

          response.data = tempEvento;
          response.message = "Eventos activos";
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
