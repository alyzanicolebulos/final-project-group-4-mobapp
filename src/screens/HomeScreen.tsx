 import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>PAWS Animal Rehabilitation Center</Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>About Us</Text>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          PARC is a non-profit organization dedicated to rescuing, rehabilitating, and rehoming animals in need.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Location</Text>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color={theme.colors.secondary} />
          <Text style={[styles.text, { color: theme.colors.text, marginLeft: 8 }]}>
            123 Animal Lane, Petville, PV 12345
          </Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Adoption Process</Text>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          1. Browse available pets
          {"\n"}2. Save your favorites
          {"\n"}3. Submit an application
          {"\n"}4. Meet & greet with the pet
          {"\n"}5. Finalize adoption
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>FAQ</Text>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          <Text style={{ fontWeight: 'bold' }}>Q: What are your adoption fees?</Text>
          {"\n"}A: Fees vary by animal, typically $50-$200.
          {"\n\n"}<Text style={{ fontWeight: 'bold' }}>Q: What's included in the adoption?</Text>
          {"\n"}A: Spay/neuter, vaccinations, microchip.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
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