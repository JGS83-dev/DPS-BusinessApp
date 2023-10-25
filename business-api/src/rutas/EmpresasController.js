// import { UploadFileToBucket } from "../../utils/CloudStorage.js";
import firebase from "./../../config/FirebaseConfig.js";
import { getFirestore } from "firebase-admin/firestore";
const db = getFirestore(firebase);

export const CrearEmpresa = async (req, res, next) => {
  let response = {};
  try {
    const dataBody = req.body;
    if (dataBody === undefined) {
      response.message = "Información de la empresa requerida";
      res.status(400).json(response);
    }
    const empresas = db
      .collection("empresas")
      .doc(dataBody.auth)
      .set({
        nombre: dataBody.nombre,
        descripcion: dataBody.descripcion,
        imagen: dataBody.imagen,
        estado: "activo",
        ubicacion: dataBody.ubicacion,
        sucursales: dataBody.sucursales,
        horario: dataBody.horario,
        telefono: dataBody.telefono,
        fechaFundacion: dataBody.fechaFundacion,
        fechaRegistro: dataBody.fechaRegistro,
        categoria: dataBody.categoria,
        correo: dataBody.correo,
      })
      .then((result) => {
        // console.log(result);
        console.log("Cuenta creada:", req.body.auth);
      })
      .catch((e) => {
        console.log("Se produjo una excepcion al procesar la información:", e);
        response.message = "Ocurrió un error al procesar la información";
        res.status(400).json(response);
      });
    // await UploadFileToBucket();
    response.message = "Cuenta empresarial creada exitosamente";
    res.status(200).json(response);
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const DesactivarEmpresa = async (req, res, next) => {
  let response = {};
  try {
    const empresas = db.collection("empresas").doc(req.body.id);
    const resultado = await empresas.update({
      estado: "inactivo",
    });

    response.message = "Empresa desactivada";
    res.status(200).json(response);
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const ActualizarEmpresa = async (req, res, next) => {
  let response = {};
  try {
    const empresas = db.collection("empresas").doc(req.body.id);
    const resultado = await empresas.update({
      ...req.body.cambio,
    });

    response.message = "Empresa Actualizada";
    res.status(200).json(response);
  } catch (error) {
    console.log("Se produjo una excepcion al procesar la peticion:", error);
    response.message = "Ocurrió un error al procesar la petición";
    res.status(400).json(response);
  }
};

export const InfoEmpresas = async (req, res, next) => {
  let response = {};
  try {
    const empresas = db.collection("empresas");
    const snapshot = empresas
      .where("estado", "==", "activo")
      .get()
      .then((result) => {
        if (result.empty) {
          response.data = [];
          response.message = "No se econtron empresas activas";
          res.status(400).json(response);
        } else {
          let data = [];
          result.forEach((doc) => {
            // console.log('Sucursales',doc._fieldsProto.sucursales.arrayValue.values);
            // console.log('Horario',doc._fieldsProto.horario.arrayValue);
            // console.log('Telefono',doc._fieldsProto.telefono.arrayValue);
            let listaHorario = [];
            doc._fieldsProto.horario.arrayValue.values.map((ele) => {
              listaHorario.push(ele.mapValue.fields);
            });
            let listaTelefono = [];
            doc._fieldsProto.telefono.arrayValue.values.map((ele) => {
              listaTelefono.push(ele.mapValue.fields);
            });
            let listaSucursales = [];
            doc._fieldsProto.sucursales.arrayValue.values.map((ele) => {
              listaSucursales.push(ele.mapValue.fields);
            });
            let tempEmpresa = {
              id: doc.id,
              estado: doc._fieldsProto.estado.stringValue,
              nombre: doc._fieldsProto.nombre.stringValue,
              descripcion: doc._fieldsProto.descripcion.stringValue,
              imagen: doc._fieldsProto.imagen.mapValue.fields,
              ubicacion: doc._fieldsProto.ubicacion.stringValue,
              sucursales: listaSucursales,
              horario: listaHorario,
              telefono: listaTelefono,
              fechaFundacion: doc._fieldsProto.fechaFundacion.stringValue,
              fechaRegistro: doc._fieldsProto.fechaRegistro.stringValue,
              categoria: doc._fieldsProto.categoria.stringValue,
              correo: doc._fieldsProto.correo.stringValue,
            };
            data.push(tempEmpresa);
          });
          response.data = data;
          response.message = "Empresas activas";
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

export const InfoEmpresa = async (req, res, next) => {
  let response = {};
  try {
    const empresas = db.collection("empresas").doc(req.body.id);
    const snapshot = empresas
      .get()
      .then((doc) => {
        if (doc.empty) {
          response.data = [];
          response.message = "No se econtro empresa activa";
          res.status(400).json(response);
        } else {
            // console.log('Resultado',doc);
            let listaHorario = [];
            doc._fieldsProto.horario.arrayValue.values.map((ele) => {
              listaHorario.push(ele.mapValue.fields);
            });
            let listaTelefono = [];
            doc._fieldsProto.telefono.arrayValue.values.map((ele) => {
              listaTelefono.push(ele.mapValue.fields);
            });
            let listaSucursales = [];
            doc._fieldsProto.sucursales.arrayValue.values.map((ele) => {
              listaSucursales.push(ele.mapValue.fields);
            });
            let tempEmpresa = {
              id: doc.id,
              estado: doc._fieldsProto.estado.stringValue,
              nombre: doc._fieldsProto.nombre.stringValue,
              descripcion: doc._fieldsProto.descripcion.stringValue,
              imagen: doc._fieldsProto.imagen.mapValue.fields,
              ubicacion: doc._fieldsProto.ubicacion.stringValue,
              sucursales: listaSucursales,
              horario: listaHorario,
              telefono: listaTelefono,
              fechaFundacion: doc._fieldsProto.fechaFundacion.stringValue,
              fechaRegistro: doc._fieldsProto.fechaRegistro.stringValue,
              categoria: doc._fieldsProto.categoria.stringValue,
              correo: doc._fieldsProto.correo.stringValue,
            };

          response.data = tempEmpresa;
          response.message = "Empresa activa";
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

export const InfoEmpresasCategoria = async (req, res, next) => {
  let response = {};
  try {
    const empresas = db.collection("empresas");
    const snapshot = empresas
      .where("estado", "==", "activo")
      .where("categoria", "==", req.body.categoria)
      .get()
      .then((result) => {
        if (result.empty) {
          response.data = [];
          response.message = "No se econtron empresas activas para esa categoria";
          res.status(400).json(response);
        } else {
          let data = [];
          result.forEach((doc) => {
            let listaHorario = [];
            doc._fieldsProto.horario.arrayValue.values.map((ele) => {
              listaHorario.push(ele.mapValue.fields);
            });
            let listaTelefono = [];
            doc._fieldsProto.telefono.arrayValue.values.map((ele) => {
              listaTelefono.push(ele.mapValue.fields);
            });
            let listaSucursales = [];
            doc._fieldsProto.sucursales.arrayValue.values.map((ele) => {
              listaSucursales.push(ele.mapValue.fields);
            });
            let tempEmpresa = {
              id: doc.id,
              estado: doc._fieldsProto.estado.stringValue,
              nombre: doc._fieldsProto.nombre.stringValue,
              descripcion: doc._fieldsProto.descripcion.stringValue,
              imagen: doc._fieldsProto.imagen.mapValue.fields,
              ubicacion: doc._fieldsProto.ubicacion.stringValue,
              sucursales: listaSucursales,
              horario: listaHorario,
              telefono: listaTelefono,
              fechaFundacion: doc._fieldsProto.fechaFundacion.stringValue,
              fechaRegistro: doc._fieldsProto.fechaRegistro.stringValue,
              categoria: doc._fieldsProto.categoria.stringValue,
              correo: doc._fieldsProto.correo.stringValue,
            };
            data.push(tempEmpresa);
          });
          response.data = data;
          response.message = "Empresas activas";
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


export const InfoEmpresasCategoriaFiltro = async (req, res, next) => {
  let response = {};
  try {
    const empresas = db.collection("empresas");
    const snapshot = empresas
      .where("estado", "==", "activo")
      .where("categoria", "==", req.body.categoria)
      .where("nombre", "==", req.body.nombre)
      .get()
      .then((result) => {
        if (result.empty) {
          response.data = [];
          response.message = "No se econtron empresas activas para esa categoria";
          res.status(400).json(response);
        } else {
          let data = [];
          result.forEach((doc) => {
            let listaHorario = [];
            doc._fieldsProto.horario.arrayValue.values.map((ele) => {
              listaHorario.push(ele.mapValue.fields);
            });
            let listaTelefono = [];
            doc._fieldsProto.telefono.arrayValue.values.map((ele) => {
              listaTelefono.push(ele.mapValue.fields);
            });
            let listaSucursales = [];
            doc._fieldsProto.sucursales.arrayValue.values.map((ele) => {
              listaSucursales.push(ele.mapValue.fields);
            });
            let tempEmpresa = {
              id: doc.id,
              estado: doc._fieldsProto.estado.stringValue,
              nombre: doc._fieldsProto.nombre.stringValue,
              descripcion: doc._fieldsProto.descripcion.stringValue,
              imagen: doc._fieldsProto.imagen.mapValue.fields,
              ubicacion: doc._fieldsProto.ubicacion.stringValue,
              sucursales: listaSucursales,
              horario: listaHorario,
              telefono: listaTelefono,
              fechaFundacion: doc._fieldsProto.fechaFundacion.stringValue,
              fechaRegistro: doc._fieldsProto.fechaRegistro.stringValue,
              categoria: doc._fieldsProto.categoria.stringValue,
              correo: doc._fieldsProto.correo.stringValue,
            };
            data.push(tempEmpresa);
          });
          response.data = data;
          response.message = "Empresas activas";
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