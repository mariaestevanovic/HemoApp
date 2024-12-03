// App.js
import React from 'react';
import { UserProvider } from './context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import HomeScreen from './screens/HomeScreen';
import InstructionScreen from './screens/InstructionScreen';
import CarteirinhaDigital from './screens/CarteirinhaDigital';
import TelaAgendaDoacao from './screens/TelaAgendaDoacao';
import TelaHistoricoDoacoes from './screens/TelaHistoricoDoacoes';
import MainTabNavigator from './screens/MainAppNavigator';
import UserFormScreen from './screens/UserFormScreen';
import TelaInicial from './screens/TelaInicial';

const Stack = createNativeStackNavigator();
const apiBaseUrl = "http://localhost:5000/api";

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicial">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={CadastroScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Instruction"
            component={InstructionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Carteirinha"
            component={CarteirinhaDigital}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Agenda"
            component={TelaAgendaDoacao}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Historico"
            component={TelaHistoricoDoacoes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Editar"
            component={UserFormScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Inicial"
            component={TelaInicial}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;