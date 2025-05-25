'use client';
import { createContext, useContext } from 'react';

const ScrollContext = createContext(null);

export function ScrollProvider({ children, scrollToForm }) {
  return (
    <ScrollContext.Provider value={{ scrollToForm }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
} 