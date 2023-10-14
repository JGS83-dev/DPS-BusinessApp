import React from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { colores } from '../config/colores';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const iconSize = 0.5 * screenWidth;
const iconEmpresaImg = 0.35 * screenWidth;
const iconMargin = 0.05 * screenHeight;

const Inicio = ({ navigation }) => {
    return (

        <ContenedorPrincipal titulo="BIENVENIDO"
            navigation={navigation}
            contenido={(
                <>
                    <ScrollView vertical={true}>

                        <View style={styles.cabeceraMensaje}>
                            <Text style={styles.letraTitulo} >Novedades</Text>
                        </View>

                        <View style={styles.containerimg}>

                            <ScrollView horizontal={true}>

                                <View style={styles.iconContainer}>
                                    <FontAwesomeIcon icon={faImage} size={iconSize} />
                                </View>

                            </ScrollView>

                        </View>

                        <View>
                            <Text style={styles.cabeceraDescubre}>Descubre Cerca de</Text>

                            <Text style={styles.nombreEmpresa}>Empresa #1</Text>
                            <View style={styles.flex}>
                                <View style={styles.contenedorImgEmpresa}>
                                    <FontAwesomeIcon icon={faImage} size={iconEmpresaImg} style={styles.imagenEmpresa} />
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                </>
            )}></ContenedorPrincipal>

    );
}

export default Inicio


const styles = StyleSheet.create({
    nombreEmpresa: {
        color: colores.letra,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    },
    letraTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
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
        fontWeight: 'bold',
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
        fontWeight: 'bold',
        textAlign: 'center',
    },
    flex: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    iconContainer: {
        marginRight: iconMargin, 
        marginTop: iconMargin,   
        justifyContent: 'center',
        alignItems: 'center',       
    },
});

