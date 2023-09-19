import React from 'react';
import { ContenedorPrincipal } from './components/ContenedorPrincipal';
import {
  Text,
  StyleSheet
} from 'react-native';
import { colores } from './config/colores';

export default function App() {
  return (
    <>
      <ContenedorPrincipal titulo="BIENVENIDO" contenido={(
        <Text style={styles.letra}>Aqui se debe agregar contenido..</Text>
      )}></ContenedorPrincipal>
    </>
  );
}

const styles = StyleSheet.create({
  letra: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.letra
  }
});