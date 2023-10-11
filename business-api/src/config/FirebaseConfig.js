import { initializeApp, cert } from 'firebase-admin/app';
import serviceAccount from './ServiceAccount.js';

const firebase = initializeApp({
  credential: cert(serviceAccount)
});

export default firebase;