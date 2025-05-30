'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    image: '/symphony.JPG',
    title: 'Symphony of Secrets',
    description: 'Also known as Voice of Nakshatra, this poster was a fun yet challenging design experience, pushing creative problem-solving',
    category: 'Graphic Design',
    mediaType: 'image'
  },
  {
    id: 2,
    image: '/strings.JPG',
    title: 'Enchanted Strings',
    description: 'A music-inspired visual that blends intricate line work and textures to capture the soulful essence of string instruments',
    category: 'Graphic Design',
    mediaType: 'image'
  },
  {
    id: 3,
    image: '/campus.png',
    title: 'Campus Ambassador',
    description: 'A promotional visual for the Campus Ambassador program, highlighting leadership, student engagement, and the vibrant spirit of college life.',
    category: 'Graphic Design',
    mediaType: 'image'
  },
  {
    id: 4,
    image: '/syncstep.png',
    title: 'Phantom Moves',
    description: 'A project about rhythm, movement, and synchronized visuals.',
    category: 'Graphic Design',
    mediaType: 'image'
  },
  {
    id:5,
    image: '/evan.jpg',
    title: 'Decemeber Special',
    description: 'A festive graphic campaign designed for Route 187, Changanassery — capturing the warmth and flavor of the season to promote their December specials.',
    category: 'Graphic Design',
    mediaType: 'image'
  },
  {
    id:6,
    image: '/tedxmainposter.png',
    title: 'TEDx Event Poster',
    description: 'Designing promotional material for a local TEDx event.',
    category: 'Graphic Design',
    mediaType: 'image'
  },
  {
    id:7,
    image: '/nk.png',
    title: "Nakshatra 2025",
    description: 'Masquerade of Elites',
    category: 'Graphic Design',
    mediaType: 'image'
  },
  {
    id:8,
    image: '/farewell_story.png',
    title: 'ADIEU 25',
    description: 'A heartfelt illustration created for the farewell event of the 2025 batch, capturing the nostalgia, joy, and final moments of campus life.',
    category: 'Graphic Design',
    mediaType: 'image'
  },
  {
    id:9,
    image: '/abitalib.png',
    title: 'Appreciation Poster',
    description: 'Exploring abstract forms and vibrant color palettes.',
    category: 'Graphic Design',
    mediaType: 'image'
  },
  {
    id:10,
    image: '/nakshatra.png',
    title: 'Nakshatra 2025 Logo',
    description: 'Designed around the theme Masquerade of Elites, this logo captures the grandeur and intrigue of Nakshatra 2025 with refined symbolism and visual flair',
    category: 'Logo Design',
    mediaType: 'image'
  },
  {
    id:11,
    image: '/nkmotion.gif',
    title: 'Motion Graphics',
    description: 'Last of Us Inspired',
    category: 'Motion Graphics',
    mediaType: 'image'
  },
  {
    id:12,
    image: '/x.gif',
    title: 'Tedx@Saintgits Motion Graphics',
    description: 'LED wall visual created for TEDx Saintgits 2025',
    category: 'Motion Graphics',
    mediaType: 'image'
  },
  {
    id:13,
    image: '/deadspace.jpeg',
    title: 'DeadSpace-Poster for Shristi',
    description: 'A visually immersive poster designed for the VR-themed event "EndSpace" as part of the Shristi college fest — blending sci-fi aesthetics with digital surrealism to evoke the thrill of virtual exploration.',
    category: 'Graphic Design',
    mediaType: 'image'
  },
  {
    id:14,
    image: '/rashii.png',
    title: 'Logo Work For Outside Client',
    description: 'A dynamic logo crafted for a nature club, symbolizing the elemental forces of earth, fire, and vitality — capturing the spirit of resilience, natural power, and environmental harmony.',
    category: 'Logo Design',
    mediaType: 'image'
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
                      ? 'w-full max-w-4xl mx-auto' 
                      : 'w-[calc(50%-0.5rem)] sm:w-40 h-40 sm:h-60'
                  } bg-white`}
                  onClick={() => handleCardClick(project.id)}
                  whileHover={{ scale: isExpanded ? 1 : 1.05 }}
                  whileTap={{ scale: isExpanded ? 1 : 0.98 }}
                  ref={el => { cardRefs.current[project.id] = el; }}
                >
                  <div className={`relative ${isExpanded ? 'aspect-video' : 'h-full w-full'}`}>
                    {isExpanded && (
                      <div className="absolute inset-0 overflow-hidden">
                        {project.mediaType === 'video' && !project.image.endsWith('.gif') ? (
                          <video
                            src={project.image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%] object-cover blur-xl opacity-30"
                          />
                        ) : (
                          <Image 
                            src={project.image}
                            alt=""
                            fill
                            className="object-cover blur-lg opacity-70 scale-110"
                            priority
                          />
                        )}
                      </div>
                    )}
                    {project.mediaType === 'video' && !project.image.endsWith('.gif') ? (
                      <video
                        src={project.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`${isExpanded ? 'object-contain rounded-t-2xl relative z-10' : 'object-cover rounded-2xl'}`}
                        style={{ width: '100%', height: '100%' }}
                      />
                    ) : (
                      <Image 
                        src={project.image}
                        alt={`Portfolio Image ${project.id}`}
                        fill
                        className={`${isExpanded ? 'object-contain rounded-t-2xl relative z-10' : 'object-cover rounded-2xl'}`}
                        priority
                        sizes={isExpanded ? "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw" : "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"}
                      />
                    )}
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