import React from 'react';
import Inicio from './components/Inicio';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
LogBox
} from 'react-native';
import CrearCuenta from './components/CrearCuenta';
import VerNoticias from './components/VerNoticias';
import PerfilEmpresa from './components/PerfilEmpresa';
import PerfilUsuario from './components/PerfilUsuario';
import Categorias from './components/Categorias';
import CategoriasEmpresas from './components/CategoriasEmpresas';

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen options={{ headerShown: false }} name="Inicio" component={Inicio} />
        <Stack.Screen options={{ headerShown: false }} name="Categorias" component={Categorias} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="CrearCuenta" component={CrearCuenta} />
        <Stack.Screen options={{ headerShown: false }} name="VerNoticias" component={VerNoticias} />
        <Stack.Screen options={{ headerShown: false }} name="PerfilEmpresa" component={PerfilEmpresa} />
        <Stack.Screen options={{ headerShown: false }} name="PerfilUsuario" component={PerfilUsuario} />
        <Stack.Screen options={{ headerShown: false }} name="CategoriasEmpresas" component={CategoriasEmpresas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
