import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { PanGestureHandler } from 'react-native-gesture-handler';

const InstructionScreen = ({ navigation }) => {
  const slides = [
    {
      id: 1,
      text: 'Procure o ponto de coleta mais perto',
      image: require('../assets/img/instruction1.png'),
      backgroundColor: '#fff',
    },
    {
      id: 2,
      text: 'Faça o seu agendamento',
      image: require('../assets/img/instruction2.png'),
      backgroundColor: '#E53935',
    },
    {
      id: 3,
      text: 'Organize seu histórico de coleta com app',
      image: require('../assets/img/instruction3.png'),
      backgroundColor: '#4CAF50',
    },
    {
      id: 4,
      text: 'Ganhe mais pontos e atinja o seu progresso',
      image: require('../assets/img/instruction4.png'),
      backgroundColor: '#fff',
    },
  ];

  const handleSwipe = (event) => {
    const { translationX } = event.nativeEvent;
    if (translationX > 50) {
      navigation.goBack();
    } else if (translationX < -50) {
      navigation.navigate('Main');
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleSwipe}>
      <Swiper loop={false} showsPagination={true} dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
        {slides.map((slide, index) => (
          <View key={slide.id} style={[styles.slide, { backgroundColor: slide.backgroundColor }]}>
            {/* Adjusted Skip button */}
            <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Main')}>
              <Text style={styles.skipText}>Pular</Text>
            </TouchableOpacity>

            <Image source={slide.image} style={styles.image} />
            <Text style={[styles.text, { color: slide.backgroundColor === '#fff' ? '#E53935' : '#fff' }]}>
              {slide.text}
            </Text>

            {/* Position "Concluir" button lower only on the last slide */}
            {index === slides.length - 1 && (
              <TouchableOpacity
                style={[styles.button, styles.finalButton, styles.finalButtonPosition]}
                onPress={() => navigation.navigate('Main')}>
                <Text style={styles.buttonText}>Concluir</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Swiper>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#E53935',
    alignItems: 'center',
  },
  finalButton: {
    backgroundColor: '#E53935',
  },
  finalButtonPosition: {
    position: 'absolute',
    bottom: 140,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    position: 'absolute',
    top: 60, 
    right: 20,
  },
  skipText: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: '#ddd',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#E53935',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

export default InstructionScreen;
