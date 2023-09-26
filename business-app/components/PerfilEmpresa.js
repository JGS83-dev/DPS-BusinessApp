import React from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Text,
    StyleSheet
} from 'react-native';
import { colores } from '../config/colores';

const PerfilEmpresa = ({navigation}) => {
    return (
        
            <ContenedorPrincipal titulo="Perfil Empresa"
            navigation={navigation} 
            contenido={(


                <Text style={styles.letra}>Contenido perfil empresa.</Text>

                
            )}></ContenedorPrincipal>
        
    );
}

export default PerfilEmpresa

const styles = StyleSheet.create({
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    }
});

