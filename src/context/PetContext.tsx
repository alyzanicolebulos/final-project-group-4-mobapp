import React, { createContext, useContext, useState } from 'react';
import { Pet } from '../types/index';

interface PetContextType {
  pets: Pet[];
  addPet: (pet: Omit<Pet, 'id'>) => void;
  updatePet: (id: string, updates: Partial<Pet>) => void;
  deletePet: (id: string) => void;
}

const PetContext = createContext<PetContextType>({
  pets: [],
  addPet: () => {},
  updatePet: () => {},
  deletePet: () => {},
});

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>([]);

  const addPet = (pet: Omit<Pet, 'id'>) => {
    setPets(prev => [...prev, {
      ...pet,
      id: Date.now().toString(),
      status: 'available'
    }]);
  };

  const updatePet = (id: string, updates: Partial<Pet>) => {
    setPets(prev => prev.map(pet => 
      pet.id === id ? { ...pet, ...updates } : pet
    ));
  };

  const deletePet = (id: string) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
  };

  return (
    <PetContext.Provider value={{ pets, addPet, updatePet, deletePet }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePets = () => useContext(PetContext);