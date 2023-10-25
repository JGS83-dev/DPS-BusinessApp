import React, { useState, useEffect } from "react";
import ContenedorPrincipal from "./ContenedorPrincipal";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { colores } from "../config/colores";
import axiosInstance from "../config/axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("window").height;
const cabeceraMensajeHeight = 0.07 * screenHeight;
const cabeceraMensajePadding = 0.01 * screenHeight;
const cabeceraMensajeMargin = 0.03 * screenHeight;
const iconSize = 0.18 * screenHeight;
const iconMargin = 0.05 * screenHeight;

const PerfilUsuario = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerInfoUsuario = async () => {
      const correo = await AsyncStorage.getItem("correo");
      // console.log('UID:',uid);
      axiosInstance
        .post("/cuenta/info", {
          auth: correo,
        })
        .then(function (response) {
          setUsuario(response.data.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    obtenerInfoUsuario();
  }, []);

  const SetSession = async (uid) => {
    await AsyncStorage.setItem("uid", uid);
  }

  useEffect(() => {
    if (usuario !== null) {
      // console.log("Usuario:", usuario);
      SetSession(usuario.auth);
      setIsLoading(false);
    }
  }, [usuario]);

  return (
    <ContenedorPrincipal
      titulo="INFORMACION DE LA CUENTA"
      navigation={navigation}
      contenido={
        <>
          {isLoading ? (
            <Text style={styles.letra}>Cargando...</Text>
          ) : (
            <>
              <View style={styles.cabeceraMensaje}>
                <Text style={styles.letraTitulo}>
                  {usuario.nombre} {usuario.apellido}
                </Text>
              </View>
              <View style={styles.containerimg}>
                <ScrollView horizontal={true}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={{ uri: `${usuario.imagen}` }}
                      style={styles.cardImage}
                    />
                  </View>
                </ScrollView>
              </View>

              <View style={styles.mensajeDetalle}>
                <Text style={styles.letraInfo}>Detalles</Text>
              </View>
              <ScrollView vertical={true}>
                <View style={styles.inputContainer}>
                  <Text style={styles.letra}>
                    Nombre(s): {usuario.nombre}
                    {`\n`}
                  </Text>
                  <Text style={styles.letra}>
                    Apellido(s): {usuario.apellido}
                    {`\n`}
                  </Text>
                  <Text style={styles.letra}>
                    Correo: {usuario.correo}
                    {`\n`}
                  </Text>
                </View>
              </ScrollView>
            </>
          )}
        </>
      }
    ></ContenedorPrincipal>
  );
};

export default PerfilUsuario;

const styles = StyleSheet.create({
  containerimg: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "8%",
    marginBottom: "3%",
  },
  iconContainer: {
    margin: iconMargin,
    justifyContent: "center",
    alignItems: "center",
  },
  letraInfo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colores.letra,
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
    marginLeft: "10%",
  },
  inputContainer: {
    width: "80%",
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    justifyContent: "space-evenly",
    marginLeft: "15%",
    marginTop: "5%",
  },
  cabeceraMensaje: {
    backgroundColor: colores.fondoBarras,
    height: cabeceraMensajeHeight,
    padding: cabeceraMensajePadding,
    marginTop: cabeceraMensajeMargin,
    alignItems: "center",
    alignContent: "center",
  },
  mensajeDetalle: {
    marginLeft: "10%",
  },
  cardImage: {
    width: iconSize * 1.5,
    height: iconSize * 1.5,
    borderRadius: 10,
  },
});
