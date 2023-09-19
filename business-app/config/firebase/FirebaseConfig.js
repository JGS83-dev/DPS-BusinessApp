import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./ServiceAccount";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const createAccount = createUserWithEmailAndPassword(app)

export { auth,createAccount };