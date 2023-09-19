import { colores } from "../config/colores"
import {
    SafeAreaView,
    StyleSheet,
    Text,
} from 'react-native';

export function Cabecera(props) {
    const { titulo } = props;
    return (
        <>
            <SafeAreaView style={styles.Cabecera}>
                <Text style={styles.letra}>{titulo}</Text>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    Cabecera: {
        backgroundColor: colores.fondo,
        height: 50,
        alignItems: 'center',
        alignContent: 'center'
    },
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    },
});