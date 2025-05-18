import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { usePets } from '../context/PetContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pet } from '../types/index';

const PetListScreen = () => {
  const { theme } = useTheme();
  const { pets } = usePets();
  const navigation = useNavigation();
  const [savedPets, setSavedPets] = useState<string[]>([]);

  useEffect(() => {
    const loadSavedPets = async () => {
      try {
        const saved = await AsyncStorage.getItem('savedPets');
        if (saved) setSavedPets(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved pets', error);
      }
    };
    loadSavedPets();
  }, []);

  const toggleSaved = async (petId: string) => {
    try {
      const updated = savedPets.includes(petId)
        ? savedPets.filter(id => id !== petId)
        : [...savedPets, petId];
      setSavedPets(updated);
      await AsyncStorage.setItem('savedPets', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save pet', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {pets.length === 0 ? (
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 20
        }}>
          <Ionicons name="paw" size={48} color={theme.colors.secondary} />
          <Text style={{ 
            color: theme.colors.text, 
            fontSize: 18,
            marginTop: 16,
            textAlign: 'center'
          }}>
            No pets available for adoption yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={pets.filter(pet => pet.status === 'available')}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={{ 
                margin: 10, 
                borderRadius: 8,
                backgroundColor: theme.colors.card,
                overflow: 'hidden'
              }}
              onPress={() => navigation.navigate('PetDetail', { pet: item })}
            >
              <Image 
                source={item.image} 
                style={{ 
                  width: '100%', 
                  height: 200,
                }} 
                resizeMode="cover"
              />
              <View style={{ padding: 15 }}>
                <Text style={{ 
                  color: theme.colors.primary, 
                  fontWeight: 'bold',
                  fontSize: 18
                }}>
                  {item.name}
                </Text>
                <Text style={{ color: theme.colors.text }}>
                  {item.breed} • {item.age}
                </Text>
              </View>
              <TouchableOpacity 
                style={{ 
                  position: 'absolute', 
                  right: 15, 
                  top: 15,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  borderRadius: 20,
                  padding: 5
                }}
                onPress={() => toggleSaved(item.id)}
              >
                <Ionicons 
                  name={savedPets.includes(item.id) ? 'heart' : 'heart-outline'} 
                  size={24} 
                  color={theme.colors.primary} 
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default PetListScreen;