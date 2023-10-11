const db = require('./../../config/FirebaseConfig');

async function ObtenerEventos() {
    try {
        const snapshot = await db.collection('eventos').get();
        return snapshot;
    } catch (e) {
        console.log('Error:', e);
    }
}
module.exports = { ObtenerEventos } 