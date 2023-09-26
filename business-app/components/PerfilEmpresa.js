import React from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Text,
    StyleSheet, 
    View,
    Dimensions,
    TextInput,
    ScrollView
} from 'react-native';
import { colores } from '../config/colores';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAddressCard, faImage } from '@fortawesome/free-solid-svg-icons';

const screenHeight = Dimensions.get('window').height;
const cabeceraMensajeHeight = 0.07 * screenHeight;
const cabeceraMensajePadding = 0.01 * screenHeight;
const cabeceraMensajeMargin = 0.03 * screenHeight;
const iconSize = 0.18 * screenHeight;
const iconMargin = 0.05 * screenHeight;

const PerfilEmpresa = ({navigation}) => {
    return (
        
            <ContenedorPrincipal titulo="Perfil Empresa"
            navigation={navigation} 
            contenido={(
                <>  

                        <View style={styles.cabeceraMensaje}>
                            <Text style={styles.letraTitulo} >Empresa</Text>
                        </View>
                        <View style={styles.containerimg}>
                        <ScrollView horizontal={true}>
                        
                        <View style={styles.iconContainer}>
                            <FontAwesomeIcon icon={faImage} size={iconSize} style={styles.iconWithBorder}/>
                        </View>
                        <View style={styles.iconContainer}>
                            <FontAwesomeIcon icon={faImage} size={iconSize} style={styles.iconWithBorder}/>
                        </View>
                        <View style={styles.iconContainer}>
                            <FontAwesomeIcon icon={faImage} size={iconSize} style={styles.iconWithBorder}/>
                        </View>
                        <View style={styles.iconContainer}>
                            <FontAwesomeIcon icon={faImage} size={iconSize} style={styles.iconWithBorder}/>
                        </View>
                        </ScrollView>
                        
                        </View>
                                                              
                    <View style={styles.mensajeDetalle}>
                            <Text style={styles.letraInfo} >Detalles</Text>
                    </View>
                    <View style={styles.inputContainer}>
                                <Text style={styles.letra} >Ubicación: ________________________</Text>
                                <Text style={styles.letra} >Horario de atención: _______________</Text>
                                <Text style={styles.letra} >Sucursales: ________________________</Text>
                                <Text style={styles.letra} >__________ : ________________________</Text>
                                <Text style={styles.letra} >__________ : ________________________</Text>
                                <Text style={styles.letra} >__________ : ________________________</Text>
                                <Text style={styles.letra} >__________ : ________________________</Text>
                            </View>
                </>

            )}></ContenedorPrincipal>
        
    );
}

export default PerfilEmpresa

const styles = StyleSheet.create({
    containerimg: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '8%',
        marginBottom: '3%',
    },
    iconContainer: {
        marginRight: iconMargin, 
        marginTop: iconMargin,   
        justifyContent: 'center',
        alignItems: 'center',       
    },
    iconWithBorder: {
        borderWidth: 1, 
        borderColor: 'black', 
        padding: 5, 
    },

    letraInfo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra,
    },
    letraTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    },
    letra: {
        fontSize: 16,
        color: colores.letra,
    },
    cabeceraMensaje: {
        marginLeft: '10%',
    },
    inputContainer: {
        width: '80%',
        flexDirection: 'column', // Cambia 'colum' a 'column'
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        justifyContent: 'space-evenly',
        marginLeft: '15%',
        marginTop: '5%',
    },
    cabeceraMensaje: {
        backgroundColor: colores.fondoBarras,
        height: cabeceraMensajeHeight,
        padding: cabeceraMensajePadding,
        marginTop: cabeceraMensajeMargin,
        alignItems: 'center',
        alignContent: 'center',
    },
    mensajeDetalle:{
        marginLeft:'10%',
    },  
});


