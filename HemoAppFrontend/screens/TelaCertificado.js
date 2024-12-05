import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../context/UserContext'; // Importando o contexto do usuário

export default function TelaCertificado({ route }) {
  const { user } = useContext(UserContext); // Pegando os dados do usuário do contexto
  const { address, date } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Certificado de Doação</Text>
        
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>{user.name || 'Nome Sobrenome'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Data de Nascimento</Text>
            <Text style={styles.value}>{user.birthDate || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Classificação Sanguínea</Text>
            <Text style={styles.value}>{user.bloodType || 'N/A'}</Text>
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
            <Text style={styles.label}>Data da Última Doação</Text>
            <Text style={styles.value}>{date}</Text>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E53935',
  },
  card: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
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
