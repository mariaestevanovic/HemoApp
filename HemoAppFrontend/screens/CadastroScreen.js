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
  const [cadastroError, setCadastroError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !gender) {
      setCadastroError('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setCadastroError('As senhas não coincidem.');
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
        setCadastroError(''); // Limpa qualquer erro anterior
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } else {
        setCadastroError(data.message || 'Ocorreu um erro no cadastro');
      }
    } catch (error) {
      setCadastroError('Falha na comunicação com o servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Text style={styles.genderText}>Gênero</Text>

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'Feminino' && styles.genderButtonSelected]}
          onPress={() => setGender('Feminino')}>
          <Text style={[styles.genderButtonText, gender === 'Feminino' && styles.genderButtonTextSelected]}>
            Feminino
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'Masculino' && styles.genderButtonSelected]}
          onPress={() => setGender('Masculino')}>
          <Text style={[styles.genderButtonText, gender === 'Masculino' && styles.genderButtonTextSelected]}>
            Masculino
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      {cadastroError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{cadastroError}</Text>
        </View>
      ) : null}

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
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E53935',
    marginBottom: 28,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  registerButton: {
    width: '80%',
    height: 48,
    backgroundColor: '#E53935',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
  },
  clickHere: {
    color: '#E53935',
    fontWeight: 'bold',
  },
  genderText: {
    fontSize: 20,
    color: '#555',
    marginTop: 20,
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
  errorContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#F8D7DA',
    borderRadius: 5,
    borderColor: '#F5C6CB',
    borderWidth: 1,
    width: "80%",
  },
  errorText: {
    color: '#721C24',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CadastroScreen;
