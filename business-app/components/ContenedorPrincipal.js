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
const iconSize = 0.08 * screenHeight;
// const screenWidth = Dimensions.get('window').width;
// console.log(screenWidth);
// console.log(screenHeight);

export function ContenedorPrincipal(props) {

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

const styles = StyleSheet.create({
    Cabecera: {
        backgroundColor: colores.fondoBarras,
        height: 65,
        alignItems: 'center',
        alignContent: 'center',
        padding: 15
    },
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    },
    footer: {
        backgroundColor: colores.fondoBarras,
        height: 65,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        color: colores.letra
    },
    container: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    content: {
        backgroundColor: colores.fondo,
        flex: 1
    },
});
