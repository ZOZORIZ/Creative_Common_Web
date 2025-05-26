'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    image: '/symphony.JPG',
    title: 'Project Symphony',
    description: 'A creative project exploring visual harmony and digital art.',
    category: 'Digital Art',
  },
  {
    id: 2,
    image: '/strings.JPG',
    title: 'Project Strings',
    description: 'An intricate design piece focusing on detailed line work and texture.',
    category: 'Illustration',
  },
  {
    id: 3,
    image: '/campus.png',
    title: 'Campus Life',
    description: 'Capturing the vibrant energy and diverse scenes of campus life.',
    category: 'Photography',
  },
  {
    id: 4,
    image: '/syncstep.png',
    title: 'Syncstep',
    description: 'A project about rhythm, movement, and synchronized visuals.',
    category: 'Motion Graphics',
  },
  {
    id:5,
    image: '/evan.jpg',
    title: 'Evan',
    description: 'A portrait series exploring emotion and expression.',
    category: 'Photography',
  },
  {
    id:6,
    image: '/tedxmainposter.png',
    title: 'TEDx Event Poster',
    description: 'Designing promotional material for a local TEDx event.',
    category: 'Graphic Design',
  },
  {
    id:7,
    image: '/nk.png',
    title: "Nature's Kiss",
    description: 'Inspired by the beauty and tranquility of nature.',
    category: 'Digital Painting',
  },
  {
    id:8,
    image: '/farewell_story.png',
    title: 'Farewell Story',
    description: 'A visual narrative about goodbyes and new beginnings.',
    category: 'Illustration',
  },
  {
    id:9,
    image: '/abitalib.png',
    title: 'Abstract Design',
    description: 'Exploring abstract forms and vibrant color palettes.',
    category: 'Abstract Art',
  }
];

export default function Portfolio() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const handleCardClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    console.log('expandedId changed:', expandedId);
    const element = cardRefs.current[expandedId as number];

    if (expandedId !== null && element) {
      console.log('Expanded card element is available:', element);

      // Use setTimeout to wait for layout update and potential ref assignment
      const timer = setTimeout(() => {
        console.log('Inside setTimeout');
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.scrollY;
        const viewportCenter = window.innerHeight / 2;
        const scrollPosition = absoluteElementTop - viewportCenter + (elementRect.height / 2);

        console.log('Element Rect:', elementRect);
        console.log('Window ScrollY:', window.scrollY);
        console.log('Window InnerHeight:', window.innerHeight);
        console.log('Calculated Scroll Position:', scrollPosition);

        // Check if scrolling is even possible/necessary
        const currentScroll = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        console.log('Current Scroll:', currentScroll);
        console.log('Max Scroll:', maxScroll);

        if (maxScroll > 0 && Math.abs(scrollPosition - currentScroll) > 1) { // Only attempt to scroll if there's scrollable content and the target is different
           console.log('Attempting to scroll to:', scrollPosition);
            window.scrollTo({
              top: scrollPosition,
              behavior: 'smooth',
            });
        } else {
            console.log('Scrolling not necessary or possible.');
        }

      }, 100); // Reduced delay (e.g., 150ms)

      // Clean up the timer
      return () => clearTimeout(timer);
    } else if (expandedId === null) {
        console.log('ExpandedId is null, not scrolling.');
    }
  }, [expandedId]); // Depend on expandedId

  return (
    <PageTransition>
      <div 
        className="min-h-screen bg-cover bg-center overflow-hidden py-20 px-4 relative bg-[url('/portfolio.png')] bg-[length:400%_auto] sm:bg-[length:110%_auto]"
      >
        {expandedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black bg-opacity-50 z-10"
          />
        )}

        {/* Hero Section */}
        <section className="text-center mb-8 sm:mb-16 mt-16 sm:mt-24 z-20 relative">
          {/* Blur box around heading and subheading */}
          <div className="inline-block backdrop-blur-sm bg-white/30 rounded-lg p-4 sm:p-6 max-w-5xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-5 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent"
            >
              Our Portfolio
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              A showcase of our creative journey and the stories we've helped bring to life
            </motion.p>
          </div>
        </section>

        {/* Interactive Gallery */}
        <section className="max-w-6xl mx-auto z-20 relative px-4">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {projects.map(project => {
              const isExpanded = expandedId === project.id;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className={`relative rounded-2xl overflow-hidden shadow-xl cursor-pointer ${
                    isExpanded 
                      ? 'w-full max-w-3xl' 
                      : 'w-[calc(50%-0.5rem)] sm:w-40 h-40 sm:h-60'
                  } bg-white`}
                  onClick={() => handleCardClick(project.id)}
                  whileHover={{ scale: isExpanded ? 1 : 1.05 }}
                  whileTap={{ scale: isExpanded ? 1 : 0.98 }}
                  ref={el => { cardRefs.current[project.id] = el; }}
                >
                  <div className={`relative ${isExpanded ? 'h-64 sm:h-96' : 'h-full w-full'}`}>
                    <Image 
                      src={project.image}
                      alt={`Portfolio Image ${project.id}`}
                      fill
                      className={`object-cover ${isExpanded ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                      priority
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 sm:p-6 bg-white"
                      >
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">{project.title}</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-3">{project.description}</p>
                        <span className="inline-block px-3 py-1 text-xs sm:text-sm bg-indigo-100 text-indigo-700 rounded-full">
                          {project.category}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-white/70 mb-0 max-w-2xl mx-auto text-center italic fixed bottom-4 left-0 right-0"
          >
            creativecommon ©
          </motion.p>
      </div>
    </PageTransition>
  );
}