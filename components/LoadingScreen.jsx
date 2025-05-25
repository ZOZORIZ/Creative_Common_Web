'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
    const loadingMessages = [
        { id: 1, text: "Hold on, we’re brainstorming..." },
        { id: 2, text: "Hang tight — our designers are filling out their course exit survey." },
        { id: 3, text: "Currently in a team meeting... also known as a meme-sharing session." },
        { id: 4, text: "Hold on... our designer is stuck in AK Block, 8th floor." },
        { id: 5, text: "Composing designs while dodging lab records." },
        { id: 6, text: "Munching vadas from Kiosk... please wait." },
        { id: 7, text: "Everyone’s here... except the one who knows Figma." },
        { id: 8, text: "Condonation adakan poyi, designer ippo varum..." },
      ];
  
  
  

  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);
  const [lastId, setLastId] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Get a random message after component mounts
    const randomIndex = Math.floor(Math.random() * loadingMessages.length);
    setCurrentMessage(loadingMessages[randomIndex]);
    setLastId(loadingMessages[randomIndex].id);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      let randomId;
      do {
        randomId = Math.floor(Math.random() * loadingMessages.length) + 1;
      } while (randomId === lastId);

      const newMessage = loadingMessages.find(msg => msg.id === randomId);
      if (newMessage) {
        setCurrentMessage(newMessage);
        setLastId(randomId);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [lastId, isClient]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
    >
      <div className="text-center flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img 
            src="/logo.png" 
            alt="CreativeCommon Logo" 
            className="w-[350px] h-[80px] object-cover"
          />
        </motion.div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto"
        />
        
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-gray-600 font-medium h-6"
          >
            {currentMessage.text}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}