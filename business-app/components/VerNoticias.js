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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../config/axios-config";

const screenWidth = Dimensions.get("window").width;
const iconSize = 0.9 * screenWidth;
const iconSizeAuthor = 0.35 * screenWidth;
const widthTextAuthor = 0.5 * screenWidth;

const VerNoticias = ({ route, navigation }) => {
  const { idEvento } = route.params;
  const [evento, setEvento] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const IrAPerfilEmpresa = () => {
    navigation.navigate("PerfilEmpresa");
  };

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
      //   console.log("Evento:", evento);
      setIsLoading(false);
    }
  }, [evento]);

  return (
    <ContenedorPrincipal
      titulo="Ver Noticias"
      navigation={navigation}
      contenido={
        <>
          {isLoading ? (
            <Text>Cargando...</Text>
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

                <Text style={styles.companyName}>Empresa #1</Text>

                <View style={styles.flex}>
                  <View style={styles.iconContainerAuthor}>
                    <TouchableOpacity onPress={IrAPerfilEmpresa}>
                      <FontAwesomeIcon
                        icon={faImage}
                        size={iconSizeAuthor}
                        style={styles.imagenAuthor}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.letraDescriptionAuthor}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis at massa quis ante congue egestas.
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
    margin:10,
  },
});
