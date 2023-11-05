import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import ContenedorPrincipal from "./ContenedorPrincipal";
import { colores } from "../config/colores";
import { app } from "../config/firebase/FirebaseConfig";

const screenHeight = Dimensions.get("window").height;
const cabeceraMensajeHeight = 0.07 * screenHeight;
const cabeceraMensajePadding = 0.01 * screenHeight;
const cabeceraMensajeMargin = 0.03 * screenHeight;

const CrearCuenta = ({ onSubmit, navigation }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imagen, setImagen] = useState(null);
  const [nombreImage, setNombreImage] = useState(null);

  const [error, setError] = useState("");
  const handleChange = (text) => {
    setName(text);
    if (!text) {
      setError("Este campo es obligatorio");
    } else {
      setError("");
    }
  };
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    onSubmit({
      name,
      lastName,
      email,
      password,
    });
  };

  const chooseImage = async () => {
    let options = {
      maxWidth:300,
      maxHeight:300,
      includeBase64:true,
      mediaType:'photo',
      title: "Seleccione imagen de perfil",
      customButtons: [
        { name: "customOptionKey", title: "Seleccione una imagen" },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      // console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        const data = response.assets[0];
        setImagen(data.base64);
        // console.log("Data:", data.base64);
        setNombreImage(data.fileName);
      }
    });
  };

  useEffect(() => {
    if (imagen !== null) {
      console.log("Imagen cambiada");
    }
  }, [imagen]);

  useEffect(() => {
    if (nombreImage !== null) {
      console.log("Nombre Imagen cambiado");
    }
  }, [nombreImage]);

  return (
    <>
      <ContenedorPrincipal
        titulo="Crear Cuenta"
        navigation={navigation}
        contenido={
          <>
            <ScrollView>
              <View style={styles.cabeceraMensaje}>
                <Text style={styles.letraTitulo}>Complete los campos</Text>
              </View>
              <View style={styles.container}>
                <TouchableOpacity
                  style={{
                    backgroundColor: colores.fondoBarras,
                    color: "#ffffff",
                    width: 90,
                    height: 90,
                    borderWidth: 1,
                    borderRadius: 50,
                    padding: 0,
                    alignItems: "center",
                    marginTop: 10,
                  }}
                  onPress={chooseImage}
                >
                  <Text
                    style={{
                      color: colores.letra,
                      fontSize: 26,
                      textAlign: "center",
                      margin: 0,
                      paddingTop: 25,
                    }}
                  >
                    +
                  </Text>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                  <Text style={styles.letra}>Nombre:</Text>
                  <TextInput
                    placeholder="Nombres"
                    value={name}
                    required
                    onChangeText={handleChange}
                    style={styles.input}
                  />
                  {error && <Text style={styles.error}>{error}</Text>}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.letra}>Apellido:</Text>
                  <TextInput
                    placeholder="Apellidos"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                    style={styles.input}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.letra}>Correo Electronico:</Text>
                  <TextInput
                    placeholder="ejemplo@test.com"
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
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.letra}>Confirmar Contraseña:</Text>
                  <TextInput
                    placeholder="Confirmar"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    style={styles.input}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Crear cuenta</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </>
        }
      ></ContenedorPrincipal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  error: {
    color: "red",
    fontSize: 16,
  },
});
export default CrearCuenta;
