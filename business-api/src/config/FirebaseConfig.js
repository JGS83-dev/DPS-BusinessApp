var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./ServiceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

module.exports = { db } 