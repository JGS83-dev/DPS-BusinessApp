import React from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import ContenedorPrincipal from './ContenedorPrincipal';
import { colores } from '../config/colores';

const Login = () => {
    return (
        <>
            <ContenedorPrincipal titulo="Iniciar Sesión" contenido={(
                <Text style={styles.letra}>Contenido Inicio de sesión</Text>
            )}></ContenedorPrincipal>
        </>
    );
}

export default Login

const styles = StyleSheet.create({
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    }
});