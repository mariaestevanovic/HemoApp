import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

const CadastroScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('https://67197a937fc4c5ff8f4d8f31.mockapi.io/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          gender,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', data.message || 'Ocorreu um erro no cadastro');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na comunicação com o servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Text style={styles.genderText}>Gênero</Text>

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'Feminino' && styles.genderButtonSelected,
          ]}
          onPress={() => setGender('Feminino')}>
          <Text
            style={[
              styles.genderButtonText,
              gender === 'Feminino' && styles.genderButtonTextSelected,
            ]}>
            Feminino
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'Masculino' && styles.genderButtonSelected,
          ]}
          onPress={() => setGender('Masculino')}>
          <Text
            style={[
              styles.genderButtonText,
              gender === 'Masculino' && styles.genderButtonTextSelected,
            ]}>
            Masculino
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchText}>
          Já possui cadastro?{' '}
          <Text style={styles.clickHere}>Clique aqui</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '20%',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 80,
    textAlign: 'center',
    color: '#E53935',
  },
  input: {
    width: '80%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  registerButton: {
    width: '80%',
    backgroundColor: '#E53935',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 16,
    color: '#000',
  },
  clickHere: {
    color: '#E53935',
    fontWeight: 'bold',
  },
  genderText: {
    fontSize: 24,
    color: '#555',
    marginTop: 30,
    marginBottom: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '84%',
    marginBottom: 50,
  },
  genderButton: {
    width: '45%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  genderButtonSelected: {
    backgroundColor: '#9F9F9F',
    borderColor: '#9F9F9F',
  },
  genderButtonText: {
    color: '#555',
    fontSize: 16,
  },
  genderButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CadastroScreen;