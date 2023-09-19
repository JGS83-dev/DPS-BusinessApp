import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import ContenedorPrincipal from './ContenedorPrincipal';
import { colores } from '../config/colores';
import { auth } from '../config/firebase/FirebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';

const screenHeight = Dimensions.get('window').height;
const cabeceraMensajeHeight = 0.07 * screenHeight;
const cabeceraMensajePadding = 0.01 * screenHeight;
const cabeceraMensajeMargin = 0.03 * screenHeight;
const iconSize = 0.2 * screenHeight;
const iconMargin = 0.01 * screenHeight;

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Inicio")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Sesion iniciada:', user.email);
            })
            .catch(error => alert(error.message))
    }

    return (
        <>
            <ContenedorPrincipal titulo="Iniciar Sesión" contenido={(
                <>
                    <View style={styles.cabeceraMensaje}>
                        <Text style={styles.letraTitulo} >Complete los campos</Text>
                    </View>
                    <View style={styles.imgContainer}>
                        <FontAwesomeIcon icon={faImage} size={iconSize} />
                    </View>

                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior="height"
                    >
                        <View style={styles.containerIzquierdo}>
                            <Text style={styles.letraTitulo} >Ingrese sus credenciales</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.letra} >Correo:</Text>
                            <TextInput
                                placeholder="Correo"
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={styles.input}
                            />

                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.letra} >Contraseña:</Text>
                            <TextInput
                                placeholder="Contraseña"
                                value={password}
                                onChangeText={text => setPassword(text)}
                                style={styles.input}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={handleLogin}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Iniciar Sesión</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSignUp}
                                style={[styles.button, styles.buttonOutline]}
                            >
                                <Text style={styles.buttonOutlineText}>Crear Cuenta</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>


                </>

            )}></ContenedorPrincipal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        marginTop:iconMargin,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerIzquierdo: {
        justifyContent: 'flex-start',
        padding: 5
    },
    inputContainer: {
        width: '80%',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        justifyContent: 'space-evenly',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: colores.fondoBarras,
        width: '100%',
        padding: 5,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: colores.fondoBarras,
        marginTop: 0.01 * screenHeight,
    },
    buttonText: {
        color: colores.letra,
        fontSize: 16,
    },
    buttonOutlineText: {
        color: colores.letra,
        fontSize: 16,
    },
    letraTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    },
    letra: {
        fontSize: 16,
        color: colores.letra
    },
    cabeceraMensaje: {
        backgroundColor: colores.fondoBarras,
        height: cabeceraMensajeHeight,
        padding: cabeceraMensajePadding,
        marginTop: cabeceraMensajeMargin,
        alignItems: 'center',
        alignContent: 'center',
    },
})

export default Login