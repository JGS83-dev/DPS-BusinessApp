import React from 'react';
import Inicio from './components/Inicio';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen options={{ headerShown: false }} name="Inicio" component={Inicio} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
