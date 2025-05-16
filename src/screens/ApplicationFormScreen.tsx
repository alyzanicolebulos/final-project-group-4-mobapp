import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const ApplicationFormScreen = () => {
  const { theme } = useTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'ApplicationForm'>>();
  const navigation = useNavigation();
  const { petId } = route.params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required').min(2, 'Too short'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Invalid phone number'),
    address: Yup.string().required('Address is required').min(10, 'Address too short'),
    occupation: Yup.string().required('Occupation is required'),
    experience: Yup.string()
      .required('Please describe your experience with pets')
      .min(20, 'Please provide more details'),
    reason: Yup.string()
      .required('Please explain why you want to adopt')
      .min(20, 'Please provide more details'),
    housingType: Yup.string().required('Housing type is required'),
    hasChildren: Yup.string().required('This field is required'),
    hasOtherPets: Yup.string().required('This field is required'),
  });

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send this data to your backend
      const applicationData = {
        ...values,
        petId,
        submittedAt: new Date().toISOString(),
        status: 'pending',
      };
      
      console.log('Application submitted:', applicationData);
      setSubmitSuccess(true);
    } catch (error) {
      Alert.alert(
        'Submission Error',
        'There was an error submitting your application. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={72} color={theme.colors.success} />
          <Text style={[styles.successTitle, { color: theme.colors.text }]}>
            Application Submitted!
          </Text>
          <Text style={[styles.successText, { color: theme.colors.text }]}>
            Thank you for your application to adopt. We'll review your information and contact you within 3-5 business days.
          </Text>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.continueButtonText}>Back to Pet</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Ionicons name="paw" size={32} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.primary }]}>Adoption Application</Text>
      </View>

      <Text style={[styles.subtitle, { color: theme.colors.text }]}>
        Please fill out this form completely. All fields are required.
      </Text>

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          phone: '',
          address: '',
          occupation: '',
          housingType: '',
          hasChildren: '',
          hasOtherPets: '',
          experience: '',
          reason: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ 
          handleChange, 
          handleBlur, 
          handleSubmit, 
          values, 
          errors, 
          touched,
          isValid,
          dirty
        }) => (
          <View style={styles.formContainer}>
            {/* Personal Information Section */}
            <Text style={[styles.sectionHeader, { color: theme.colors.primary }]}>
              Personal Information
            </Text>
            
            <Text style={[styles.label, { color: theme.colors.text }]}>Full Name</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: theme.colors.card, 
                  color: theme.colors.text,
                  borderColor: errors.fullName && touched.fullName 
                    ? theme.colors.error 
                    : theme.colors.border,
                }
              ]}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
              placeholder="John Doe"
              placeholderTextColor="#999"
            />
            {errors.fullName && touched.fullName && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.fullName}
              </Text>
            )}

            <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: theme.colors.card, 
                  color: theme.colors.text,
                  borderColor: errors.email && touched.email 
                    ? theme.colors.error 
                    : theme.colors.border,
                }
              ]}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="john@example.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && touched.email && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.email}
              </Text>
            )}

            <Text style={[styles.label, { color: theme.colors.text }]}>Phone Number</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: theme.colors.card, 
                  color: theme.colors.text,
                  borderColor: errors.phone && touched.phone 
                    ? theme.colors.error 
                    : theme.colors.border,
                }
              ]}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              placeholder="1234567890"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
            {errors.phone && touched.phone && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.phone}
              </Text>
            )}

            <Text style={[styles.label, { color: theme.colors.text }]}>Address</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: theme.colors.card, 
                  color: theme.colors.text,
                  borderColor: errors.address && touched.address 
                    ? theme.colors.error 
                    : theme.colors.border,
                }
              ]}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              placeholder="123 Main St, City, State ZIP"
              placeholderTextColor="#999"
            />
            {errors.address && touched.address && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.address}
              </Text>
            )}

            <Text style={[styles.label, { color: theme.colors.text }]}>Occupation</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: theme.colors.card, 
                  color: theme.colors.text,
                  borderColor: errors.occupation && touched.occupation 
                    ? theme.colors.error 
                    : theme.colors.border,
                }
              ]}
              onChangeText={handleChange('occupation')}
              onBlur={handleBlur('occupation')}
              value={values.occupation}
              placeholder="Your current job"
              placeholderTextColor="#999"
            />
            {errors.occupation && touched.occupation && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.occupation}
              </Text>
            )}

            {/* Living Situation Section */}
            <Text style={[styles.sectionHeader, { color: theme.colors.primary }]}>
              Living Situation
            </Text>

            <Text style={[styles.label, { color: theme.colors.text }]}>Housing Type</Text>
            <View style={styles.radioGroup}>
              {['House', 'Apartment', 'Condo', 'Other'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.radioOption}
                  onPress={() => handleChange('housingType')(option)}
                >
                  <Ionicons
                    name={values.housingType === option ? 'radio-button-on' : 'radio-button-off'}
                    size={24}
                    color={values.housingType === option ? theme.colors.primary : theme.colors.text}
                  />
                  <Text style={[styles.radioLabel, { color: theme.colors.text }]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.housingType && touched.housingType && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.housingType}
              </Text>
            )}

            <Text style={[styles.label, { color: theme.colors.text }]}>Do you have children?</Text>
            <View style={styles.radioGroup}>
              {['Yes', 'No'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.radioOption}
                  onPress={() => handleChange('hasChildren')(option)}
                >
                  <Ionicons
                    name={values.hasChildren === option ? 'radio-button-on' : 'radio-button-off'}
                    size={24}
                    color={values.hasChildren === option ? theme.colors.primary : theme.colors.text}
                  />
                  <Text style={[styles.radioLabel, { color: theme.colors.text }]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.hasChildren && touched.hasChildren && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.hasChildren}
              </Text>
            )}

            <Text style={[styles.label, { color: theme.colors.text }]}>Do you have other pets?</Text>
            <View style={styles.radioGroup}>
              {['Yes', 'No'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.radioOption}
                  onPress={() => handleChange('hasOtherPets')(option)}
                >
                  <Ionicons
                    name={values.hasOtherPets === option ? 'radio-button-on' : 'radio-button-off'}
                    size={24}
                    color={values.hasOtherPets === option ? theme.colors.primary : theme.colors.text}
                  />
                  <Text style={[styles.radioLabel, { color: theme.colors.text }]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.hasOtherPets && touched.hasOtherPets && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.hasOtherPets}
              </Text>
            )}

            {/* Pet Experience Section */}
            <Text style={[styles.sectionHeader, { color: theme.colors.primary }]}>
              Pet Experience
            </Text>

            <Text style={[styles.label, { color: theme.colors.text }]}>
              Describe your experience with pets (current/past pets, training experience, etc.)
            </Text>
            <TextInput
              style={[
                styles.textArea, 
                { 
                  backgroundColor: theme.colors.card, 
                  color: theme.colors.text,
                  borderColor: errors.experience && touched.experience 
                    ? theme.colors.error 
                    : theme.colors.border,
                }
              ]}
              onChangeText={handleChange('experience')}
              onBlur={handleBlur('experience')}
              value={values.experience}
              placeholder="Tell us about your experience with pets..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
            />
            {errors.experience && touched.experience && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.experience}
              </Text>
            )}

            <Text style={[styles.label, { color: theme.colors.text }]}>
              Why do you want to adopt this pet?
            </Text>
            <TextInput
              style={[
                styles.textArea, 
                { 
                  backgroundColor: theme.colors.card, 
                  color: theme.colors.text,
                  borderColor: errors.reason && touched.reason 
                    ? theme.colors.error 
                    : theme.colors.border,
                }
              ]}
              onChangeText={handleChange('reason')}
              onBlur={handleBlur('reason')}
              value={values.reason}
              placeholder="Explain why you're interested in adopting..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
            />
            {errors.reason && touched.reason && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.reason}
              </Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                { 
                  backgroundColor: isValid && dirty 
                    ? theme.colors.primary 
                    : '#ccc',
                  opacity: isSubmitting ? 0.7 : 1,
                }
              ]}
              onPress={() => handleSubmit()}
              disabled={!isValid || !dirty || isSubmitting}
            >
              {isSubmitting ? (
                <Text style={styles.submitButtonText}>Submitting...</Text>
              ) : (
                <Text style={styles.submitButtonText}>Submit Application</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
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
  errorText: {
    fontSize: 14,
    marginTop: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  submitButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
  continueButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 30,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ApplicationFormScreen;