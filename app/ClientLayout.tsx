'use client';
import { useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import ScrollWrapper from '../components/ScrollWrapper';
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  // Handle initial loading screen
  useEffect(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      const timer = setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <ScrollWrapper>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </ScrollWrapper>
  );
} 