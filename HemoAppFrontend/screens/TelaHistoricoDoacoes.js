// TelaHistoricoDoacoes.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TelaHistoricoDoacoes() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.donationItem}>
          <Text style={styles.date}>10 de setembro de 2024</Text>
          <Text style={styles.location}>Av. Mal. Campos, 1468 - Maruípe, Vitória - ES</Text>
          <Text style={styles.certificate}>Ver certificado</Text>
        </View>
        {/* Repita para outras doações */}
      </ScrollView>
      <Text style={styles.nextDonationText}>Próxima data de doação sugerida:</Text>
      <Text style={styles.nextDonationDate}>10/11/2024</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  donationItem: { marginTop: 20, marginBottom: 20 },
  date: { fontSize: 16, fontWeight: 'bold' },
  location: { fontSize: 14, color: 'grey' },
  certificate: { color: 'red' },
  nextDonationText: { fontSize: 16, marginTop: 20, color: 'grey' },
  nextDonationDate: { fontSize: 16, fontWeight: 'bold' },
});