'use client';
import { useRef } from 'react';
import { ScrollProvider } from './ScrollContext';
import Navbar from './Navbar';
import { useRouter } from 'next/navigation';

export default function ScrollWrapper({ children }) {
  const router = useRouter();
  
  const scrollToForm = () => {
    // If not already on Home page, navigate with scroll parameter
    if (window.location.pathname !== '/') {
      router.push('/?scroll=form');
    } else {
      // If already on Home page, the scroll will be handled by the Hero component's useEffect
      // The button on the Hero page also uses the scrollToFormSection function directly.
      // No action needed here in ScrollWrapper for this case.
    }
  };

  return (
    <ScrollProvider scrollToForm={scrollToForm}>
      <Navbar />
      {children}
    </ScrollProvider>
  );
} 