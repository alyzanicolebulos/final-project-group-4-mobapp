import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Pet } from '../../types';
import { useNavigation } from '@react-navigation/native';

const ManagePetsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const loadPets = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const mockPets: Pet[] = [
          {
            id: '1',
            name: 'Buddy',
            breed: 'Golden Retriever',
            age: '2 years',
            description: 'Friendly and playful. Loves kids and other dogs.',
            status: 'available',
            image: require('../../../assets/dog1.jpg'),
          },
          {
            id: '2',
            name: 'Mittens',
            breed: 'Domestic Shorthair',
            age: '1 year',
            description: 'Gentle and affectionate. Great lap cat.',
            status: 'available',
            image: require('../../../assets/cat1.jpg'),
          },
        ];
        setPets(mockPets);
      } catch (error) {
        Alert.alert('Error', 'Failed to load pets');
      } finally {
        setIsLoading(false);
      }
    };

    loadPets();
  }, []);

  const handleDeletePet = (petId: string) => {
    Alert.alert(
      'Delete Pet',
      'Are you sure you want to delete this pet?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPets(pets.filter(pet => pet.id !== petId));
          },
        },
      ]
    );
  };

  const renderPetItem = ({ item }: { item: Pet }) => (
    <View style={[styles.petCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.petInfo}>
        <Text style={[styles.petName, { color: theme.colors.primary }]}>{item.name}</Text>
        <Text style={[styles.petDetails, { color: theme.colors.text }]}>
          {item.breed} • {item.age} • {item.status}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PetForm', { pet: item })}
          style={styles.actionButton}
        >
          <Ionicons name="create" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeletePet(item.id)}
          style={styles.actionButton}
        >
          <Ionicons name="trash" size={24} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Manage Pets</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('PetForm', { pet: null })}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading pets...</Text>
        </View>
      ) : (
        <FlatList
          data={pets}
          renderItem={renderPetItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.colors.text }]}>
                No pets found. Add a new pet to get started.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FF7D40',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  petCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  petDetails: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ManagePetsScreen;