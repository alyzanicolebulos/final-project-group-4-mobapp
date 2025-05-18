import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { usePets } from '../context/PetContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { pets } = usePets();
  const [savedPets, setSavedPets] = useState<string[]>([]);
  const availablePets = pets.filter(pet => pet.status === 'available');

  useEffect(() => {
    const loadSavedPets = async () => {
      try {
        const saved = await AsyncStorage.getItem('savedPets');
        if (saved) setSavedPets(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved pets:', error);
      }
    };
    loadSavedPets();
  }, []);

  const savePet = async (petId: string) => {
    try {
      const updatedSavedPets = [...savedPets, petId];
      setSavedPets(updatedSavedPets);
      await AsyncStorage.setItem('savedPets', JSON.stringify(updatedSavedPets));
    } catch (error) {
      console.error('Error saving pet:', error);
    }
  };

  const renderCard = (pet: Pet) => {
    if (!pet) return null;
    
    return (
      <View style={[styles.swipeCard, { backgroundColor: theme.colors.card }]}>
        <Image source={pet.image} style={styles.swipeImage} />
        <View style={styles.swipeInfo}>
          <Text style={[styles.swipeName, { color: theme.colors.primary }]}>
            {pet.name}
          </Text>
          <Text style={[styles.swipeDetails, { color: theme.colors.text }]}>
            {pet.breed} • {pet.age}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Swiper Section */}
      <View style={styles.swiperContainer}>
        {availablePets.length > 0 ? (
          <Swiper
            cards={availablePets}
            renderCard={renderCard}
            onSwipedRight={(index) => savePet(availablePets[index].id)}
            backgroundColor="transparent"
            stackSize={3}
            infinite
            showSecondCard
            animateOverlayLabelsOpacity
            overlayLabels={{
              left: {
                title: 'PASS',
                style: {
                  label: {
                    backgroundColor: theme.colors.error,
                    borderColor: theme.colors.error,
                    color: 'white',
                    borderWidth: 1,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30,
                  },
                },
              },
              right: {
                title: 'SAVE',
                style: {
                  label: {
                    backgroundColor: theme.colors.success,
                    borderColor: theme.colors.success,
                    color: 'white',
                    borderWidth: 1,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30,
                  },
                },
              },
            }}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            cardStyle={styles.swipeCardStyle}
          />
        ) : (
          <View style={styles.emptySwiper}>
            <Ionicons name="paw" size={48} color={theme.colors.secondary} />
            <Text style={[styles.emptyText, { color: theme.colors.text }]}>
              No pets available right now
            </Text>
          </View>
        )}
      </View>

      {/* Original Content Below */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          PAWS Animal Rehabilitation Center
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          About Us
        </Text>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          PARC is a non-profit organization dedicated to rescuing,
          rehabilitating, and rehoming animals in need.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          Location
        </Text>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color={theme.colors.secondary} />
          <Text
            style={[styles.text, { color: theme.colors.text, marginLeft: 8 }]}>
            123 Animal Lane, Petville, PV 12345
          </Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          Adoption Process
        </Text>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          1. Swipe right to save pets you like
          {'\n'}2. View your saved pets in the Saved tab
          {'\n'}3. Submit an application
          {'\n'}4. Meet & greet with the pet
          {'\n'}5. Finalize adoption
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          FAQ
        </Text>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          <Text style={{ fontWeight: 'bold' }}>
            Q: What are your adoption fees?
          </Text>
          {'\n'}A: Fees vary by animal, typically $50-$200.
          {'\n\n'}
          <Text style={{ fontWeight: 'bold' }}>
            Q: What's included in the adoption?
          </Text>
          {'\n'}A: Spay/neuter, vaccinations, microchip.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperContainer: {
    height: 400,
    marginBottom: 16,
  },
  swipeCard: {
    borderRadius: 8,
    height: '100%',
    overflow: 'hidden',
  },
  swipeImage: {
    width: '100%',
    height: '80%',
  },
  swipeInfo: {
    padding: 16,
  },
  swipeName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  swipeDetails: {
    fontSize: 16,
  },
  swipeCardStyle: {
    height: '90%',
  },
  emptySwiper: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default HomeScreen;