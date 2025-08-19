'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface PartyEffectProps {
  isActive: boolean;
}

export default function PartyEffect({ isActive }: PartyEffectProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; shape: string }>>([]);
  const [balloons, setBalloons] = useState<Array<{ id: number; x: number; color: string }>>([]);

  useEffect(() => {
    if (!isActive) return;

    // Create confetti pieces
    const confettiCount = 100;
    const confettiColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const confettiShapes = ['🎉', '🎊', '✨', '🎈', '🎁', '🎂', '🎃', '🎄'];
    
    const newConfetti = Array.from({ length: confettiCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      shape: confettiShapes[Math.floor(Math.random() * confettiShapes.length)]
    }));
    setConfetti(newConfetti);

    // Create balloons
    const balloonCount = 15;
    const balloonColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    const newBalloons = Array.from({ length: balloonCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)]
    }));
    setBalloons(newBalloons);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 pointer-events-none"
    >
      {/* Background celebration */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10" />
      
      {/* Confetti */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ 
            x: `${piece.x}vw`, 
            y: '-10vh',
            opacity: 0,
            scale: 0,
            rotate: 0
          }}
          animate={{ 
            x: `${piece.x + (Math.random() - 0.5) * 40}vw`,
            y: '110vh',
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 720]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: piece.id * 0.02,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute text-2xl"
          style={{ color: piece.color }}
        >
          {piece.shape}
        </motion.div>
      ))}

      {/* Balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          initial={{ 
            x: `${balloon.x}vw`, 
            y: '100vh',
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: `${balloon.x + (Math.random() - 0.5) * 20}vw`,
            y: '-10vh',
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            delay: balloon.id * 0.3,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute text-4xl"
          style={{ color: balloon.color }}
        >
          🎈
        </motion.div>
      ))}

      {/* Center celebration message */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <div className="text-8xl mb-6">🎉</div>
        <div className="text-white text-3xl font-bold mb-4">PARTY MODE!</div>
        <div className="text-yellow-200 text-xl">Let&apos;s celebrate coding! 🎊</div>
      </motion.div>

      {/* Fireworks */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`firework-${i}`}
          initial={{ 
            x: `${20 + i * 10}vw`, 
            y: '100vh',
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: `${20 + i * 10 + (Math.random() - 0.5) * 10}vw`,
            y: '30vh',
            opacity: [0, 1, 0],
            scale: [0, 2, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute text-4xl"
        >
          💥
        </motion.div>
      ))}

      {/* Pulse rings */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={`pulse-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 4, 0],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-yellow-400 rounded-full"
        />
      ))}

      {/* Floating emojis */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`emoji-${i}`}
          initial={{ 
            x: `${Math.random() * 100}vw`, 
            y: '100vh',
            opacity: 0,
            rotate: 0
          }}
          animate={{ 
            x: `${Math.random() * 100}vw`,
            y: '-5vh',
            opacity: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute text-2xl"
        >
          {['🎉', '🎊', '✨', '🎈', '🎁', '🎂', '🎃', '🎄', '🎅', '🎆', '🎇', '🧨', '🎐', '🎑', '🎀', '🎁', '🎗️', '🎟️', '🎫', '🎖️'][i % 20]}
        </motion.div>
      ))}
    </motion.div>
  );
}
