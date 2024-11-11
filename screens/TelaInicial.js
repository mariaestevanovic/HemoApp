import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function TelaInicial({ navigation }) {
  setTimeout(() => {
    navigation.navigate('Login');
  }, 2000);

  return (
    <View style={styles.container}>
      <Image
      source={require('../assets/img/AppIcon-removebg-preview.png')}
      style={styles.logo}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 48,
    color: '#fff',
  },
});