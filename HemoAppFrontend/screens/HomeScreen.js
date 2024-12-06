import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps';

const HomeScreen = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const address = encodeURIComponent("Av. Mal. Campos 1468, Vitória, ES, 29047-105");
        // Altere a URL da API para incluir o endereço desejado
        const url = `https://api-v2.distancematrix.ai/maps/api/geocode/json?address=${address}&key=API_KEY`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'OK') {
          setApiResponse(data);
          const { lat, lng } = data.result[0].geometry.location; // Ajustado para usar 'result' e não 'results'
          setLocation({ latitude: lat, longitude: lng });
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
        <>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.responseText}>Status: {apiResponse.status}</Text>
            {Array.isArray(apiResponse.result) && apiResponse.result.length > 0 ? (
              apiResponse.result.map((result, index) => (
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

          {location && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={location}
                title="Localização"
                description="Este é o local retornado pela API"
              />
            </MapView>
          )}
        </>
      ) : (
        <Text style={styles.loadingText}>Carregando dados...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
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
    textAlign: 'center',
    marginTop: 20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: 300,
    marginTop: 20,
  },
});

export default HomeScreen;
