'use client';

import { motion } from 'motion/react';

interface ColorPaletteGeneratorProps {
  currentColor: string;
  setCurrentColor: (color: string) => void;
  colorHistory: string[];
  generateRandomColor: () => void;
  copyToClipboard: (text: string) => void;
}

export default function ColorPaletteGenerator({
  currentColor,
  setCurrentColor,
  colorHistory,
  generateRandomColor,
  copyToClipboard
}: ColorPaletteGeneratorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Color Palette Generator</h3>
          <p className="text-gray-400">Generate and explore beautiful colors!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Color */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Current Color</h4>
            <div 
              className="w-full h-32 rounded-lg mb-4 border border-slate-600"
              style={{ backgroundColor: currentColor }}
            />
            <div className="flex items-center gap-4 mb-4">
              <input
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="w-12 h-12 rounded border border-slate-600 cursor-pointer"
              />
              <div className="flex-1">
                <div className="text-white font-mono text-lg">{currentColor}</div>
                <div className="text-gray-400 text-sm">Click to copy</div>
              </div>
              <button
                onClick={() => copyToClipboard(currentColor)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition-colors duration-300"
              >
                Copy
              </button>
            </div>
            <button
              onClick={generateRandomColor}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
            >
              ✨
              Generate Random Color
            </button>
          </div>

          {/* Color History */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Recent Colors</h4>
            <div className="grid grid-cols-5 gap-2">
              {colorHistory.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square rounded-lg border border-slate-600 cursor-pointer hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                  title={color}
                />
              ))}
            </div>
            {colorHistory.length === 0 && (
              <div className="text-gray-400 text-center py-8">
                Generate some colors to see them here!
              </div>
            )}
          </div>
        </div>

        {/* Color Information */}
        <div className="mt-6 bg-slate-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Color Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {parseInt(currentColor.slice(1, 3), 16)}
              </div>
              <div className="text-gray-400 text-sm">Red</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {parseInt(currentColor.slice(3, 5), 16)}
              </div>
              <div className="text-gray-400 text-sm">Green</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {parseInt(currentColor.slice(5, 7), 16)}
              </div>
              <div className="text-gray-400 text-sm">Blue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
