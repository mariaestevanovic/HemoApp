import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Share } from 'react-native';
import { UserContext } from '../context/UserContext';

export default function CarteirinhaDigital() {
  
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImageText}>👤</Text>
            </View>
            <Text style={styles.name}>{user.name || 'Nome Sobrenome'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Data da Última Doação</Text>
            <Text style={styles.value}>{user.lastDonationDate || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Classificação Sanguínea</Text>
            <Text style={styles.value}>{user.bloodType || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Data de Nascimento</Text>
            <Text style={styles.value}>{user.birthDate || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Sexo</Text>
            <Text style={styles.value}>{user.gender || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Peso</Text>
            <Text style={styles.value}>{user.weight || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>RG</Text>
            <Text style={styles.value}>{user.rg || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>CPF</Text>
            <Text style={styles.value}>{user.cpf || 'N/A'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  cardContainer: {
    transform: [{ rotate: '90deg' }],
    alignSelf: 'center',
  },
  card: {
    left: 90,
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: 530,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileImageText: {
    fontSize: 24,
    color: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#777',
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
});