'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface MatrixEffectProps {
  isActive: boolean;
}

export default function MatrixEffect({ isActive }: MatrixEffectProps) {
  const [columns, setColumns] = useState<Array<{ id: number; delay: number }>>([]);

  useEffect(() => {
    if (!isActive) return;

    // Create fewer columns for better performance
    const columnCount = Math.floor(window.innerWidth / 40); // Much wider spacing
    
    const newColumns = Array.from({ length: columnCount }, (_, i) => ({
      id: i,
      delay: Math.random() * 2000
    }));
    
    setColumns(newColumns);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 pointer-events-none"
    >
      <div className="absolute inset-0 bg-black/90" />
      
      {/* CSS-based matrix rain - much more performant */}
      <style jsx>{`
        @keyframes matrixRain {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        @keyframes charFlip {
          0%, 100% { transform: rotateX(0deg); }
          50% { transform: rotateX(90deg); }
        }
        
        .matrix-column {
          position: absolute;
          top: 0;
          font-family: monospace;
          font-size: 14px;
          color: #00ff00;
          text-shadow: 0 0 5px #00ff00;
          animation: matrixRain 3s linear infinite;
        }
        
        .matrix-char {
          display: block;
          margin-bottom: 2px;
          animation: charFlip 0.5s ease-in-out infinite;
          animation-delay: calc(var(--char-index) * 0.1s);
        }
      `}</style>
      
      {/* Matrix columns using CSS animations */}
      {columns.map((column) => (
        <div
          key={column.id}
          className="matrix-column"
          style={{ 
            left: `${(column.id / Math.floor(window.innerWidth / 40)) * 100}%`,
            animationDelay: `${column.delay}ms`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          {Array.from({ length: 20 }, (_, charIndex) => (
            <span
              key={charIndex}
              className="matrix-char"
              style={{ 
                '--char-index': charIndex,
                animationDelay: `${column.delay + charIndex * 100}ms`
              } as React.CSSProperties}
            >
              {String.fromCharCode(0x30 + Math.floor(Math.random() * 47))}
            </span>
          ))}
        </div>
      ))}

      {/* Center overlay text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-green-400 text-2xl md:text-4xl font-mono text-center"
        >
          <div className="mb-4">MATRIX MODE</div>
          <div className="text-green-400/60 text-lg">ENTERING THE DIGITAL REALM</div>
        </motion.div>
      </div>
    </motion.div>
  );
}
