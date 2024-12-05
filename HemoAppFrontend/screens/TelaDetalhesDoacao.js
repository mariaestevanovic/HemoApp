import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function DetalhesDoacao({ route, navigation }) {
  const { schedule, updateSchedule } = route.params;

  const [address, setAddress] = useState(schedule.address);
  const [time, setTime] = useState(schedule.time);
  const [date, setDate] = useState(schedule.date); // Adicionado o campo "Data"

  const handleSave = () => {
    updateSchedule(schedule.id, address, time, date);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Card</Text>
      <Text style={styles.label}>Endereço:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.label}>Horário:</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
      />
      <Text style={styles.label}>Data de Realização:</Text>
      <TextInputMask
        style={styles.input}
        placeholder="DD-MM-YYYY"
        value={date}
        onChangeText={setDate}
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY',
        }}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#E53935',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
