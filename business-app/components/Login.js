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
import { app } from '../config/firebase/FirebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAddressCard, faImage } from '@fortawesome/free-solid-svg-icons';
import {
    getAuth,
    createUserWithEmailAndPassword,
    getReactNativePersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const provider = new GoogleAuthProvider();

const screenHeight = Dimensions.get('window').height;
const cabeceraMensajeHeight = 0.07 * screenHeight;
const cabeceraMensajePadding = 0.01 * screenHeight;
const cabeceraMensajeMargin = 0.03 * screenHeight;
const iconSize = 0.2 * screenHeight;
const iconMargin = 0.01 * screenHeight;

function Login({ navigation }) {
    const auth = getAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // navigation.navigate("Inicio")
                signOut(auth).then(() => {
                    console.log('Cierre de sesión exitoso')
                }).catch((error) => {
                    console.log('Error al cerrar sesión')
                });
            }
        })

        return unsubscribe
    }, [])

    const handleProvider = () => {
        console.log('Iniciando sesion con Google');
        signInWithPopup(auth, provider)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log('Sesión iniciada con Google:', user.email);
                console.log('Token generado con Google:', token);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log('Credenciales del fallo:', credential);
            });
    }

    const handleSignUp = () => {
        console.log('Creando Cuenta');
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Cuenta creada con:', user.email);
            })
            .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        console.log('Iniciando sesion');
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Sesion iniciada:', user.email);
                navigation.navigate("Inicio")
            })
            .catch(error => alert(error.message))
    }

    return (
        <>
            <ContenedorPrincipal titulo="Iniciar Sesión"
                navigation={navigation}
                contenido={(
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
                                    style={[styles.button]}
                                >
                                    <Text style={styles.buttonText}>Crear Cuenta</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleProvider}>
                                <FontAwesomeIcon icon={faAddressCard} size={iconSize*0.40} />
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
        marginTop: iconMargin,
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
        marginBottom: 10
    },
    buttonText: {
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