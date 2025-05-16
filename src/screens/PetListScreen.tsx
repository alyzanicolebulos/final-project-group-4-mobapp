import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Pet } from '../types';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: '2 years',
    description: 'Friendly and playful. Loves kids and other dogs.',
    status: 'available',
    image: require('../../assets/dog1.jpg'),
  },
  {
    id: '2',
    name: 'Mittens',
    breed: 'Domestic Shorthair',
    age: '1 year',
    description: 'Gentle and affectionate. Great lap cat.',
    status: 'available',
    image: require('../../assets/cat1.jpg'),
  },
];

const PetListScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [savedPets, setSavedPets] = useState<string[]>([]);

  useEffect(() => {
    const loadSavedPets = async () => {
      try {
        const saved = await AsyncStorage.getItem('savedPets');
        if (saved) {
          setSavedPets(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading saved pets:', error);
      }
    };
    loadSavedPets();
  }, []);

  const toggleSavePet = async (petId: string) => {
    try {
      let updatedSavedPets;
      if (savedPets.includes(petId)) {
        updatedSavedPets = savedPets.filter(id => id !== petId);
      } else {
        updatedSavedPets = [...savedPets, petId];
      }
      setSavedPets(updatedSavedPets);
      await AsyncStorage.setItem('savedPets', JSON.stringify(updatedSavedPets));
    } catch (error) {
      console.error('Error saving pet:', error);
    }
  };

  const renderPetCard = ({ item }: { item: Pet }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('PetDetail', { pet: item })}
    >
      <Image source={item.image} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={[styles.petName, { color: theme.colors.primary }]}>{item.name}</Text>
        <Text style={[styles.petDetails, { color: theme.colors.text }]}>
          {item.breed} • {item.age}
        </Text>
        <Text style={[styles.petDescription, { color: theme.colors.text }]} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={() => toggleSavePet(item.id)}
      >
        <Ionicons 
          name={savedPets.includes(item.id) ? 'heart' : 'heart-outline'} 
          size={24} 
          color={theme.colors.primary} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={pets.filter(pet => pet.status === 'available')}
        renderItem={renderPetCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  petImage: {
    width: '100%',
    height: 200,
  },
  petInfo: {
    padding: 16,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  petDetails: {
    fontSize: 16,
    marginBottom: 8,
  },
  petDescription: {
    fontSize: 14,
  },
  saveButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 8,
  },
});

export default PetListScreen;