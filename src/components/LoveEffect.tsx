'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoveEffectProps {
  isActive: boolean;
}

export default function LoveEffect({ isActive }: LoveEffectProps) {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; size: number; color: string }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (!isActive) return;

    // Create floating hearts
    const heartCount = 25;
    const newHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 20 + Math.random() * 40,
      color: ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ffd6d6'][Math.floor(Math.random() * 4)]
    }));
    setHearts(newHearts);

    // Create sparkles
    const sparkleCount = 50;
    const newSparkles = Array.from({ length: sparkleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setSparkles(newSparkles);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 pointer-events-none"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-red-500/10 to-purple-500/10" />
      
      {/* Floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ 
            x: `${heart.x}vw`, 
            y: '100vh',
            opacity: 0,
            scale: 0,
            rotate: 0
          }}
          animate={{ 
            x: `${heart.x + (Math.random() - 0.5) * 20}vw`,
            y: '-10vh',
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: heart.id * 0.1,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute text-2xl"
          style={{ 
            fontSize: `${heart.size}px`,
            color: heart.color
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ 
            x: `${sparkle.x}vw`, 
            y: `${sparkle.y}vh`,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: `${sparkle.x + (Math.random() - 0.5) * 10}vw`,
            y: `${sparkle.y + (Math.random() - 0.5) * 10}vh`,
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: sparkle.id * 0.05,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute text-yellow-300 text-lg"
        >
          ✨
        </motion.div>
      ))}

      {/* Center love message */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <div className="text-8xl mb-6">💖</div>
        <div className="text-white text-2xl font-bold mb-4">Sending Love!</div>
        <div className="text-pink-200 text-lg">You are amazing! Keep coding! 💖</div>
      </motion.div>

      {/* Pulse rings */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={`pulse-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 3, 0],
            opacity: [0, 0.2, 0]
          }}
          transition={{
            duration: 3,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-pink-400 rounded-full"
        />
      ))}

      {/* Rainbow trail effect */}
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={`rainbow-${i}`}
          initial={{ 
            x: '50vw', 
            y: '100vh',
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: `${50 + (Math.random() - 0.5) * 40}vw`,
            y: '-5vh',
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute text-2xl"
          style={{ 
            color: `hsl(${i * 36}, 70%, 60%)`
          }}
        >
          💕
        </motion.div>
      ))}
    </motion.div>
  );
}
