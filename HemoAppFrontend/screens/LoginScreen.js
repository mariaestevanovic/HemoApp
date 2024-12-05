import { useState, useContext } from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateUser } = useContext(UserContext);
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginError('Os campos não estão preenchidos.');
      return;
    }

    try {
      const response = await fetch('https://67197a937fc4c5ff8f4d8f31.mockapi.io/api/users', {
        method: 'GET',
      });

      const users = await response.json();

      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        setLoginError(''); // Limpa qualquer erro anterior
        updateUser(user);

        const isFirstLogin = await AsyncStorage.getItem('isFirstLogin');
        if (isFirstLogin === null) {
          await AsyncStorage.setItem('isFirstLogin', 'false');
          navigation.navigate('Instruction');
        } else {
          navigation.navigate('Main');
        }
      } else {
        setLoginError('Verifique se seu e-mail ou senha está correto.'); // Mensagem de erro
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na comunicação com o servidor');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content1}>
          <Image
            source={require('../assets/img/AppIcon-removebg-preview.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Bem-vindo!</Text>
        </View>
        <View style={styles.content2}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email || ''}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#888"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password || ''}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {loginError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{loginError}</Text>
            </View>
          ) : null}

          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.switchText}>
              Ainda não possui cadastro?{' '}
              <Text style={styles.clickHere}>clique aqui</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E53935',
    marginTop: 16,
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
  loginButton: {
    width: '80%',
    height: 48,
    backgroundColor: '#E53935',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
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

export default LoginScreen;
