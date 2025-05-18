import { ImageSourcePropType } from 'react-native';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  description: string;
  status: 'available' | 'pending' | 'adopted';
  image: ImageSourcePropType | { uri: string };
}

export type RootStackParamList = {
  // User screens
  Home: undefined;
  Browse: undefined;
  Saved: undefined;
  PetDetail: { pet: Pet };
  ApplicationForm: { petId: string };
  
  // Admin screens
  Login: undefined;
  AdminDashboard: undefined;
  ManagePets: undefined;
  PetForm: { pet: Pet | null };
  Applications: undefined;
};

export interface AdoptionApplication {
  id: string;
  petId: string;
  applicantName: string;
  contactInfo: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  token?: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  card: string;
  border: string;
  error: string;
  success: string;
}

export type FormErrors = {
  [key: string]: string;
};

// Simplified version for default export
export default {
  Pet,
  RootStackParamList,
  AdoptionApplication,
  User,
  ThemeColors,
  FormErrors
};