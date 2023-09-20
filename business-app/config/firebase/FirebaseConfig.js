import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./ServiceAccount";

const app = initializeApp(firebaseConfig);

export { app };