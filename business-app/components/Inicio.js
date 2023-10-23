import React, { useEffect, useState } from "react";
import ContenedorPrincipal from "./ContenedorPrincipal";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { colores } from "../config/colores";
import axiosInstance from "../config/axios-config";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const iconSize = 0.5 * screenWidth;
const iconMargin = 0.05 * screenHeight;
const tituloSize = 0.035 * screenHeight;

const Inicio = ({ navigation }) => {
  const IrALogin = () => {
    navigation.navigate("Login");
  };

  const IrACrearCuenta = () => {
    navigation.navigate("CrearCuenta");
  };

  const [eventos, setEventos] = useState(null);
  const [empresas, setEmpresas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerEventos = async () => {
      axiosInstance
        .get("/eventos")
        .then(function (response) {
          // handle success
          // console.log(response.data);
          setEventos(response.data.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    obtenerEventos();
  }, []);

  useEffect(() => {
    const obtenerEmpresas = async () => {
      axiosInstance
        .get("/empresas")
        .then(function (response) {
          // handle success
          // console.log(response.data);
          setEmpresas(response.data.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    obtenerEmpresas();
  }, []);

  useEffect(() => {
    if (eventos !== null && empresas !== null) {
      // console.log('Eventos:',eventos);
      // console.log("Empresas:", empresas);
      setIsLoading(false);
    }
  }, [eventos, empresas]);

  return (
    <ContenedorPrincipal
      titulo="BIENVENIDO"
      navigation={navigation}
      contenido={
        <>
          <ScrollView vertical={true}>
            <View style={styles.cabeceraMensaje}>
              <Text style={styles.letraTitulo}>Novedades</Text>
            </View>

            <View style={styles.containerimg}>
              {isLoading ? (
                <Text>Cargando...</Text>
              ) : (
                <ScrollView horizontal={true}>
                  {eventos.map((item) => (
                    // Contenedor Padre
                    <View style={styles.contenedorNoticia} key={item.id}>
                      {/* Contenedor Izquierda */}
                      <View style={styles.verticalInfo}>
                        <Text style={styles.tituloNoticia}>{item.titulo}</Text>
                        <Text style={styles.contenidoNoticia}>
                          {item.descripcion.resumen}
                        </Text>
                      </View>
                      {/* Contenedor Derecho */}
                      <View style={styles.verticalInfoDerecha}>
                        <Image
                          source={{ uri: `${item.imagenes.principal}` }}
                          style={styles.cardImage}
                        />
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => {
                            navigation.navigate("VerNoticias", {
                              idEvento: item.id,
                            });
                          }}
                        >
                          <Text style={styles.masInfo}>Más info.</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>

            <View>
              <Text style={styles.cabeceraDescubre}>Descubre Cerca de ti</Text>

              {isLoading ? (
                <Text>Cargando...</Text>
              ) : (
                <ScrollView horizontal={true}>
                  {empresas.map((item) => (
                    <View style={styles.flex} key={item.id}>
                      <Text style={styles.nombreEmpresa}>{item.nombre}</Text>
                      <View style={styles.contenedorImgEmpresa}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("PerfilEmpresa", {
                              idEmpresa: item.id,
                            });
                          }}
                        >
                          <Image
                            source={{ uri: `${item.imagen.logo.stringValue}` }}
                            style={styles.cardImage}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={IrACrearCuenta} style={styles.button}>
                <Text style={styles.buttonText}>CrearCuenta</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={IrALogin} style={styles.button}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      }
    ></ContenedorPrincipal>
  );
};

export default Inicio;

const styles = StyleSheet.create({
  nombreEmpresa: {
    color: colores.letra,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  letra: {
    fontSize: 20,
    fontWeight: "bold",
    color: colores.letra,
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
  cabeceraDescubre: {
    backgroundColor: colores.fondoBarras,
    color: colores.letra,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 40,
    padding: 10,
  },
  contenedorImgEmpresa: {
    padding: 10,
  },
  contenedorImgEmpresa: {
    color: colores.letra,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  flex: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    width: iconSize * 1.25,
  },
  tituloNoticia: {
    color: colores.letra,
    fontWeight: "bold",
    fontSize: tituloSize,
  },
  contenedorNoticia: {
    flex: 1,
    backgroundColor: colores.fondoBarras,
    padding: 10,
    margin: 10,
    borderRadius: 15,
    borderColor: "#000000",
    flexDirection: "row",
    width: iconSize * 1.75,
  },
  contenidoNoticia: {
    color: colores.letra,
    textAlign: "justify",
  },
  masInfo: {
    color: colores.letra,
    textDecorationLine: "underline",
    fontWeight: "bold",
    textAlign: "right",
  },
  verticalInfo: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    width: "50%",
  },
  verticalInfoDerecha: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    width: "30%",
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    marginBottom: 15,
  },
  button: {
    backgroundColor: colores.fondoBarras,
    padding: 5,
    alignItems: "center",
  },
  buttonText: {
    color: colores.letra,
    fontSize: 16,
  },
  cardImage: {
    width: iconSize * 0.75,
    height: iconSize * 0.75,
    borderRadius: 10,
  },
});
