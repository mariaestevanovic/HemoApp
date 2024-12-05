import React, { useState, useEffect, useContext } from 'react'; 
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserContext'; // Importe o contexto do usuário

export default function TelaHistoricoDoacoes({ route, navigation }) {
  const { user } = useContext(UserContext); // Acessando o usuário para pegar o gênero
  const [completedDonations, setCompletedDonations] = useState([]);
  const [nextDonationDate, setNextDonationDate] = useState(null);

  // Quando a tela for carregada e a navegação passar os parâmetros
  useEffect(() => {
    if (route.params && route.params.completedSchedule) {
      const newDonation = route.params.completedSchedule;
      // Adicionando o novo card no início da lista
      setCompletedDonations((prevDonations) => [newDonation, ...prevDonations]);
    }
  }, [route.params]); // Escuta mudanças nos parâmetros passados pela navegação

  // Atualiza a próxima data de doação, baseada na data mais recente e no gênero
  useEffect(() => {
  if (completedDonations.length > 0 && user) {
    const latestDonation = completedDonations[0]; // A doação mais recente
    const latestDonationDate = new Date(latestDonation.date); // Convertendo a data para um objeto Date

    // Criar uma cópia da data da última doação, para não modificar a data original
    const nextDonationDate = new Date(latestDonationDate);

    // Definir o intervalo de doação conforme o gênero
    const donationInterval = user.gender === 'Feminino' ? 60 : 30; // 60 dias para feminino, 30 dias para masculino
    nextDonationDate.setDate(nextDonationDate.getDate() + donationInterval); // Adiciona o intervalo de doação

    // Atualiza o estado com a próxima data de doação sem alterar a data da última doação
    setNextDonationDate(nextDonationDate);
  }
}, [completedDonations, user]);

  const formatDate = (date) => {
    const day = String(date.getDate() + 1).padStart(2, '0');
    const month = String(date.getMonth()).padStart(2, '0'); // Mês é 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Exibindo todas as doações concluídas */}
        {completedDonations.length > 0 ? (
          completedDonations.map((donation, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.date}>Data de Realização: {donation.date}</Text>
              <Text style={styles.time}>Horário: {donation.time}</Text>
              <Text style={styles.location}>Local: {donation.address}</Text>
              <TouchableOpacity
                onPress={() => {
                  // Navegar para a tela de certificado e passar os dados, incluindo a data de realização
                  navigation.navigate('Certificado', {
                    time: donation.time,
                    address: donation.address,
                    date: donation.date, // Passando a data de realização
                  });
                }}
              >
                <Text style={styles.certificate}>Ver certificado</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.errorText}>Nenhuma doação concluída ainda.</Text>
        )}
      </ScrollView>

      <Text style={styles.nextDonationText}>Próxima data de doação sugerida:</Text>
      {/* Exibe a próxima data de doação apenas se disponível */}
      <Text style={styles.nextDonationDate}>
        {nextDonationDate ? formatDate(nextDonationDate) : 'Carregando...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#99999',
  },
  card: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 10,
  },
  certificate: {
    color: '#E53935',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  nextDonationText: {
    fontSize: 16,
    marginTop: 20,
    color: 'grey',
  },
  nextDonationDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
