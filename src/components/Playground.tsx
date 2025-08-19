'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Type, Palette } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import MatrixEffect from './MatrixEffect';
import CoffeeSteam from './CoffeeSteam';
import MusicVisualizer from './MusicVisualizer';
import LoveEffect from './LoveEffect';
import PartyEffect from './PartyEffect';
import TypingSpeedTest from './TypingSpeedTest';
import ColorPaletteGenerator from './ColorPaletteGenerator';

type PlaygroundMode = 'terminal' | 'typing' | 'colors';

interface TypingStats {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
}

export default function Playground() {
  const { t } = useLanguage();
  const [currentMode, setCurrentMode] = useState<PlaygroundMode>('terminal');
  const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
  const [consoleInput, setConsoleInput] = useState('');
  const [showMatrix, setShowMatrix] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [showTrophy, setShowTrophy] = useState(false);
  const [showCoffeeSteam, setShowCoffeeSteam] = useState(false);
  const [showMusicVisualizer, setShowMusicVisualizer] = useState(false);
  const [showLoveEffect, setShowLoveEffect] = useState(false);
  const [showPartyEffect, setShowPartyEffect] = useState(false);
  const [showEasterEgg] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Game state
  const [gameState, setGameState] = useState<'idle' | 'playing'>('idle');
  const [gameRoom, setGameRoom] = useState('entrance');
  const [gameInventory, setGameInventory] = useState<string[]>([]);
  const [gameScore, setGameScore] = useState(0);

  // Typing test state
  const [typingStats, setTypingStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 0,
    time: 0,
    errors: 0
  });
  const [isTyping, setIsTyping] = useState(false);

  // Color generator state
  const [currentColor, setCurrentColor] = useState('#3b82f6');
  const [colorHistory, setColorHistory] = useState<string[]>([]);

  const typingTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the art of telling another human being what one wants the computer to do.",
    "Code is like humor. When you have to explain it, it's bad.",
    "The best error message is the one that never shows up.",
    "First, solve the problem. Then, write the code."
  ];

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [consoleHistory]);

      const handleConsoleCommand = async (command: string) => {
      const newHistory = [...consoleHistory, `> ${command}`];
      setConsoleHistory(newHistory);
      setConsoleInput('');
      
      // Handle game input if game is active
      if (gameState === 'playing') {
        await handleGameInput(command);
        return;
      }
      
      switch (command.toLowerCase()) {
      case 'projects':
        await typeInTerminal([
          t('terminal.projects.title'),
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          t('terminal.projects.gravstellerne.title'),
          `   ${t('terminal.projects.gravstellerne.description')}`,
          `   ${t('terminal.projects.gravstellerne.tech')}`,
          `   ${t('terminal.projects.gravstellerne.status')}`,
          '',
          t('terminal.projects.portfolio.title'),
          `   ${t('terminal.projects.portfolio.description')}`,
          `   ${t('terminal.projects.portfolio.tech')}`,
          `   ${t('terminal.projects.portfolio.status')}`,
          '',
          t('terminal.projects.supportTools.title'),
          `   ${t('terminal.projects.supportTools.description')}`,
          `   ${t('terminal.projects.supportTools.tech')}`,
          `   ${t('terminal.projects.supportTools.status')}`,
          '',
          t('terminal.projects.freelance.title'),
          `   ${t('terminal.projects.freelance.description')}`,
          `   ${t('terminal.projects.freelance.tech')}`,
          `   ${t('terminal.projects.freelance.status')}`,
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        break;
      case 'about':
        await typeInTerminal([
          '👨‍💻 ABOUT CHRISTOFFER MADSEN',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '🎯 Full-stack developer with a passion for creating',
          '   user-friendly web applications and tools.',
          '',
          '💼 CURRENT WORK:',
          '   • Gravstellerne AS - Building web applications',
          '   • Elkjøp Halden - Service employee',
          '   • Freelance - Various client projects',
          '',
          '🛠️ TECH STACK:',
          '   Frontend: React, Next.js, TypeScript, Tailwind CSS',
          '   Backend: Node.js, Express.js, MySQL',
          '   Tools: Motion, Lucide React, Zustand, IndexedDB',
          '',
          '🎓 BACKGROUND:',
          '   From tech support to full-stack development',
          '   Focus on creating reliable, user-friendly solutions',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        break;
      case 'contact':
        await typeInTerminal([
          t('terminal.contact.title'),
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '🌐 Portfolio: madsens.dev',
          `📧 ${t('terminal.contact.email')}`,
          `💼 ${t('terminal.contact.linkedin')}`,
          `🐙 ${t('terminal.contact.github')}`,
          '',
          '💬 Let\'s work together on your next project!',
          '   I specialize in modern web applications',
          '   and user-friendly interfaces.',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        break;
      case 'typing':
        await typeInTerminal([
          '⌨️ TYPING SPEED TEST',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          'Switching to typing test mode...',
          'Use the mode selector above to access the test.',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        setCurrentMode('typing');
        break;
      case 'colors':
        await typeInTerminal([
          '🎨 COLOR PALETTE GENERATOR',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          'Switching to color generator mode...',
          'Use the mode selector above to access the generator.',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        setCurrentMode('colors');
        break;
      case 'game':
        await typeInTerminal([
          t('terminal.game.title'),
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          t('terminal.game.description'),
          t('terminal.game.commands'),
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        setGameState('playing');
        setGameRoom('entrance');
        setGameInventory([]);
        setGameScore(0);
        await showGameRoom();
        break;
      case 'matrix':
        await typeInTerminal([
          '🌌 ENTERING THE MATRIX...',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '01001000 01100101 01101100 01101100 01101111',
          '01010111 01101111 01110010 01101100 01100100',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        setShowMatrix(true);
        setTimeout(() => setShowMatrix(false), 5000);
        break;
      case 'music':
        await typeInTerminal([
          '🎵 MUSIC PLAYER',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫',
          '🎧 Now Playing: Coding Session Mix',
          '🎵 Track: "Debugging Blues"',
          '🎤 Artist: The Terminal Band',
          '♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        setShowMusicVisualizer(true);
        setTimeout(() => setShowMusicVisualizer(false), 6000);
        break;
      case 'coffee':
        await typeInTerminal([
          '☕ COFFEE BREWER',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '☕ Brewing coffee...',
          '☕ Grinding beans...',
          '☕ Adding hot water...',
          '☕ Coffee is ready! Enjoy your coding session!',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        setShowCoffeeSteam(true);
        setTimeout(() => setShowCoffeeSteam(false), 5000);
        break;
      case 'love':
        await typeInTerminal([
          '💖 LOVE GENERATOR',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '💖 Sending love to all developers...',
          '💖 You are amazing! Keep coding! 💖',
          '💖 Remember: You are capable of great things! 💖',
          '💖 Stay curious, stay passionate! 💖',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        setShowLoveEffect(true);
        setTimeout(() => setShowLoveEffect(false), 5000);
        break;
      case 'rocket':
        await typeInTerminal([
          '🚀 ROCKET LAUNCHER',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '🚀 Preparing for launch...',
          '🚀 Systems check complete...',
          '🚀 3... 2... 1... LIFTOFF! 🚀',
          '🚀 Rocket successfully launched into orbit! 🚀',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        setShowRocket(true);
        setTimeout(() => setShowRocket(false), 4000);
        break;
      case 'target':
        await typeInTerminal([
          '🎯 TARGET ACQUISITION',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '🎯 Target acquired...',
          '🎯 Calculating trajectory...',
          '🎯 Bullseye! Perfect shot! 🎯',
          '🎯 All targets eliminated! 🎯',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        setShowTarget(true);
        setTimeout(() => setShowTarget(false), 3000);
        break;
      case 'trophy':
        await typeInTerminal([
          '🏆 SECRET TROPHY',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '🏆 You found the secret trophy!',
          '🏆 Congratulations! You are a terminal master! 🏆',
          '🏆 Achievement Unlocked: Terminal Wizard 🏆',
          '🏆 You\'ve mastered the art of command line! 🏆',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        setShowTrophy(true);
        setTimeout(() => setShowTrophy(false), 4000);
        break;
      case 'party':
        await typeInTerminal([
          '🎉 PARTY MODE ACTIVATED',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '🎉 Starting party mode! 🎉',
          '🎊 Let\'s celebrate coding! 🎊',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        setShowPartyEffect(true);
        setTimeout(() => setShowPartyEffect(false), 5000);
        break;
      case 'help':
        await typeInTerminal([
          '📚 AVAILABLE COMMANDS',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '🔧 BASIC COMMANDS:',
          `   help, clear, about, projects, contact, typing, colors`,
          '',
          '🎮 FUN COMMANDS:',
          `   game, party, matrix, music, coffee, love, rocket, target, trophy`,
          '',
          '📊 STATUS:',
          '   All Commands Unlocked',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        break;
      case 'clear':
        setConsoleHistory([]);
        setConsoleInput('');
        return;
      case 'status':
        await typeInTerminal([
          t('terminal.status.title'),
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          `🎯 ${t('terminal.status.terminalStatus')}`,
          `⭐ ${t('terminal.status.commandsAvailable')}`,
          `🔓 ${t('terminal.status.allCommandsUnlocked')}`,
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        break;
      default:
        await typeInTerminal([
          `❌ ${t('terminal.commandNotFound').replace('{command}', command)}`
        ]);
    }
  };

  const typeInTerminal = async (lines: string[]) => {
    for (let i = 0; i < lines.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Delay between lines
      setConsoleHistory(prev => [...prev, lines[i]]);
    }
  };

  const handleConsoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (consoleInput.trim()) {
      await handleConsoleCommand(consoleInput.trim());
    }
  };

  const generateRandomColor = () => {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16);
    setCurrentColor(color);
    setColorHistory(prev => [color, ...prev.slice(0, 9)]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Game functions
  const showGameRoom = async () => {
    const rooms = {
      entrance: {
        description: 'You are in a dimly lit entrance hall. There\'s a rusty key on the floor.',
        items: ['rusty key'],
        exits: { north: 'library', east: 'kitchen' }
      },
      library: {
        description: 'A dusty library filled with old books. There\'s a mysterious book on the table.',
        items: ['mysterious book'],
        exits: { south: 'entrance', west: 'study' }
      },
      kitchen: {
        description: 'A small kitchen with a pot on the stove. The pot contains a magic potion.',
        items: ['magic potion'],
        exits: { west: 'entrance', north: 'garden' }
      },
      study: {
        description: 'A cozy study with a desk. There\'s a golden key on the desk.',
        items: ['golden key'],
        exits: { east: 'library', north: 'treasure' }
      },
      garden: {
        description: 'A beautiful garden with flowers. There\'s a silver key hidden among the roses.',
        items: ['silver key'],
        exits: { south: 'kitchen' }
      },
      treasure: {
        description: 'A treasure room! But the door is locked with three locks.',
        items: [],
        exits: { south: 'study' }
      }
    };

    const room = rooms[gameRoom as keyof typeof rooms];
    await typeInTerminal([
      `📍 ${gameRoom.toUpperCase()}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      room.description,
      `Items: ${room.items.length > 0 ? room.items.join(', ') : 'none'}`,
      `Exits: ${Object.keys(room.exits).join(', ')}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
    ]);
  };

  const handleGameInput = async (input: string) => {
    const command = input.toLowerCase().trim();
    const parts = command.split(' ');

    switch (parts[0]) {
      case 'look':
        await showGameRoom();
        break;
      
      case 'go':
        if (parts.length < 2) {
          await typeInTerminal(['❌ Please specify a direction: go [north/south/east/west]']);
          return;
        }
        const direction = parts[1];
        const rooms = {
          entrance: { north: 'library', east: 'kitchen' },
          library: { south: 'entrance', west: 'study' },
          kitchen: { west: 'entrance', north: 'garden' },
          study: { east: 'library', north: 'treasure' },
          garden: { south: 'kitchen' },
          treasure: { south: 'study' }
        };
        
        const currentRoom = rooms[gameRoom as keyof typeof rooms];
        if (currentRoom[direction as keyof typeof currentRoom]) {
          setGameRoom(currentRoom[direction as keyof typeof currentRoom]);
          await typeInTerminal([`🚶 Moving ${direction}...`]);
          await showGameRoom();
        } else {
          await typeInTerminal(['❌ You cannot go that way.']);
        }
        break;
      
      case 'take':
        if (parts.length < 2) {
          await typeInTerminal(['❌ Please specify an item: take [item]']);
          return;
        }
        const itemToTake = parts.slice(1).join(' ');
        const roomItems: Record<string, string[]> = {
          entrance: ['rusty key'],
          library: ['mysterious book'],
          kitchen: ['magic potion'],
          study: ['golden key'],
          garden: ['silver key'],
          treasure: []
        };
        
        const currentItems = roomItems[gameRoom];
        if (currentItems.includes(itemToTake)) {
          setGameInventory(prev => [...prev, itemToTake]);
          setGameScore(prev => prev + 10);
          await typeInTerminal([`✅ You picked up the ${itemToTake}! (+10 points)`]);
        } else {
          await typeInTerminal(['❌ That item is not here.']);
        }
        break;
      
      case 'inventory':
        if (gameInventory.length === 0) {
          await typeInTerminal(['📦 Your inventory is empty.']);
        } else {
          await typeInTerminal([`📦 Inventory: ${gameInventory.join(', ')}`]);
        }
        break;
      
      case 'use':
        if (parts.length < 2) {
          await typeInTerminal(['❌ Please specify an item: use [item]']);
          return;
        }
        const itemToUse = parts.slice(1).join(' ');
        
        if (gameRoom === 'treasure' && itemToUse === 'rusty key' && gameInventory.includes('rusty key')) {
          await typeInTerminal([
            '🔓 You used the rusty key!',
            '🎉 First lock opened!'
          ]);
        } else if (gameRoom === 'treasure' && itemToUse === 'golden key' && gameInventory.includes('golden key')) {
          await typeInTerminal([
            '🔓 You used the golden key!',
            '🎉 Second lock opened!'
          ]);
        } else if (gameRoom === 'treasure' && itemToUse === 'silver key' && gameInventory.includes('silver key')) {
          await typeInTerminal([
            '🔓 You used the silver key!',
            '🎉 All locks opened!',
            '🏆 CONGRATULATIONS! You found the treasure!',
            '🎮 Game completed! Final score: ' + (gameScore + 50)
          ]);
          setGameState('idle');
        } else {
          await typeInTerminal(['❌ You cannot use that item here or you don\'t have it.']);
        }
        break;
      
      case 'quit':
        await typeInTerminal([
          '👋 Thanks for playing!',
          `🏆 Final score: ${gameScore}`,
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ]);
        setGameState('idle');
        break;
      
      default:
        await typeInTerminal(['❌ Unknown command. Try: look, go, take, use, inventory, quit']);
        break;
    }
  };

  return (
    <section className="py-16 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interactive Playground
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('playground.description')}
          </p>
        </motion.div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={() => setCurrentMode('terminal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              currentMode === 'terminal' 
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            <Terminal size={20} />
            {t('playground.modes.terminal')}
          </button>
          <button
            onClick={() => setCurrentMode('typing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              currentMode === 'typing' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            <Type size={20} />
            {t('playground.modes.typing')}
          </button>
          <button
            onClick={() => setCurrentMode('colors')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              currentMode === 'colors' 
                ? 'bg-green-600 text-white' 
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            <Palette size={20} />
            {t('playground.modes.colors')}
          </button>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {currentMode === 'terminal' && (
              <div className="max-w-4xl mx-auto">
                {/* Terminal Stats */}
                <div className="bg-slate-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                                      <div className="text-white">
                  <div className="text-sm text-gray-400">Status</div>
                  <div className="text-xl font-bold">Active</div>
                </div>
                                <div className="text-white">
                  <div className="text-sm text-gray-400">Commands</div>
                  <div className="text-xl font-bold">10</div>
                </div>
                    </div>
                    
                  </div>

                </div>

                {/* Terminal Interface */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium">Developer Terminal</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                                      <div className="bg-black rounded p-3 mb-4 h-64 overflow-y-auto font-mono text-sm" ref={terminalRef}>
                      <div className="text-green-400 mb-2">{t('terminal.welcome')}</div>
                      <div className="text-gray-400 mb-2">{t('terminal.helpText')}</div>

                    {consoleHistory.map((line, index) => (
                      <div key={index} className="text-gray-300 mb-1">{line}</div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleConsoleSubmit} className="flex gap-2">
                    <span className="text-green-400 font-mono">$</span>
                    <input
                      type="text"
                      value={consoleInput}
                      onChange={(e) => setConsoleInput(e.target.value)}
                      className="flex-1 bg-transparent text-white outline-none font-mono"
                      placeholder={t('playground.terminal.placeholder')}
                      autoFocus
                    />
                  </form>
                </div>

                {/* Quick Commands */}
                <div className="mt-6">
                  <h4 className="text-white font-medium mb-3">{t('terminal.quickCommands')}</h4>
                  <div className="flex flex-wrap gap-2">
  
                    <button
                      key="projects"
                      onClick={() => handleConsoleCommand('projects')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      {t('playground.terminal.commands.projects')}
                    </button>
                    <button
                      key="about"
                      onClick={() => handleConsoleCommand('about')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      {t('playground.terminal.commands.about')}
                    </button>
                    <button
                      key="contact"
                      onClick={() => handleConsoleCommand('contact')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      {t('playground.terminal.commands.contact')}
                    </button>
                    <button
                      key="typing"
                      onClick={() => handleConsoleCommand('typing')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      typing
                    </button>
                    <button
                      key="colors"
                      onClick={() => handleConsoleCommand('colors')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      colors
                    </button>
                    <button
                      key="game"
                      onClick={() => handleConsoleCommand('game')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      {t('playground.terminal.commands.game')}
                    </button>
                    <button
                      key="matrix"
                      onClick={() => handleConsoleCommand('matrix')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      matrix
                    </button>

                    <button
                      key="music"
                      onClick={() => handleConsoleCommand('music')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      music
                    </button>
                    <button
                      key="coffee"
                      onClick={() => handleConsoleCommand('coffee')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      coffee
                    </button>
                    <button
                      key="love"
                      onClick={() => handleConsoleCommand('love')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      love
                    </button>
                    <button
                      key="rocket"
                      onClick={() => handleConsoleCommand('rocket')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      rocket
                    </button>
                    <button
                      key="target"
                      onClick={() => handleConsoleCommand('target')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      target
                    </button>
                    <button
                      key="trophy"
                      onClick={() => handleConsoleCommand('trophy')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      trophy
                    </button>
                    <button
                      key="party"
                      onClick={() => handleConsoleCommand('party')}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      party
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentMode === 'typing' && (
              <TypingSpeedTest 
                typingStats={typingStats}
                setTypingStats={setTypingStats}
                isTyping={isTyping}
                setIsTyping={setIsTyping}
                texts={typingTexts}
              />
            )}

            {currentMode === 'colors' && (
              <ColorPaletteGenerator 
                currentColor={currentColor}
                setCurrentColor={setCurrentColor}
                colorHistory={colorHistory}
                generateRandomColor={generateRandomColor}
                copyToClipboard={copyToClipboard}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Visual Effects */}
        <MatrixEffect isActive={showMatrix} />
        <CoffeeSteam isActive={showCoffeeSteam} />
        <MusicVisualizer isActive={showMusicVisualizer} />
        <LoveEffect isActive={showLoveEffect} />
        <PartyEffect isActive={showPartyEffect} />

        {/* Rocket Animation */}
        {showRocket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <motion.div
              initial={{ x: -100, y: '100vh' }}
              animate={{ 
                x: '100vw', 
                y: '-100vh',
                rotate: [0, 45, 0]
              }}
              transition={{ 
                duration: 4,
                ease: "easeInOut"
              }}
              className="text-4xl"
            >
              🚀
            </motion.div>
          </motion.div>
        )}

        {/* Target Animation */}
        {showTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1.5, 1, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 3,
                ease: "easeInOut"
              }}
              className="text-8xl"
            >
              🎯
            </motion.div>
          </motion.div>
        )}

        {/* Trophy Animation */}
        {showTrophy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0, y: 100 }}
              animate={{ 
                scale: [0, 1.2, 1],
                y: [100, -50, 0]
              }}
              transition={{ 
                duration: 2,
                ease: "easeOut"
              }}
              className="text-8xl mb-8"
            >
              🏆
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white text-xl font-bold"
            >
              ACHIEVEMENT UNLOCKED!
            </motion.div>
          </motion.div>
        )}

        {/* Easter Egg */}
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-yellow-400 text-black px-6 py-4 rounded-lg font-bold text-xl">
              🎉 Party Mode Activated! 🎉
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
