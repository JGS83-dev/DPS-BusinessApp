import React from 'react';
import Inicio from './components/Inicio';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
LogBox
} from 'react-native';
import CrearCuenta from './components/CrearCuenta';
import PerfilEmpresa from './components/PerfilEmpresa';

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PerfilEmpresa">
        <Stack.Screen options={{ headerShown: false }} name="Inicio" component={Inicio} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="CrearCuenta" component={CrearCuenta} />
        <Stack.Screen options={{ headerShown: false }} name="PerfilEmpresa" component={PerfilEmpresa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
