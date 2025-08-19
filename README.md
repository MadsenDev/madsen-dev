# Madsen Development Portfolio

A modern, interactive portfolio website showcasing Christoffer Madsen's work as a full-stack developer. Built with Next.js, TypeScript, and Tailwind CSS, featuring smooth animations, an interactive terminal, and multi-language support.

## 🌟 Features

### **Interactive Experience**
- **Animated Hero Section** with typewriter effect and gradient backgrounds
- **Interactive Terminal** with fun commands and a text-based adventure game
- **Smooth Animations** powered by Framer Motion
- **Command Palette** for keyboard navigation
- **Responsive Design** that works on all devices

### **Multi-Language Support**
- **5 Languages**: English, Norwegian, Spanish, French, German
- **URL Parameters**: Shareable links with language preference (`?lang=no`)
- **SEO Optimized**: Hreflang tags and language-specific metadata
- **Automatic Detection**: Browser language detection with fallbacks

### **Professional Sections**
- **About Me**: Interactive timeline and skills showcase
- **Projects**: Animated project cards with technology stacks
- **Playground**: Interactive terminal, typing test, and color generator
- **Contact**: Professional contact information and social links

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.4.6** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 3.4.1** - Utility-first styling
- **Framer Motion 12.23.12** - Declarative animations
- **Lucide React** - Beautiful SVG icons

### **Development Tools**
- **PostCSS** - CSS processing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MadsenDev/madsen-dev.git
   cd madsens-dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── test-lang/         # Language testing page
├── components/            # React components
│   ├── Hero.tsx           # Hero section
│   ├── SiteHeader.tsx     # Navigation header
│   ├── SiteFooter.tsx     # Footer
│   ├── ProjectCard.tsx    # Project display
│   ├── CommandPalette.tsx # Keyboard navigation
│   ├── LanguageSwitcher.tsx # Language selector
│   └── ...                # Other components
├── contexts/              # React contexts
│   └── LanguageContext.tsx # Language management
├── lib/                   # Utilities and configurations
│   ├── translations/      # Multi-language support
│   │   ├── index.ts       # Translation interface
│   │   ├── en.ts          # English translations
│   │   ├── no.ts          # Norwegian translations
│   │   ├── es.ts          # Spanish translations
│   │   ├── fr.ts          # French translations
│   │   └── de.ts          # German translations
│   └── utils/             # Utility functions
│       └── language.ts    # Language utilities
└── data/                  # Static data
    └── projects.ts        # Project information
```

## 🌍 Language Support

The portfolio supports 5 languages with the following URL structure:

- **English (default)**: `https://madsens.dev`
- **Norwegian**: `https://madsens.dev?lang=no`
- **Spanish**: `https://madsens.dev?lang=es`
- **French**: `https://madsens.dev?lang=fr`
- **German**: `https://madsens.dev?lang=de`

### Language Detection Priority
1. URL parameter (`?lang=`)
2. LocalStorage preference
3. Browser language
4. English (fallback)

## 🎮 Interactive Features

### Terminal Commands
- `about` - Learn about the developer
- `projects` - View project information
- `contact` - Get contact details
- `game` - Play a text adventure
- `matrix` - Matrix-style effect
- `status` - Terminal status
- And many more!

### Playground Modes
- **Terminal**: Interactive command line
- **Typing Test**: Speed typing challenge
- **Color Generator**: Generate color palettes

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop**: Full interactive experience
- **Tablet**: Adapted layouts and touch interactions
- **Mobile**: Optimized navigation and touch-friendly controls

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Custom domain configuration available

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing Language Features
Visit `/test-lang` to test the language switching functionality and URL parameters.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Website**: [madsens.dev](https://madsens.dev)
- **Email**: chris@madsens.dev
- **GitHub**: [@MadsenDev](https://github.com/MadsenDev)
- **LinkedIn**: [madsendev](https://www.linkedin.com/in/madsendev/)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
