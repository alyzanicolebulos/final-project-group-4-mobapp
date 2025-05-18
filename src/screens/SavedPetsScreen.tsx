import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePets } from '../context/PetContext';

const SavedPetsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { pets } = usePets(); // Get pets from context
  const [savedPetIds, setSavedPetIds] = useState<string[]>([]);
  const [savedPets, setSavedPets] = useState<Pet[]>([]);

  useEffect(() => {
    const loadSavedPets = async () => {
      try {
        const saved = await AsyncStorage.getItem('savedPets');
        if (saved) {
          const savedIds = JSON.parse(saved);
          setSavedPetIds(savedIds);
          // Filter pets from context to only show saved ones
          const filteredPets = pets.filter(pet => savedIds.includes(pet.id));
          setSavedPets(filteredPets);
        }
      } catch (error) {
        console.error('Error loading saved pets:', error);
      }
    };
    loadSavedPets();
  }, [pets]); // Add pets as dependency to update when pets change

  const toggleSavePet = async (petId: string) => {
    try {
      const updatedSavedPets = savedPetIds.filter(id => id !== petId);
      setSavedPetIds(updatedSavedPets);
      setSavedPets(prev => prev.filter(pet => pet.id !== petId));
      await AsyncStorage.setItem('savedPets', JSON.stringify(updatedSavedPets));
    } catch (error) {
      console.error('Error removing saved pet:', error);
    }
  };

  const renderPetCard = ({ item }: { item: Pet }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('PetDetail', { pet: item })}
    >
      <Image 
        source={item.image} 
        style={styles.petImage} 
        defaultSource={require('../../assets/placeholder.jpg')}
      />
      <View style={styles.petInfo}>
        <Text style={[styles.petName, { color: theme.colors.primary }]}>{item.name}</Text>
        <Text style={[styles.petDetails, { color: theme.colors.text }]}>
          {item.breed} • {item.age}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={() => toggleSavePet(item.id)}
      >
        <Ionicons name="heart" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {savedPets.length > 0 ? (
        <FlatList
          data={savedPets}
          renderItem={renderPetCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike" size={48} color={theme.colors.secondary} />
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            You haven't saved any pets yet.
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.colors.text }]}>
            Browse pets and tap the heart icon to save them.
          </Text>
        </View>
      )}
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
    height: 150,
    backgroundColor: '#f0f0f0', // Fallback background
  },
  petInfo: {
    padding: 16,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  petDetails: {
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SavedPetsScreen;