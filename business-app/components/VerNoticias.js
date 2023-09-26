import React from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Text,
    StyleSheet
} from 'react-native';
import { colores } from '../config/colores';

const VerNoticias = ({navigation}) => {
    return (
        
            <ContenedorPrincipal titulo="Ver Noticias"
            navigation={navigation} 
            contenido={(
                <Text style={styles.letra}>Aqui se debe agregar contenido..</Text>
            )}></ContenedorPrincipal>
        
    );
}

export default VerNoticias

const styles = StyleSheet.create({
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    }
});

