import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Pet } from '../types/index';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  PetDetail: { pet: Pet };
};

type PetDetailRouteProp = RouteProp<RootStackParamList, 'PetDetail'>;

const PetDetailScreen = () => {
  const { theme } = useTheme();
  const route = useRoute<PetDetailRouteProp>();
  const navigation = useNavigation();
  const { pet } = route.params;
  const [savedPets, setSavedPets] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const loadSavedPets = async () => {
      try {
        const saved = await AsyncStorage.getItem('savedPets');
        if (saved) {
          const savedIds = JSON.parse(saved);
          setSavedPets(savedIds);
          setIsSaved(savedIds.includes(pet.id));
        }
      } catch (error) {
        console.error('Error loading saved pets:', error);
      }
    };
    loadSavedPets();
  }, [pet.id]);

  const toggleSavePet = async () => {
    try {
      let updatedSavedPets;
      if (isSaved) {
        updatedSavedPets = savedPets.filter(id => id !== pet.id);
      } else {
        updatedSavedPets = [...savedPets, pet.id];
      }
      setSavedPets(updatedSavedPets);
      setIsSaved(!isSaved);
      await AsyncStorage.setItem('savedPets', JSON.stringify(updatedSavedPets));
    } catch (error) {
      console.error('Error saving pet:', error);
    }
  };

  const handleAdoptPress = () => {
    navigation.navigate('ApplicationForm', { petId: pet.id });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={pet.image} style={styles.petImage} />
      
      <View style={styles.header}>
        <Text style={[styles.petName, { color: theme.colors.primary }]}>{pet.name}</Text>
        <TouchableOpacity onPress={toggleSavePet}>
          <Ionicons 
            name={isSaved ? 'heart' : 'heart-outline'} 
            size={28} 
            color={theme.colors.primary} 
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.detailsCard, { backgroundColor: theme.colors.card }]}>
        <View style={styles.detailRow}>
          <Ionicons name="paw" size={20} color={theme.colors.secondary} />
          <Text style={[styles.detailText, { color: theme.colors.text }]}>Breed: {pet.breed}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={20} color={theme.colors.secondary} />
          <Text style={[styles.detailText, { color: theme.colors.text }]}>Age: {pet.age}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="information-circle" size={20} color={theme.colors.secondary} />
          <Text style={[styles.detailText, { color: theme.colors.text }]}>Status: {pet.status}</Text>
        </View>
      </View>

      <View style={[styles.descriptionCard, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>About {pet.name}</Text>
        <Text style={[styles.descriptionText, { color: theme.colors.text }]}>{pet.description}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.adoptButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleAdoptPress}
      >
        <Text style={styles.adoptButtonText}>Adopt Me</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  petImage: {
    width: '100%',
    height: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  petName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  detailsCard: {
    borderRadius: 8,
    padding: 16,
    margin: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 8,
  },
  descriptionCard: {
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  adoptButton: {
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  adoptButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PetDetailScreen;