import firebase from './../../config/FirebaseConfig.js';
import { getFirestore } from 'firebase-admin/firestore';
const db = getFirestore(firebase);

export const ObtenerEventos = async (req, res, next) => {
    let response = {}
    try {
        const eventos = await db.collection('eventos').get();
        if (eventos.empty) {
            response.data = eventos;
            response.message = 'No se econtraron Eventos activos';
            res.status(400).json(response);
        } else {
            response.data = eventos;
            response.message = 'Eventos activos';
            res.status(200).json(response);
        }
    } catch (error) {
        console.log('Ocurrio el error:', error);
        response.message = 'Ocurrió un error';
        res.status(400).json(response);
    }
};