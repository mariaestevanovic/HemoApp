import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'; 

const HomeScreen = () => {
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const address = encodeURIComponent("Empire State Building, New York, NY");
        const url = `https://api.distancematrix.ai/maps/api/geocode/json?address=${address}&key=PHkJzje0y6bWLYpLLUn1XrSOSLlV9SDSeE1RReJYaeo1hZqEbaPW4P6IrhEjoXEL`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'OK') {
          setApiResponse(data);
        } else {
          Alert.alert('Erro', 'Localização não encontrada.');
        }
      } catch (error) {
        console.error('Erro ao buscar localização:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao buscar localização.');
      }
    };

    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Resultado da API de Geocodificação</Text>
      {apiResponse ? (
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.responseText}>Status: {apiResponse.status}</Text>
          {/* Verifica se existe a propriedade "results" e se é um array */}
          {Array.isArray(apiResponse.results) && apiResponse.results.length > 0 ? (
            apiResponse.results.map((result, index) => (
              <View key={index} style={styles.resultContainer}>
                <Text style={styles.resultText}>Endereço: {result.formatted_address}</Text>
                <Text style={styles.resultText}>Latitude: {result.geometry.location.lat}</Text>
                <Text style={styles.resultText}>Longitude: {result.geometry.location.lng}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.resultText}>Nenhum resultado encontrado.</Text>
          )}
        </ScrollView>
      ) : (
        <Text style={styles.loadingText}>Carregando dados...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  scrollContainer: {
    width: '100%',
  },
  responseText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  resultContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
  },
});

export default HomeScreen;
