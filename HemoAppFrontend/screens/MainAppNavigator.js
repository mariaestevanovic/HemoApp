// MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import TelaHistoricoDoacoes from './TelaHistoricoDoacoes';
import TelaAgendaDoacao from './TelaAgendaDoacao';
import CarteirinhaDigital from './CarteirinhaDigital';
import TelaPerfil from './TelaPerfil';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Historico') iconName = 'list-alt';
          else if (route.name === 'Cadastrar') iconName = 'calendar';
          else if (route.name === 'Carteirinha') iconName = 'id-card';
          else if (route.name === 'Perfil') iconName = 'user';

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          height: 70, // Adjusted height for more spacing
          paddingBottom: 10, // Extra padding at the bottom
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          headerTitle: 'Home', 
          headerShown: true,
          fontSize: 20, 
          fontWeight: 'bold', 
        }} 
      />
      <Tab.Screen 
        name="Historico" 
        component={TelaHistoricoDoacoes} 
        options={{ 
          headerTitle: 'Histórico registrado', 
          headerShown: true,
          fontSize: 20, 
          fontWeight: 'bold', 
        }} 
      />
      <Tab.Screen 
        name="Cadastrar" 
        component={TelaAgendaDoacao} 
        options={{ 
          headerTitle: 'Cadastros', 
          headerShown: true,
          fontSize: 20, 
          fontWeight: 'bold', 
        }} 
      />
      <Tab.Screen 
        name="Carteirinha" 
        component={CarteirinhaDigital} 
        options={{ 
          headerTitle: 'Cartão Digital', 
          headerShown: true,
          fontSize: 20, 
          fontWeight: 'bold',  
        }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={TelaPerfil} 
        options={{ 
          headerTitle: 'Perfil', 
          headerShown: true 
        }} 
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
