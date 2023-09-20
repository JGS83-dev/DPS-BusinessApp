import React from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Text,
    StyleSheet
} from 'react-native';
import { colores } from '../config/colores';

const CrearCuenta = ({ navigation }) => {
    return (

        <ContenedorPrincipal titulo="Crear Cuenta"
            navigation={navigation}
            contenido={(
                <>
                    <Text style={styles.letra}>Formulario para crear cuenta</Text>
                </>
            )}></ContenedorPrincipal>

    );
}

export default CrearCuenta

const styles = StyleSheet.create({
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    }
});

