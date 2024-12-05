import React, { useContext, useCallback, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../context/UserContext';

export default function TelaPerfil({ navigation }) {
  const { user, updateUser } = useContext(UserContext);

  const isProfileComplete = useCallback(() => {
    return user && user.phone && user.location && user.cpf && user.rg && user.bloodType && user.birthDate && user.weight;
  }, [user]);

  const addDonationPoints = useCallback(() => {
    updateUser({
      ...user,
      points: (user.points || 0) + 1000,
    });
  }, [user, updateUser]);

  useEffect(() => {
    if (isProfileComplete() && (!user.points || user.points < 1000)) {
      addDonationPoints();
    }
  }, [isProfileComplete, addDonationPoints, user]);

  if (!user.email) {
    return <Text>Carregando...</Text>; // Exibe "Carregando" até os dados do usuário estarem disponíveis
  }


  if (!user.email) {
    return <Text>Carregando...</Text>; // Exibe "Carregando" até os dados do usuário estarem disponíveis
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profilePictureContainer}>
          {/* Usando uma URL de imagem de perfil do usuário */}
          <Image
            source={{ uri: user.profilePicture || 'https://via.placeholder.com/100' }} // A URL do perfil pode vir do user
            style={styles.profilePicture}
          />
        </View>
        <Text style={styles.userName}>{user.name || 'Nome do Usuário'}</Text>
      </View>

      {/* Profile Completion Alert */}
     {!isProfileComplete() && (
        <TouchableOpacity style={styles.alertBox} onPress={() => navigation.navigate('Editar')} >
          <Text style={styles.alertText}>
            Faltam algumas informações para completar seu perfil. Preencha-as agora para ganhar 100.000 pontos!
          </Text>
          <Icon name="arrow-right" size={20} color="#e53935" onPress={() => navigation.navigate('Editar')} />
        </TouchableOpacity>
      )}

      {/* Contact Information */}
      <View style={styles.contactInfo}>
        <Icon name="email" size={20} color="#e53935" />
        <Text style={styles.contactText}>{user.email || 'Email não disponível'}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Icon name="phone" size={20} color="#e53935" />
        <Text style={styles.contactText}>{user.phone || 'Telefone não disponível'}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Icon name="map-marker" size={20} color="#e53935" />
        <Text style={styles.contactText}>{user.location || 'Localização não disponível'}</Text>
      </View>

      {/* Biography Section */}
      <View style={styles.bioSection}>
        <Text style={styles.sectionTitle}>Biografia</Text>
        <Text style={styles.bioText}>
          {user.bio || 'Biografia não disponível'}
        </Text>
      </View>

      {/* Points and Donations */}
      <View style={styles.pointsSection}>
        <Text style={styles.pointsText}>⭐ {user.points || '0'} pontos acumulados</Text>
        <Text style={styles.donationsText}>🩸 {user.donations || '0'} doações</Text>
      </View>

      {/* Donation Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.levelItem}>
          <Icon name="water" size={24} color="#e53935" />
          <Text style={styles.levelText}>Primeira Doação</Text>
        </View>
        <View style={styles.levelItem}>
          <Icon name="water" size={24} color="#e53935" />
          <Text style={styles.levelText}>Doador Bronze</Text>
        </View>
        <View style={styles.levelItem}>
          <Icon name="water" size={24} color="#e53935" />
          <Text style={styles.levelText}>Doador Prata</Text>
        </View>
        <View style={styles.levelItem}>
          <Icon name="water-outline" size={24} color="#ccc" />
          <Text style={styles.levelText}>Doador Ouro</Text>
        </View>
      </View>

      {/* Donation Invitation Button */}
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>Criar convite de doação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#99999',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profilePictureContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    marginRight: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  bioSection: {
    marginTop: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#e53935',
  },
  bioText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  pointsSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  pointsText: {
    fontSize: 16,
    color: '#e53935',
    fontWeight: 'bold',
  },
  donationsText: {
    fontSize: 14,
    color: '#e53935',
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  levelItem: {
    alignItems: 'center',
  },
  levelText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  inviteButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 25,
    alignItems: 'center',
  },
  inviteButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userName: {
    top: 15,
    fontWeight: 'bold',
    fontSize: 16,
  }
});