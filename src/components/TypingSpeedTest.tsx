'use client';

import { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface TypingStats {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
}

interface TypingSpeedTestProps {
  typingStats: TypingStats;
  setTypingStats: (stats: TypingStats) => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  texts: string[];
}

export default function TypingSpeedTest({
  typingStats,
  setTypingStats,
  isTyping,
  setIsTyping,
  texts
}: TypingSpeedTestProps) {
  const [currentText, setCurrentText] = useState(texts[0]);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const startTest = () => {
    setUserInput('');
    setStartTime(Date.now());
    setIsTyping(true);
    setIsComplete(false);
    setErrors(0);
    setTypingStats({ wpm: 0, accuracy: 0, time: 0, errors: 0 });
    setCurrentText(texts[Math.floor(Math.random() * texts.length)]);
  };

  const resetTest = () => {
    setUserInput('');
    setStartTime(null);
    setIsTyping(false);
    setIsComplete(false);
    setErrors(0);
    setTypingStats({ wpm: 0, accuracy: 0, time: 0, errors: 0 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (!startTime) {
      setStartTime(Date.now());
    }

    // Calculate errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    // Check if completed
    if (value.length === currentText.length) {
      const endTime = Date.now();
      const timeInMinutes = (endTime - startTime!) / 1000 / 60;
      const words = currentText.split(' ').length;
      const wpm = Math.round(words / timeInMinutes);
      const accuracy = Math.round(((currentText.length - errorCount) / currentText.length) * 100);

      setTypingStats({ wpm, accuracy, time: Math.round((endTime - startTime!) / 1000), errors: errorCount });
      setIsComplete(true);
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Typing Speed Test</h3>
          <p className="text-gray-400">Test your typing speed and accuracy!</p>
        </div>

        {/* Stats Display */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 rounded-lg p-6 mb-6"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Your Results</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{typingStats.wpm}</div>
                <div className="text-gray-400 text-sm">WPM</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{typingStats.accuracy}%</div>
                <div className="text-gray-400 text-sm">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{typingStats.time}s</div>
                <div className="text-gray-400 text-sm">Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{typingStats.errors}</div>
                <div className="text-gray-400 text-sm">Errors</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Text to Type */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">Type this text:</h4>
          <div className="bg-slate-700 rounded-lg p-4 mb-4">
            <p className="text-gray-300 text-lg leading-relaxed font-mono">
              {currentText.split('').map((char, index) => (
                <span
                  key={index}
                  className={`${
                    index < userInput.length
                      ? userInput[index] === char
                        ? 'text-green-400'
                        : 'text-red-400 bg-red-900/30'
                      : 'text-gray-400'
                  }`}
                >
                  {char}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          {!isTyping && !isComplete && (
            <button
              onClick={startTest}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Start Test
            </button>
          )}
          {isComplete && (
            <button
              onClick={resetTest}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Try Again
            </button>
          )}
        </div>

        {/* Input Field */}
        {isTyping && (
          <div className="flex justify-center">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="w-full max-w-2xl bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-blue-500"
              placeholder="Start typing here..."
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}
