'use client';
import { createContext, useContext, useState } from 'react';

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
  const [filterStatus, setFilterStatus] = useState(null); // Changed from 'sale' to null

  return (
    <PropertyContext.Provider value={{ filterStatus, setFilterStatus }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function usePropertyContext() {
  return useContext(PropertyContext);
}
