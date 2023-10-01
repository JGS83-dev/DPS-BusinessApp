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
const iconSize = 0.9 * screenWidth;
const iconSizeAuthor = 0.35 * screenWidth;
const widthTextAuthor = 0.5 * screenWidth;

const VerNoticias = ({navigation}) => {
    return (
        
            <ContenedorPrincipal titulo="Ver Noticias"
            navigation={navigation} 
            contenido={(
                <>
                    <ScrollView vertical={true}>

                        <View style={styles.cabeceraMensaje}>
                            <Text style={styles.letraTitulo} >Título Noticia</Text>
                        </View>

                        <View style={styles.containerimg}>

                            <ScrollView horizontal={true}>

                                <View style={styles.iconContainer}>
                                    <FontAwesomeIcon icon={faImage} size={iconSize}/>
                                </View>

                                <View style={styles.iconContainer}>
                                    <FontAwesomeIcon icon={faImage} size={iconSize}/>
                                </View>

                                <View style={styles.iconContainer}>
                                    <FontAwesomeIcon icon={faImage} size={iconSize}/>
                                </View>

                                <View style={styles.iconContainer}>
                                    <FontAwesomeIcon icon={faImage} size={iconSize}/>
                                </View>

                            </ScrollView>

                        </View>                                            
                        

                        <View style={styles.mensajeDetalle}>
                            <Text style={styles.letraDescription} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at massa quis ante congue egestas. Nunc vitae bibendum tellus. Morbi rhoncus nibh eget sem ullamcorper pulvinar. Vestibulum volutpat pellentesque libero, in cursus odio.</Text>
                        </View>

                        <View>
                            <Text style={styles.cabeceraMensajeAutor} >Autor</Text>
                            
                            <Text style={styles.companyName}>Empresa #1</Text>
                            
                            <View style={styles.flex}>
                                <View style={styles.iconContainerAuthor}>
                                    <FontAwesomeIcon icon={faImage} size={iconSizeAuthor} style={styles.imagenAuthor}/>
                                </View>
                                <Text style={styles.letraDescriptionAuthor} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at massa quis ante congue egestas.</Text>
                            </View>
                        </View>
                    </ScrollView>
                </>
            )}></ContenedorPrincipal>
        
    );
}

export default VerNoticias

const styles = StyleSheet.create({
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    },
    letraDescription: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colores.letra,
        textAlign: 'justify',
    },
    letraDescriptionAuthor: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colores.letra,
        textAlign: 'justify',    
        width: widthTextAuthor,  
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
    cabeceraMensajeAutor: {
        backgroundColor: colores.fondoBarras,
        color: colores.letra,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 40,
        padding: 10,
    },
    iconContainerAuthor: {
        padding: 10,
    },
    iconWithBorder: {
        borderWidth: 1, 
        borderColor: 'red', 
        padding: 5, 
    },
    mensajeDetalle:{
        paddingLeft: 20,
        paddingRight: 20,
    }, 
    companyName: {
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
});

