import React, { useState, useEffect } from "react";
import ContenedorPrincipal from "./ContenedorPrincipal";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { colores } from "../config/colores";
import axiosInstance from "../config/axios-config";

const screenHeight = Dimensions.get("window").height;
const cabeceraMensajeHeight = 0.07 * screenHeight;
const cabeceraMensajePadding = 0.01 * screenHeight;
const cabeceraMensajeMargin = 0.03 * screenHeight;
const iconSize = 0.1 * screenHeight;
const iconMargin = 0.02 * screenHeight;

const CategoriasEmpresas = ({ route,navigation }) => {
  const { idCategoria,titulo } = route.params;
  const [data, setData] = useState(null);
  const [mitadIzquierda, setMitadIzquierda] = useState(null);
  const [mitadDerecha, setMitadDerecha] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ObtenerCategoriasEmpresas = async () => {
      axiosInstance
      .get("/empresas")
        .then(function (response) {
          setData(response.data.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    ObtenerCategoriasEmpresas();
  }, []);

  useEffect(() => {
    if (data !== null) {
      
      let halfwayThrough = Math.floor(data.length / 2);
      setMitadDerecha(data.slice(0, halfwayThrough));
      setMitadIzquierda(data.slice(halfwayThrough, data.length));
    }
  }, [data]);

  useEffect(() => {
    if (mitadDerecha !== null && mitadIzquierda !== null) {
      // console.log('Derecha:',mitadDerecha);
      // console.log('Izquierda:',mitadIzquierda);
      setIsLoading(false);
    }
  }, [mitadDerecha, mitadIzquierda]);

  return (
    <ContenedorPrincipal
      titulo={`Buscar en Categoria: ${titulo}`}
      navigation={navigation}
      contenido={
        <>
          {isLoading ? (
            <Text style={styles.letra}>Cargando...</Text>
          ) : (
            <>
              <View style={styles.cabeceraMensaje}>
                <Text style={styles.letraTitulo}> </Text>
              </View>

              <View style={styles.contenedor}>
                <View style={styles.containerimg} key="izquierda">
                  <ScrollView vertical={true}>
                  {mitadIzquierda.map((item) => (
                      <TouchableOpacity>
                        <View
                          style={styles.iconContainerIzq}
                          key={item.id}
                        >
                          <Text style={styles.letra}>
                            {item.nombre}
                          </Text>

                          <Image
                          source={{ uri: `${item.imagen.logo.stringValue}` }}
                          style={styles.cardImage}
                        />
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.containerimg} key="derecha">
                  <ScrollView vertical={true}>
                    {mitadDerecha.map((item) => (
                      <TouchableOpacity>
                        <View
                          style={styles.iconContainerDere}
                          key={item.id}
                        >
                          <Text style={styles.letra}>
                            {item.nombre}
                          </Text>

                          <Image
                          source={{ uri: `${item.imagen.logo.stringValue}` }}
                          style={styles.cardImage}
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

export default CategoriasEmpresas;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'flex-start'
  },
  containerimg: {
    marginBottom: "3%",
  },
  iconContainerIzq: {
    margin: iconMargin,
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    padding: 5,
  },
  iconContainerDere: {
    margin: iconMargin,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
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
    marginBottom:10,
    fontWeight:'bold',
  },
  cabeceraMensaje: {
    backgroundColor: colores.fondoBarras,
    height: cabeceraMensajeHeight,
    padding: cabeceraMensajePadding,
    marginTop: cabeceraMensajeMargin,
    alignItems: "center",
    alignContent: "center",
  },
  cardImage: {
    width: iconSize * 1.75,
    height: iconSize * 1.75,
  },
});
