import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { UserContext } from '../context/UserContext';
import MaskInput from 'react-native-mask-input';
import { TextInputMask } from 'react-native-masked-text';

export default function UserFormScreen({ navigation }) {
  const { user, updateUser } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [weight, setWeight] = useState('');
  const [bio, setBio] = useState('');
  const [rg, setRg] = useState('');  // RG Field
  const [cpf, setCpf] = useState('');  // CPF Field

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setLocation(user.location || '');
      setBloodType(user.bloodType || '');
      setBirthDate(user.birthDate || '');
      setWeight(user.weight || '');
      setBio(user.bio || '');
      setRg(user.rg || '');
      setCpf(user.cpf || '');
    }
  }, [user]);

  const handleSave = async () => {
    if (!bloodType || !birthDate || !weight) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const updatedUser = {
        phone,
        location,
        bloodType,
        birthDate,
        weight,
        bio,
        rg,  // Save RG
        cpf, // Save CPF
      };

      updateUser({ ...user, ...updatedUser });

      const response = await fetch(`https://67197a937fc4c5ff8f4d8f31.mockapi.io/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Informações salvas com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Falha ao salvar as alterações.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao comunicar com o servidor');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Cadastrar / Editar Perfil</Text>

        {/* Name Field (Non-editable) */}
        <TextInput
          style={[styles.input, styles.readOnlyInput]}
          placeholder="Nome Completo"
          value={name}
          editable={false}
        />

        {/* Email Field (Non-editable) */}
        <TextInput
          style={[styles.input, styles.readOnlyInput]}
          placeholder="Email"
          value={email}
          editable={false}
        />

        {/* Phone Field */}
        <TextInputMask
          style={styles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#888"
          type={'custom'}
          options={{
            mask: '(99) 99999-9999',
          }}
        />

        {/* Location Field */}
        <TextInput
          style={styles.input}
          placeholder="Localização (Cidade, Estado)"
          value={location}
          onChangeText={setLocation}
          placeholderTextColor="#888"
        />

        {/* RG Field */}
        <MaskInput
          style={styles.input}
          placeholder="RG *"
          value={rg}
          onChangeText={setRg}
          mask={[
            /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /[A-Za-z]/, /[A-Za-z]/,
          ]}
          placeholderTextColor="#888"
        />

        {/* CPF Field */}
        <MaskInput
          style={styles.input}
          placeholder="CPF *"
          value={cpf}
          onChangeText={setCpf}
          mask={[
            /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,
          ]}
          placeholderTextColor="#888"
        />

        {/* Blood Type Field */}
        <TextInput
          style={styles.input}
          placeholder="Tipo Sanguíneo *"
          value={bloodType}
          onChangeText={setBloodType}
          placeholderTextColor="#888"
        />

        {/* Birth Date Field */}
        <TextInputMask
          style={styles.input}
          placeholder="Data de Nascimento *"
          value={birthDate}
          onChangeText={setBirthDate}
          placeholderTextColor="#888"
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
        />

        {/* Weight Field */}
        <TextInput
          style={styles.input}
          placeholder="Peso *"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        {/* Biography Field */}
        <TextInput
          style={[styles.input, styles.bioInput]}
          placeholder="Sobre você"
          value={bio}
          onChangeText={setBio}
          multiline
          placeholderTextColor="#888"
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  readOnlyInput: {
    backgroundColor: '#e0e0e0',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#e53935',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});