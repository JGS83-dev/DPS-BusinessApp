import { colores } from "../config/colores"
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const screenHeight = Dimensions.get('window').height;
const iconSize = 0.09 * screenHeight;
const headerHeight = 0.08 * screenHeight;
const headerPadding = 0.02 * screenHeight;
const footerHeight = 0.07 * screenHeight;
const footerPadding = 0.05 * screenHeight;
// const screenWidth = Dimensions.get('window').width;
// console.log(screenWidth);
// console.log(screenHeight);

const ContenedorPrincipal = (props) => {

    const { titulo, contenido } = props;
    return (
        <>
            <SafeAreaView style={styles.Cabecera}>
                <Text style={styles.letra}>{titulo}</Text>
            </SafeAreaView>

            <View style={styles.container}>
                <View style={styles.content}>
                    {contenido}
                </View>
                <View style={styles.footer}>
                    <FontAwesomeIcon icon={faHouse} size={iconSize} />
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={iconSize} />
                    <FontAwesomeIcon icon={faUser} size={iconSize} />
                </View>
            </View>
        </>
    )

}

export default ContenedorPrincipal

const styles = StyleSheet.create({
    Cabecera: {
        backgroundColor: colores.fondoBarras,
        height: headerHeight,
        alignItems: 'center',
        alignContent: 'center',
        padding: headerPadding
    },
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    },
    footer: {
        backgroundColor: colores.fondoBarras,
        height: footerHeight,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: footerPadding,
        color: colores.letra
    },
    container: {
        flex: 1,
        backgroundColor: colores.fondo,
    },
    content: {
        flex: 1
    },
});
