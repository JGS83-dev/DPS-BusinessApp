import React, { useState, useEffect } from "react";
import ContenedorPrincipal from "./ContenedorPrincipal";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { colores } from "../config/colores";
import axiosInstance from "../config/axios-config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const screenHeight = Dimensions.get("window").height;
const cabeceraMensajeHeight = 0.07 * screenHeight;
const cabeceraMensajePadding = 0.01 * screenHeight;
const cabeceraMensajeMargin = 0.03 * screenHeight;
const iconSize = 0.1 * screenHeight;
const iconMargin = 0.02 * screenHeight;

const Categorias = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [mitadIzquierda, setMitadIzquierda] = useState(null);
  const [mitadDerecha, setMitadDerecha] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ObtenerCategorias = async () => {
      axiosInstance
        .get("/categorias/")
        .then(function (response) {
          setData(response.data.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    ObtenerCategorias();
  }, []);

  useEffect(() => {
    if (data !== null) {
      // console.log(data);
      let halfwayThrough = Math.floor(data.length / 2);
      setMitadDerecha(data.slice(0, halfwayThrough));
      setMitadIzquierda(data.slice(halfwayThrough, data.length));
    }
  }, [data]);

  useEffect(() => {
    if (mitadDerecha !== null && mitadIzquierda !== null) {
      setIsLoading(false);
    }
  }, [mitadDerecha, mitadIzquierda]);

  return (
    <ContenedorPrincipal
      titulo="Buscar"
      navigation={navigation}
      contenido={
        <>
          {isLoading ? (
            <Text style={styles.letra}>Cargando...</Text>
          ) : (
            <>
              <View style={styles.cabeceraMensaje}>
                <Text style={styles.letraTitulo}>Categorias</Text>
              </View>

              <View style={styles.contenedor}>
                <View style={styles.containerimg}>
                  <ScrollView vertical={true}>
                    {mitadIzquierda.map((categoria) => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("CategoriasEmpresas", {
                            idCategoria: categoria.id,
                            titulo: categoria.titulo,
                          });
                        }}
                      >
                        <View
                          style={styles.iconContainerIzq}
                          key={categoria.titulo}
                        >
                          <Text style={styles.letra}>
                            {categoria.descripcion}
                          </Text>

                          <MaterialCommunityIcons
                            name={categoria.icono}
                            size={iconSize}
                          />
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.containerimg}>
                  <ScrollView vertical={true}>
                    {mitadDerecha.map((categoria) => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("CategoriasEmpresas", {
                            idCategoria: categoria.id,
                            titulo: categoria.titulo,
                          });
                        }}
                      >
                        <View
                          style={styles.iconContainerDere}
                          key={categoria.titulo}
                        >
                          <Text style={styles.letra}>
                            {categoria.descripcion}
                          </Text>

                          <MaterialCommunityIcons
                            name={categoria.icono}
                            size={iconSize}
                          />
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </>
          )}
        </>
      }
    ></ContenedorPrincipal>
  );
};

export default Categorias;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  containerimg: {
    marginLeft: "8%",
    marginBottom: "3%",
  },
  iconContainerIzq: {
    margin: iconMargin,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colores.primario,
    width: "90%",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "black",
    padding: 5,
  },
  iconContainerDere: {
    margin: iconMargin,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colores.secundario,
    width: "90%",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "black",
    padding: 5,
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
