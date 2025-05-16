// types/index.ts
import { ImageSourcePropType } from 'react-native';

// Root navigation stack param types
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

// Pet data structure
export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  description: string;
  status: 'available' | 'pending' | 'adopted';
  image: ImageSourcePropType | { uri: string }; // Can be local image or URI
}

// Adoption application data structure
export interface AdoptionApplication {
  id: string;
  petId: string;
  petName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantAddress: string;
  applicantOccupation: string;
  housingType: 'House' | 'Apartment' | 'Condo' | 'Other';
  hasChildren: boolean;
  hasOtherPets: boolean;
  petExperience: string;
  adoptionReason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

// User type for authentication
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  token?: string; // For JWT authentication
}

// Theme colors type
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  card: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

// Form field error type
export type FormErrors = {
  [key: string]: string;
};

// API response structure
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
  success: boolean;
}

// Pagination type for API responses
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Image picker result type
export interface ImagePickerResult {
  cancelled: boolean;
  uri?: string;
  width?: number;
  height?: number;
  type?: string;
  base64?: string;
}