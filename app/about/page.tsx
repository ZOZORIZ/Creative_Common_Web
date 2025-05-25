'use client';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import Image from 'next/image';

const tools = [
  { 
    name: 'Figma', 
    icon: <div className="flex flex-col items-center justify-center h-full">
      <Image 
        src="/Figma_Logo.png" 
        alt="Figma Logo" 
        width={56}
        height={56}
        className="object-contain"
      />
      <span className="mt-2 text-center text-indigo-700 font-medium">Figma</span>
    </div>
  },
  { 
    name: 'Canva', 
    icon: <div className="flex flex-col items-center justify-center h-full">
      <Image 
        src="/Canva.png" 
        alt="Canva Logo" 
        width={64}
        height={64}
        className="object-contain"
      />
      <span className="mt-2 text-center text-indigo-700 font-medium">Canva</span>
    </div>
  },
  { 
    name: 'Photoshop', 
    icon: <div className="flex flex-col items-center justify-center h-full">
      <Image 
        src="/Photoshop.png" 
        alt="Photoshop Logo" 
        width={68}
        height={64}
        className="object-contain"
      />
      <span className="mt-2 text-center text-indigo-700 font-medium">Photoshop</span>
    </div>
  },
  { 
    name: 'Premiere Pro', 
    icon: <div className="flex flex-col items-center justify-center h-full">
      <Image 
        src="/Premiere.png" 
        alt="Premiere Pro Logo" 
        width={48}
        height={48}
        className="object-contain"
      />
      <span className="mt-2 text-center text-indigo-700 font-medium">Premiere Pro</span>
    </div>
  },
  { 
    name: 'After Effects', 
    icon: <div className="flex flex-col items-center justify-center h-full">
      <Image 
        src="/after.png" 
        alt="After Effects Logo" 
        width={48}
        height={48}
        className="object-contain"
      />
      <span className="mt-2 text-center text-indigo-700 font-medium">After Effects</span>
    </div>
  },
  { 
    name: '3D Software', 
    icon: <div className="flex flex-col items-center justify-center h-full">
      <Image 
        src="/blender.png" 
        alt="3D Software Logo" 
        width={64}
        height={64}
        className="object-contain"
      />
      <span className="mt-2 text-center text-indigo-700 font-medium">3D Software</span>
    </div>
  }
];

export default function About() {
  return (
    <PageTransition>
      <div 
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url(/about.jpg)' }}
      >
        {/* Vertical Blur Container for Text Sections (Starts from Hero) */}
        <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/30 rounded-lg p-8 shadow-lg">
          {/* Hero Section */}
          <section className="pt-32 pb-0 px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent"
            >
              About CreativeCommon
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white mb-12" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              Where creativity meets community, and ideas transform into visual masterpieces
            </motion.p>
          </section>

          {/* Introduction Section */}
          <section className="py-10 px-4 ">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <p className="text-lg text-white leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  CreativeCommon is a student-driven creative production club that brings ideas to life through thoughtful design, storytelling, and digital media. We focus on supporting other student clubs and initiatives by providing design services — from posters and social media content to video editing and event branding.
                </p>
                <div className="bg-gradient-to-r from-indigo-100 to-pink-100 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-700" >Our Mission</h2>
                  <p className="text-lg text-gray-700" >
                    To make creativity accessible and impactful — where ideas matter just as much as execution.
                  </p>
                </div>
                <p className="text-lg text-white leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  In a world where communication is visual, we aim to ensure that every club and student project gets the presentation it deserves. Whether it&apos;s crafting a compelling event poster, editing a highlight video, or creating an Instagram reel that resonates — we handle the creative so others can focus on the content.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Tools Section */}
          <section className="py-10 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-700 bg-clip-text text-transparent" 
              >
                Our Creative Toolkit
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-3 gap-6"
              >
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow h-48 flex items-center justify-center"
                  >
                    {tool.icon}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Future Plans Section */}
          <section className="py-10 px-4 ">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-700 to-pink-500 bg-clip-text text-transparent mb-8">Growing Together</h2>
                <p className="text-lg text-white leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  We also plan to organize workshops, design challenges, and training sessions to help students sharpen their skills in UI design, digital editing, and visual communication — all while keeping things practical, collaborative, and student-friendly.
                </p>
                <div className="bg-gradient-to-r from-indigo-100 to-pink-100 rounded-2xl p-8 text-center">
                  <p className="text-lg text-gray-700">
                    CreativeCommon is here to build a bridge between creativity and execution — making sure every idea, no matter how big or small, gets the presentation it truly deserves.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-10 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-500 via-pink-600 to-pink-700 to-pink-500 bg-clip-text text-transparent"
              >
                Join Our Creative Family
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white mb-12 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                Whether you&apos;re a seasoned designer or just starting your creative journey, Creative Common is the perfect place to grow, learn, and create amazing things together.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
              </motion.div>
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

          
        </div> {/* End Vertical Blur Container */}

      </div>
    </PageTransition>
  );
} 