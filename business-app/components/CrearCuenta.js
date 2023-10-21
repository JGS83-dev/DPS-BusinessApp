import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";

import ContenedorPrincipal from "./ContenedorPrincipal";
import { colores } from "../config/colores";
import { app } from "../config/firebase/FirebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAddressCard, faImage } from "@fortawesome/free-solid-svg-icons";

const screenHeight = Dimensions.get("window").height;
const cabeceraMensajeHeight = 0.07 * screenHeight;
const cabeceraMensajePadding = 0.01 * screenHeight;
const cabeceraMensajeMargin = 0.03 * screenHeight;
const iconSize = 0.2 * screenHeight;
const iconMargin = 0.01 * screenHeight;

const CrearCuenta = ({ onSubmit,navigation }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
//Const para el manejo del error  
const [nameError, setNameError] = useState('');
const [lastNameError, setLastNameError] = useState('');
const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');
const [confirmPasswordError, setConfirmPasswordError] = useState('');


//Metodo Handle
const handleNameChange = (text) => {
  setName(text);
  if (text.trim() === '') {
    setNameError('Debe completar el campo');
  } else {
    setNameError('');
  }
};

const handleLastNameChange = (text) => {
  setLastName(text);
  if (text.trim() === '') {
    setLastNameError('Debe completar el campo');
  } else {
    setLastNameError('');
  }
};

const handleEmailChange = (text) => {
  setEmail(text);
  if (text.trim() === '') {
    setEmailError('Debe completar el campo');
  } else {
    setEmailError('');
  }
};

const handlePasswordChange = (text) => {
  setPassword(text);
  if (text.trim() === '') {
    setPasswordError('Debe completar el campo');
  } else {
    setPasswordError('');
  }
};

const handleConfirmPasswordChange = (text) => {
  setConfirmPassword(text);
  if (text.trim() === '') {
    setConfirmPasswordError('Debe completar el campo');
  } else {
    setConfirmPasswordError('');
  }
};



//Fin del metodo

  //Este es el codigo que sirve para mandar a llamar a una imagen localmente
  const onPress = () => {
    // Abre el selector de archivos
    navigation.navigate("ImagePicker", {
      onImagePicked: (image) => {
        // Actualiza el estado de la imagen
        setImage(image);
      },
    });
  };

  const handleSubmit = () => {
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

  return (
    <>
      <ContenedorPrincipal
        titulo="Crear Cuenta"
        navigation={navigation}
        contenido={
          <>
            <View style={styles.cabeceraMensaje}>
              <Text style={styles.letraTitulo}>Complete los campos</Text>
            </View>
            <View style={styles.container}>
              {image && <Image source={image} style={styles.image} />}
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
                }}
                onPress={onPress}
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
                onChangeText={handleNameChange}
                style={styles.input}
                />
                 {nameError && <Text style={styles.errorText}>{nameError}</Text>}
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
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Crear cuenta</Text>
                </TouchableOpacity>
                <FontAwesomeIcon icon={faAddressCard} size={iconSize * 0.4} />
              </View>
            </View>
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
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
export default CrearCuenta;
