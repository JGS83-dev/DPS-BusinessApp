import firebase from './../../config/FirebaseConfig.js';
import { getFirestore } from 'firebase-admin/firestore';
const db = getFirestore(firebase);

export const ObtenerEventos = async (req, res, next) => {
    let response = {};
    try {
        const eventos = db.collection('eventos');
        const snapshot = eventos.where('estado','==','activo').get().then((result) => {
            // console.log('Resultado:',result);
            if (result.empty) {
                response.data = [];
                response.message = 'No se econtraron Eventos activos';
                res.status(400).json(response);
            } else {
                let data = [];
                result.forEach(doc => {
                    let tempEvento = {
                        id: doc.id,
                        titulo: doc._fieldsProto.titulo.stringValue,
                        estado: doc._fieldsProto.estado.stringValue
                    }
                    data.push(tempEvento);
                });
                response.data = data;
                response.message = 'Eventos activos';
                res.status(200).json(response);
            }
        }).catch(e=>{
            console.log('Se produjo una excepcion al procesar la información:', e);
            response.message = 'Ocurrió un error al procesar la información';
            res.status(400).json(response);
        });
    } catch (error) {
        console.log('Se produjo una excepcion al procesar la peticion:', error);
        response.message = 'Ocurrió un error al procesar la petición';
        res.status(400).json(response);
    }
};