import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { MaterialIcons } from '@expo/vector-icons';

export default function TelaAgendaDoacao({ navigation }) {
  const [schedules, setSchedules] = useState([

  ]);

  const [isAddMode, setIsAddMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDate, setNewDate] = useState('');

  const handleAddSchedule = () => {
    if (newAddress.trim() && newTime.trim() && newDate.trim()) {
      const newSchedule = {
        id: schedules.length + 1,
        address: newAddress,
        time: newTime,
        date: newDate,
      };
      setSchedules([...schedules, newSchedule]);
      setNewAddress('');
      setNewTime('');
      setNewDate('');
      setIsAddMode(false);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
    setIsDeleteMode(false);
  };

  const handleConcludeSchedule = (id) => {
    if (schedules.length === 0) {
      Alert.alert('Erro', 'Não há nenhum card para concluir.');
    } else {
      const completedSchedule = schedules.find((schedule) => schedule.id === id);
      if (completedSchedule) {
        navigation.navigate('Historico', {
          completedSchedule: completedSchedule,
        });
        setSchedules(schedules.filter((schedule) => schedule.id !== id));
      }
    }
  };

  const updateSchedule = (id, updatedAddress, updatedTime, updatedDate) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === id
          ? {
              ...schedule,
              address: updatedAddress,
              time: updatedTime,
              date: updatedDate,
            }
          : schedule
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {schedules.length < 1 ? (
            <TouchableOpacity onPress={() => setIsAddMode(true)}>
              <MaterialIcons name="add" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 24 }} />
          )}
          <TouchableOpacity onPress={() => setIsDeleteMode(true)}>
            <MaterialIcons name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {schedules.map((schedule) => (
          <View key={schedule.id} style={styles.scheduleItem}>
            <Text>{schedule.address}</Text>
            <Text>{schedule.time}</Text>
            <Text>Data: {schedule.date}</Text>
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() =>
                navigation.navigate('Detalhes', {
                  schedule,
                  updateSchedule,
                })
              }
            >
              <Text style={{ color: '#E53935' }}>Mais</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.concludeButton}
              onPress={() => handleConcludeSchedule(schedule.id)}
            >
              <Text style={styles.concludeButtonText}>Concluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {isAddMode && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Adicionar Novo Card</Text>
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={newAddress}
            onChangeText={setNewAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Horário"
            value={newTime}
            onChangeText={setNewTime}
          />
          <TextInputMask
            style={styles.input}
            placeholder="Data (DD-MM-YYYY)"
            value={newDate}
            onChangeText={setNewDate}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddSchedule}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsAddMode(false)}
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}

      {isDeleteMode && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Selecione um card para deletar:</Text>
          <ScrollView>
            {schedules.map((schedule) => (
              <View key={schedule.id} style={styles.scheduleItem}>
                <Text>{schedule.address}</Text>
                <Text>{schedule.time}</Text>
                <Text>Data: {schedule.date}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteSchedule(schedule.id)}
                >
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsDeleteMode(false)}
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#99999',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
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
    borderColor: '#ccc',
    borderWidth: 1,
  },
  moreButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: 'grey',
  },
  concludeButton: {
    backgroundColor: 'green',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  concludeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlayText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
  },
});
