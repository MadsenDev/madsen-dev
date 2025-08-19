'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface CoffeeSteamProps {
  isActive: boolean;
}

export default function CoffeeSteam({ isActive }: CoffeeSteamProps) {
  const [steamParticles, setSteamParticles] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    if (!isActive) return;

    // Create steam particles positioned above the coffee cup
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 10, // Center with slight variation
      delay: i * 150 // Stagger the particles
    }));
    
    setSteamParticles(particles);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
    >
      {/* Coffee cup */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-6xl relative"
      >
        ☕
        
        {/* Steam particles positioned directly above the cup */}
        {steamParticles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: `${particle.x - 50}%`, 
              y: '0%', 
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              x: `${particle.x - 50 + (Math.random() - 0.5) * 8}%`, // Slight horizontal spread
              y: '-80%', // Rise up above the cup
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2.5,
              delay: particle.delay / 1000,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute text-white/70 text-xl"
            style={{ 
              left: '50%',
              top: '0%'
            }}
          >
            ~
          </motion.div>
        ))}
        
        {/* Additional steam swirls */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`swirl-${i}`}
            initial={{ 
              x: `${-5 + i * 2}%`, 
              y: '0%', 
              opacity: 0,
              rotate: 0
            }}
            animate={{ 
              x: `${-5 + i * 2 + (Math.random() - 0.5) * 6}%`, 
              y: '-60%', 
              opacity: [0, 0.6, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 3,
              delay: i * 200 / 1000,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute text-white/50 text-lg"
            style={{ 
              left: '50%',
              top: '0%'
            }}
          >
            ～
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
