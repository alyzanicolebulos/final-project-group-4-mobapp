import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Pet } from '../../types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const PetFormScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'PetForm'>>();
  const { pet } = route.params;

  const [formData, setFormData] = useState<Omit<Pet, 'id'>>({
    name: '',
    breed: '',
    age: '',
    description: '',
    status: 'available',
    image: require('../../../assets/placeholder.jpg'),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pet) {
      setFormData(pet);
      setIsEditing(true);
    }
  }, [pet]);

  const handleChange = (field: keyof Pet, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'We need camera roll permissions to upload images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData(prev => ({ ...prev, image: { uri: result.assets[0].uri } }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.breed || !formData.age || !formData.description) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, this would be an API call to save the pet
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Success', `Pet ${isEditing ? 'updated' : 'added'} successfully`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', `Failed to ${isEditing ? 'update' : 'add'} pet`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.formContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {isEditing ? 'Edit Pet' : 'Add New Pet'}
        </Text>

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {typeof formData.image === 'object' && 'uri' in formData.image ? (
            <Image source={{ uri: formData.image.uri }} style={styles.petImage} />
          ) : (
            <Image source={formData.image} style={styles.petImage} />
          )}
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={24} color="white" />
          </View>
        </TouchableOpacity>

        <Text style={[styles.label, { color: theme.colors.text }]}>Name *</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            },
          ]}
          value={formData.name}
          onChangeText={text => handleChange('name', text)}
          placeholder="Pet name"
          placeholderTextColor="#999"
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>Breed *</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            },
          ]}
          value={formData.breed}
          onChangeText={text => handleChange('breed', text)}
          placeholder="Pet breed"
          placeholderTextColor="#999"
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>Age *</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            },
          ]}
          value={formData.age}
          onChangeText={text => handleChange('age', text)}
          placeholder="Pet age (e.g., 2 years)"
          placeholderTextColor="#999"
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>Status</Text>
        <View style={styles.statusContainer}>
          {['available', 'pending', 'adopted'].map(status => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusOption,
                {
                  backgroundColor:
                    formData.status === status ? theme.colors.primary : theme.colors.card,
                },
              ]}
              onPress={() => handleChange('status', status)}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: formData.status === status ? 'white' : theme.colors.text },
                ]}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: theme.colors.text }]}>Description *</Text>
        <TextInput
          style={[
            styles.textArea,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            },
          ]}
          value={formData.description}
          onChangeText={text => handleChange('description', text)}
          placeholder="Describe the pet's personality, needs, etc."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: theme.colors.primary },
            isLoading && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={styles.buttonText}>Processing...</Text>
          ) : (
            <Text style={styles.buttonText}>{isEditing ? 'Update Pet' : 'Add Pet'}</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagePicker: {
    alignSelf: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cameraIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusOption: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textArea: {
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  submitButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PetFormScreen;