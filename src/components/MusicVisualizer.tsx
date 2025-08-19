'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface MusicVisualizerProps {
  isActive: boolean;
}

export default function MusicVisualizer({ isActive }: MusicVisualizerProps) {
  const [bars, setBars] = useState<Array<{ id: number; height: number; color: string }>>([]);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    if (!isActive) return;

    // Create visualizer bars
    const barCount = 20;
    const newBars = Array.from({ length: barCount }, (_, i) => ({
      id: i,
      height: Math.random() * 100,
      color: `hsl(${200 + i * 8}, 70%, 60%)`
    }));
    setBars(newBars);

    // Create floating particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }));
    setParticles(newParticles);

    // Animate bars
    const interval = setInterval(() => {
      setBars(prev => prev.map(bar => ({
        ...bar,
        height: Math.random() * 150 + 20
      })));
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 pointer-events-none"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-blue-900/20 to-indigo-900/20" />
      
      {/* Visualizer bars at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 px-4 pb-8">
        {bars.map((bar) => (
          <motion.div
            key={bar.id}
            animate={{ height: bar.height }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="w-2 rounded-t-full"
            style={{ 
              backgroundColor: bar.color,
              boxShadow: `0 0 10px ${bar.color}`
            }}
          />
        ))}
      </div>

      {/* Floating music notes */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`note-${i}`}
          initial={{ 
            x: `${Math.random() * 100}vw`, 
            y: '100vh',
            opacity: 0,
            rotate: 0
          }}
          animate={{ 
            x: `${Math.random() * 100}vw`,
            y: '-10vh',
            opacity: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute text-3xl"
        >
          {['♪', '♫', '♬', '♩'][i % 4]}
        </motion.div>
      ))}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: `${particle.x}vw`, 
            y: '100vh',
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: `${particle.x + (Math.random() - 0.5) * 20}vw`,
            y: '-5vh',
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: particle.id * 0.1,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: particle.color,
            boxShadow: `0 0 10px ${particle.color}`
          }}
        />
      ))}

      {/* Center music player display */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <div className="text-6xl mb-4">🎧</div>
        <div className="text-white text-xl font-bold mb-2">Now Playing</div>
        <div className="text-gray-300 text-lg">Coding Session Mix</div>
        <div className="text-gray-400 text-sm">The Terminal Band</div>
      </motion.div>

      {/* Pulse rings */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={`pulse-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 2, 0],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 0.7,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-purple-400 rounded-full"
        />
      ))}
    </motion.div>
  );
}
