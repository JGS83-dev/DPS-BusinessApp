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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../config/axios-config";

const screenHeight = Dimensions.get("window").height;
const cabeceraMensajeHeight = 0.07 * screenHeight;
const cabeceraMensajePadding = 0.01 * screenHeight;
const cabeceraMensajeMargin = 0.03 * screenHeight;
const iconSize = 0.18 * screenHeight;
const iconMargin = 0.05 * screenHeight;

const PerfilEmpresa = ({ route, navigation }) => {
  const { idEmpresa } = route.params;
  const [empresa, setEmpresa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerInfoEmpresa = async () => {
      axiosInstance
        .post("/empresas/info", {
          id: idEmpresa,
        })
        .then(function (response) {
          setEmpresa(response.data.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    obtenerInfoEmpresa();
  }, []);

  useEffect(() => {
    if (empresa !== null) {
      // console.log("Empresa:", empresa);
      setIsLoading(false);
    }
  }, [empresa]);

  return (
    <ContenedorPrincipal
      titulo="Perfil Empresa"
      navigation={navigation}
      contenido={
        <>
          {isLoading ? (
            <Text style={styles.letra}>Cargando...</Text>
          ) : (
            <>
              <View style={styles.cabeceraMensaje}>
                <Text style={styles.letraTitulo}>{empresa.nombre}</Text>
              </View>
              <View style={styles.containerimg}>
                <ScrollView horizontal={true}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={{ uri: `${empresa.imagen.logo.stringValue}` }}
                      style={styles.cardImage}
                    />
                  </View>
                  {empresa.imagen.otras.arrayValue.values.map((img) => (
                    <View
                      style={styles.iconContainer}
                      key={img.mapValue.fields.id.integerValue}
                    >
                      <Image
                        source={{
                          uri: `${img.mapValue.fields.url.stringValue}`,
                        }}
                        style={styles.cardImage}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.mensajeDetalle}>
                <Text style={styles.letraInfo}>Detalles</Text>
              </View>
              <ScrollView vertical={true}>
                <View style={styles.inputContainer}>
                  <Text style={styles.letra}>
                    Ubicación: {empresa.ubicacion}
                    {`\n`}
                  </Text>
                  <Text style={styles.letra}>
                    Descripción: {empresa.descripcion}
                    {`\n`}
                  </Text>
                  <Text style={styles.letra}>
                    Horario de atención:{" "}
                    {empresa.horario.map(
                      (hora) =>
                        `\n * Inicio: ${hora.inicio.stringValue} Fin: ${hora.fin.stringValue}`
                    )}
                    {`\n`}
                  </Text>
                  <Text style={styles.letra}>
                    Sucursales:{" "}
                    {empresa.sucursales.map(
                      (sucursal) => `\n - ${sucursal.nombre.stringValue}`
                    )}
                    {`\n`}
                  </Text>
                  <Text style={styles.letra}>
                    Telefono:{" "}
                    {empresa.telefono.map(
                      (telefono) => `\n * ${telefono.telefono.stringValue}`
                    )}
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

export default PerfilEmpresa;

const styles = StyleSheet.create({
  containerimg: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "8%",
    marginBottom: "3%",
  },
  iconContainer: {
    marginRight: iconMargin,
    marginTop: iconMargin,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWithBorder: {
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
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
    flexDirection: "column", // Cambia 'colum' a 'column'
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
    width: iconSize,
    height: iconSize,
    borderRadius: 10,
  },
});
