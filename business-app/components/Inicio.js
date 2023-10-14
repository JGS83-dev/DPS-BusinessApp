import React from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
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
const tituloSize = 0.035 * screenHeight;

const Inicio = ({ navigation }) => {
    const IrANoticias = () => {
        navigation.navigate("VerNoticias");
    }

    const IrAPerfilEmpresa = () => {
        navigation.navigate("PerfilEmpresa")
    }

    const IrALogin = () => {
        navigation.navigate("Login");
    }

    const IrACrearCuenta = () => {
        navigation.navigate("CrearCuenta")
    }

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

                                <View style={styles.contenedorNoticia}>
                                    <View style={styles.verticalInfo}>
                                        <Text style={styles.tituloNoticia}>Titulo Noticia</Text>
                                        <Text style={styles.contenidoNoticia}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at massa quis ante congue egestas.</Text>
                                    </View>
                                    <View style={styles.verticalInfo}>
                                        <FontAwesomeIcon icon={faImage} size={iconSize} />
                                        <TouchableOpacity style={styles.button} onPress={IrANoticias}>
                                            <Text style={styles.masInfo} >Más info.</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </ScrollView>

                        </View>

                        <View>
                            <Text style={styles.cabeceraDescubre}>Descubre Cerca de</Text>

                            <Text style={styles.nombreEmpresa}>Empresa #1</Text>
                            <View style={styles.flex}>
                                <View style={styles.contenedorImgEmpresa}>
                                    <TouchableOpacity onPress={IrAPerfilEmpresa}>
                                        <FontAwesomeIcon icon={faImage} size={iconEmpresaImg} style={styles.imagenEmpresa} />
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={IrACrearCuenta}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>CrearCuenta</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={IrALogin}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Iniciar Sesión</Text>
                            </TouchableOpacity>
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
    tituloNoticia: {
        color: colores.letra,
        fontWeight: 'bold',
        fontSize: tituloSize,
    },
    contenedorNoticia: {
        flex: 1,
        backgroundColor: colores.fondoBarras,
        padding: 10,
        margin: 10,
        borderRadius: 15,
        borderColor: '#000000',
        flexDirection: 'row',
    },
    contenidoNoticia: {
        color: colores.letra,
        textAlign: 'justify'
    },
    masInfo: {
        color: colores.letra,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        textAlign: 'right'
    },
    verticalInfo: {
        display: 'flex',
        flexDirection: 'column',
        padding: 5,
        width: '15%'
    },
    buttonContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        marginBottom: 15
    },
    button: {
        backgroundColor: colores.fondoBarras,
        padding: 5,
        alignItems: 'center',

    },
    buttonText: {
        color: colores.letra,
        fontSize: 16,
    },
});

