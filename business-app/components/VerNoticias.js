import React, { useState, useEffect } from "react";
import ContenedorPrincipal from "./ContenedorPrincipal";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { colores } from "../config/colores";
import axiosInstance from "../config/axios-config";

const screenWidth = Dimensions.get("window").width;
const iconSize = 0.9 * screenWidth;
const widthTextAuthor = 0.5 * screenWidth;

const VerNoticias = ({ route, navigation }) => {
  const { idEvento } = route.params;
  const [evento, setEvento] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerInfoEvento = async () => {
      axiosInstance
        .post("/eventos/info", {
          id: idEvento,
        })
        .then(function (response) {
          setEvento(response.data.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    obtenerInfoEvento();
  }, []);

  useEffect(() => {
    if (evento !== null) {
      // console.log("Evento:", evento);
      //   setIsLoading(false);

      const obtenerInfoEmpresa = async () => {
        axiosInstance
          .post("/empresas/info", {
            id: evento.autor,
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
    }
  }, [evento]);

  useEffect(() => {
    if (empresa !== null) {
      //   console.log("Empresa:", empresa);
      setIsLoading(false);
    }
  }, [empresa]);

  return (
    <ContenedorPrincipal
      titulo="Ver Noticias"
      navigation={navigation}
      contenido={
        <>
          {isLoading ? (
            <Text style={styles.letra}>Cargando...</Text>
          ) : (
            <ScrollView vertical={true}>
              <View style={styles.cabeceraMensaje}>
                <Text style={styles.letraTitulo}>{evento.titulo}</Text>
              </View>

              <View style={styles.containerimg}>
                <ScrollView horizontal={true}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={{ uri: `${evento.imagenes.principal}` }}
                      style={styles.cardImage}
                    />
                  </View>
                  {evento.imagenes.otras.map((img) => (
                    <View style={styles.iconContainer}>
                      <Image
                        source={{ uri: `${img.stringValue}` }}
                        style={styles.cardImage}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.mensajeDetalle}>
                <Text style={styles.letraDescription}>
                  {evento.descripcion.completa}
                </Text>
              </View>

              <View>
                <Text style={styles.cabeceraMensajeAutor}>Autor</Text>

                <Text style={styles.companyName}>{empresa.nombre}</Text>

                <View style={styles.flex}>
                  <View style={styles.iconContainerAuthor}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("PerfilEmpresa", {
                          idEmpresa: evento.autor,
                        });
                      }}
                    >
                      <Image
                        source={{ uri: `${empresa.imagen.logo.stringValue}` }}
                        style={styles.cardImage}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.letraDescriptionAuthor}>
                    {empresa.descripcion}
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
        </>
      }
    ></ContenedorPrincipal>
  );
};

export default VerNoticias;

const styles = StyleSheet.create({
  letra: {
    fontSize: 20,
    fontWeight: "bold",
    color: colores.letra,
  },
  letraDescription: {
    fontSize: 16,
    fontWeight: "bold",
    color: colores.letra,
    textAlign: "justify",
  },
  letraDescriptionAuthor: {
    fontSize: 16,
    fontWeight: "bold",
    color: colores.letra,
    textAlign: "justify",
    width: widthTextAuthor,
  },
  letraTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colores.letra,
  },
  cabeceraMensaje: {
    backgroundColor: colores.fondoBarras,
    marginTop: 10,
    padding: 10,
  },
  cabeceraMensajeAutor: {
    backgroundColor: colores.fondoBarras,
    color: colores.letra,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 40,
    padding: 10,
  },
  iconContainerAuthor: {
    padding: 10,
  },
  iconWithBorder: {
    borderWidth: 1,
    borderColor: "red",
    padding: 5,
  },
  mensajeDetalle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  companyName: {
    color: colores.letra,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  flex: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  cardImage: {
    width: iconSize * 0.5,
    height: iconSize * 0.4,
    borderRadius: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
