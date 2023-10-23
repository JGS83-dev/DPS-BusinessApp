import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { WEB_CLIENT_ID } from "@env";
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

import ContenedorPrincipal from "./ContenedorPrincipal";
import { colores } from "../config/colores";
import { app } from "../config/firebase/FirebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import {
  getAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("window").height;
const cabeceraMensajeHeight = 0.07 * screenHeight;
const cabeceraMensajePadding = 0.01 * screenHeight;
const cabeceraMensajeMargin = 0.03 * screenHeight;
const iconSize = 0.2 * screenHeight;
const iconMargin = 0.01 * screenHeight;

function Login({ navigation }) {
  const auth = getAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setuserInfo] = useState();

  const handleProvider = async () => {
    try {
      if (userInfo !== undefined) {
        console.log("Cerrando sesion");
        await GoogleSignin.signOut();
        setuserInfo(undefined);
        console.log("Revocando acceso");
        await GoogleSignin.revokeAccess();
      }
      console.log("Iniciando sesion con Google");
      await GoogleSignin.hasPlayServices();
      const data = await GoogleSignin.signIn();
      console.log("Asignando sesion");
      setuserInfo(data);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("Operación cancelada por el usuario");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Inicio de sesion en progreso");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("Servicio no disponible");
      } else {
        console.log("Error:", error);
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["email", "https://www.googleapis.com/auth/drive.readonly"],
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    if (userInfo !== undefined) {
      //   console.log("Info de sesión:", userInfo);
      Alert.alert("Inicio de sesión", "Inicio de sesión con Google Exitoso", [
        { text: "OK", onPress: () => navigation.navigate("PerfilUsuario") },
      ]);
    }
  }, [userInfo]);

  const handleSignUp = () => {
    // console.log("Creando Cuenta");
    navigation.navigate("CrearCuenta");
  };

  const handleLogin = () => {
    // console.log("Iniciando sesion");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user.uid;
        // console.log("Sesion iniciada:", userCredentials.user.uid);
        setSession(user);
        Alert.alert(
          "Inicio de sesión",
          "Inicio de sesión con Credenciales Exitoso",
          [{ text: "OK", onPress: () => navigation.navigate("PerfilUsuario") }]
        );
      })
      .catch((error) => alert(error.message));
  };

  const setSession = async (uid) => {
    await AsyncStorage.setItem("uid", uid);
  };

  return (
    <>
      <ContenedorPrincipal
        titulo="Iniciar Sesión"
        navigation={navigation}
        contenido={
          <>
            <View style={styles.cabeceraMensaje}>
              <Text style={styles.letraTitulo}>Complete los campos</Text>
            </View>
            <View style={styles.imgContainer}>
              <FontAwesomeIcon icon={faImage} size={iconSize} />
            </View>

            <KeyboardAvoidingView style={styles.container} behavior="height">
              <View style={styles.containerIzquierdo}>
                <Text style={styles.letraTitulo}>Ingrese sus credenciales</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.letra}>Correo:</Text>
                <TextInput
                  placeholder="Correo"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.letra}>Contraseña:</Text>
                <TextInput
                  placeholder="Contraseña"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  style={styles.input}
                  secureTextEntry
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                  <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSignUp}
                  style={[styles.button]}
                >
                  <Text style={styles.buttonText}>Crear Cuenta</Text>
                </TouchableOpacity>
                <GoogleSigninButton
                  style={{ width: 200, height: 60 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={handleProvider}
                />
              </View>
            </KeyboardAvoidingView>
          </>
        }
      ></ContenedorPrincipal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    marginTop: iconMargin,
    justifyContent: "center",
    alignItems: "center",
  },
  containerIzquierdo: {
    justifyContent: "flex-start",
    padding: 5,
  },
  inputContainer: {
    width: "80%",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: colores.fondoBarras,
    width: "100%",
    padding: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: colores.letra,
    fontSize: 16,
  },
  letraTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colores.letra,
  },
  letra: {
    fontSize: 16,
    color: colores.letra,
  },
  cabeceraMensaje: {
    backgroundColor: colores.fondoBarras,
    height: cabeceraMensajeHeight,
    padding: cabeceraMensajePadding,
    marginTop: cabeceraMensajeMargin,
    alignItems: "center",
    alignContent: "center",
  },
});

export default Login;
