// TelaAgendaDoacao.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TelaAgendaDoacao() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <MaterialIcons name="add" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.scheduleItem}>
          <Text>Av. Mal. Campos, 1468 - Maruípe, Vitória - ES</Text>
          <Text>Sábado, 6:00 - 7:30</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Text>Mais</Text>
          </TouchableOpacity>
        </View>
        {/* Repita para outros cadastros */}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  scheduleItem: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
  },
  moreButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: 'grey',
  },
});
