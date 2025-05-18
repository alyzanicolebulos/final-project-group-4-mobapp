import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { usePets } from '../../context/PetContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Pet } from '../../types/index';

type PetFormRouteProp = RouteProp<RootStackParamList, 'PetForm'>;

const PetFormScreen = () => {
  const { theme } = useTheme();
  const { addPet, updatePet } = usePets();
  const navigation = useNavigation();
  const route = useRoute<PetFormRouteProp>();
  const { pet } = route.params;

  const [form, setForm] = useState<Omit<Pet, 'id'>>({
    name: pet?.name || '',
    breed: pet?.breed || '',
    age: pet?.age || '',
    description: pet?.description || '',
    status: pet?.status || 'available',
    image: pet?.image || require('../../../assets/placeholder.jpg'),
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Need camera roll access to upload images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm(prev => ({ ...prev, image: { uri: result.assets[0].uri } }));
    }
  };

  const handleSubmit = () => {
    if (!form.name || !form.breed || !form.age || !form.description) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (pet) {
      updatePet(pet.id, form);
      Alert.alert('Success', 'Pet updated successfully');
    } else {
      addPet(form);
      Alert.alert('Success', 'New pet added for adoption');
    }
    navigation.goBack();
  };

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={pickImage}>
          <Image 
            source={form.image} 
            style={{ 
              width: '100%', 
              height: 200, 
              borderRadius: 8,
              backgroundColor: theme.colors.card
            }} 
          />
          <Ionicons 
            name="camera" 
            size={24} 
            color="white" 
            style={{ 
              position: 'absolute', 
              right: 10, 
              bottom: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 15,
              padding: 5
            }} 
          />
        </TouchableOpacity>

        <TextInput
          placeholder="Name"
          value={form.name}
          onChangeText={text => setForm(prev => ({ ...prev, name: text }))}
          style={{ 
            marginTop: 20, 
            padding: 15, 
            backgroundColor: theme.colors.card, 
            borderRadius: 8,
            color: theme.colors.text
          }}
        />

        {/* Add similar fields for breed, age, description */}

        <TouchableOpacity
          onPress={handleSubmit}
          style={{ 
            backgroundColor: theme.colors.primary, 
            padding: 15, 
            borderRadius: 8,
            marginTop: 30,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {pet ? 'Update Pet' : 'Add Pet'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PetFormScreen;