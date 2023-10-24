import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./ServiceAccount";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence,initializeAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

export { app,auth };