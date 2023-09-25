import React from 'react';
import Inicio from './components/Inicio';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
LogBox
} from 'react-native';
import CrearCuenta from './components/CrearCuenta';

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen options={{ headerShown: false }} name="Inicio" component={Inicio} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="CrearCuenta" component={CrearCuenta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
