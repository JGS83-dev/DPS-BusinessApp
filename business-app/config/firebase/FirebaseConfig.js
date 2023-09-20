import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, getReactNativePersistence } from "firebase/auth";
import { firebaseConfig } from "./ServiceAccount";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const createAccount = createUserWithEmailAndPassword(app)

export { auth, createAccount };