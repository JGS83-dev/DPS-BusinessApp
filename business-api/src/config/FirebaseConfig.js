import { initializeApp, cert } from 'firebase-admin/app';
import serviceAccount from './ServiceAccount.js';
import { config } from "dotenv";
config();

const firebase = initializeApp({
  credential: cert(serviceAccount),
  storageBucket:process.env.bucket_name
});

export default firebase;