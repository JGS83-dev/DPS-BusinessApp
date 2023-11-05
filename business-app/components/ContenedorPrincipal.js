import { colores } from "../config/colores";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RNRestart from "react-native-restart";

const screenHeight = Dimensions.get("window").height;
const iconSize = 0.08 * screenHeight;
const headerHeight = 0.08 * screenHeight;
const headerPadding = 0.02 * screenHeight;
const footerHeight = 0.09 * screenHeight;
const footerPadding = 0.01 * screenHeight;
// const screenWidth = Dimensions.get('window').width;
// console.log(screenWidth);
// console.log(screenHeight);

const ContenedorPrincipal = (props) => {
  const { titulo, contenido, navigation } = props;

  const IrAInicio = () => {
    RNRestart.restart();
    // navigation.navigate("Inicio");
  };

  const IrACategorias = () => {
    navigation.navigate("Categorias");
  };

  const IrAIniciarSesion = () => {
    navigation.navigate("Login");
  };
  return (
    <>
      <SafeAreaView style={styles.Cabecera}>
        <Text style={styles.letra}>{titulo}</Text>
      </SafeAreaView>

      <View style={styles.container}>
        <View style={styles.content}>{contenido}</View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={IrAInicio}>
            <MaterialCommunityIcons name="home" size={iconSize} />
          </TouchableOpacity>
          <TouchableOpacity onPress={IrACategorias}>
            <MaterialCommunityIcons name="magnify" size={iconSize} />
          </TouchableOpacity>
          <TouchableOpacity onPress={IrAIniciarSesion}>
            <MaterialCommunityIcons name="account" size={iconSize} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ContenedorPrincipal;

const styles = StyleSheet.create({
  Cabecera: {
    backgroundColor: colores.fondoBarras,
    height: headerHeight,
    alignItems: "center",
    alignContent: "center",
    padding: headerPadding,
  },
  letra: {
    fontSize: 20,
    fontWeight: "bold",
    color: colores.letra,
  },
  footer: {
    backgroundColor: colores.fondoBarras,
    height: footerHeight,
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: footerPadding,
    color: colores.letra,
  },
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  content: {
    flex: 1,
  },
});
