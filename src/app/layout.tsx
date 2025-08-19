import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Christoffer Madsen - Full-Stack Developer & Problem Solver",
  description: "Full-stack developer specializing in React, Next.js, and modern web technologies. From tech support at Elkjøp to building applications at Gravstellerne, now freelancing to create custom solutions.",
  keywords: [
    "Christoffer Madsen",
    "full-stack developer", 
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "web development",
    "freelance developer",
    "Norway developer",
    "Elkjøp",
    "Gravstellerne"
  ],
  authors: [{ name: "Christoffer Madsen" }],
  creator: "Christoffer Madsen",
  openGraph: {
    title: "Christoffer Madsen - Full-Stack Developer",
    description: "Full-stack developer specializing in React, Next.js, and modern web technologies. Creating custom solutions and tools.",
    type: "website",
    url: "https://madsens.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christoffer Madsen - Full-Stack Developer",
    description: "Full-stack developer specializing in React, Next.js, and modern web technologies.",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Hreflang tags for language alternatives */}
        <link rel="alternate" hrefLang="en-US" href="https://madsens.dev" />
        <link rel="alternate" hrefLang="nb-NO" href="https://madsens.dev?lang=no" />
        <link rel="alternate" hrefLang="es-ES" href="https://madsens.dev?lang=es" />
        <link rel="alternate" hrefLang="fr-FR" href="https://madsens.dev?lang=fr" />
        <link rel="alternate" hrefLang="de-DE" href="https://madsens.dev?lang=de" />
        <link rel="alternate" hrefLang="x-default" href="https://madsens.dev" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent scroll restoration and force top position
              if (history.scrollRestoration) {
                history.scrollRestoration = 'manual';
              }
              
              // Clear any hash from URL to prevent anchor scrolling
              if (window.location.hash) {
                history.replaceState(null, null, window.location.pathname + window.location.search);
              }
              
              // Force scroll to top immediately
              window.scrollTo(0, 0);
              
              // Prevent any automatic scrolling on load
              window.addEventListener('load', () => {
                window.scrollTo(0, 0);
              });
              
              // Prevent any automatic scrolling on DOMContentLoaded
              document.addEventListener('DOMContentLoaded', () => {
                window.scrollTo(0, 0);
              });
              
              // Also force scroll to top after a short delay to catch any late scrolls
              setTimeout(() => {
                window.scrollTo(0, 0);
              }, 50);
              
              setTimeout(() => {
                window.scrollTo(0, 0);
              }, 200);
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Immediate loading screen - shows before React loads */
              #initial-loading {
                position: fixed;
                inset: 0;
                z-index: 9999;
                background: linear-gradient(135deg, #0a0a0a 0%, #1e1b4b 50%, #0a0a0a 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 1;
                transition: opacity 0.8s ease;
                overflow: hidden;
              }
              
              #initial-loading.hidden {
                opacity: 0;
                pointer-events: none;
              }
              
              /* Floating particles */
              #initial-loading::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 50% 50%, rgba(147,51,234,0.1), transparent 60%);
                animation: radialPulse 4s ease-in-out infinite;
              }
              
              .loading-content {
                text-align: center;
                position: relative;
                z-index: 10;
              }
              
              .loading-logo {
                width: 5rem;
                height: 5rem;
                margin: 0 auto 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: logoScale 0.8s ease-out;
                position: relative;
              }
              
              .loading-logo::before {
                content: '';
                position: absolute;
                inset: -1rem;
                background: radial-gradient(circle, rgba(147,51,234,0.2), transparent 70%);
                border-radius: 50%;
                animation: glowPulse 3s ease-in-out infinite;
              }
              
              .loading-logo img {
                animation: logoRock 4s ease-in-out infinite;
              }
              
              .loading-title {
                font-size: 1.75rem;
                font-weight: bold;
                background: linear-gradient(45deg, #ffffff, #e0e7ff, #f3e8ff, #ffffff);
                background-size: 300% 300%;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 2rem;
                animation: gradientFlow 3s ease-in-out infinite;
              }
              
              .loading-dots {
                display: flex;
                justify-content: center;
                gap: 0.75rem;
                margin-bottom: 1.5rem;
              }
              
              .loading-dot {
                width: 1rem;
                height: 1rem;
                background: linear-gradient(45deg, #a855f7, #ec4899);
                border-radius: 50%;
                animation: dotBounce 1.5s ease-in-out infinite;
                box-shadow: 0 0 10px rgba(168,85,247,0.5);
              }
              
              .loading-dot:nth-child(2) {
                animation-delay: 0.3s;
              }
              
              .loading-dot:nth-child(3) {
                animation-delay: 0.6s;
              }
              
              .loading-text {
                color: #d1d5db;
                font-size: 1rem;
                font-weight: 500;
                margin-bottom: 1.5rem;
                animation: textFade 0.6s ease 0.3s both;
              }
              
              .loading-progress {
                width: 200px;
                height: 4px;
                background: rgba(255,255,255,0.1);
                border-radius: 2px;
                margin: 0 auto;
                overflow: hidden;
                position: relative;
              }
              
              .loading-progress::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 0%;
                background: linear-gradient(90deg, #a855f7, #ec4899);
                border-radius: 2px;
                animation: progressFill 2s ease-in-out forwards;
                box-shadow: 0 0 10px rgba(168,85,247,0.5);
              }
              
              @keyframes logoScale {
                from {
                  transform: scale(0.8);
                  opacity: 0;
                }
                to {
                  transform: scale(1);
                  opacity: 1;
                }
              }
              
              @keyframes logoRock {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(2deg); }
                75% { transform: rotate(-2deg); }
              }
              
              @keyframes glowPulse {
                0%, 100% { opacity: 0.2; transform: scale(1); }
                50% { opacity: 0.4; transform: scale(1.1); }
              }
              
              @keyframes gradientFlow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
              
              @keyframes dotBounce {
                0%, 100% {
                  transform: scale(0) translateY(20px);
                  opacity: 0;
                }
                50% {
                  transform: scale(1.2) translateY(-10px);
                  opacity: 1;
                }
              }
              
              @keyframes textFade {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              @keyframes progressFill {
                from { width: 0%; }
                to { width: 100%; }
              }
              
              @keyframes radialPulse {
                0%, 100% { opacity: 0.1; transform: scale(1); }
                50% { opacity: 0.2; transform: scale(1.3); }
              }
            `,
          }}
        />
      </head>
      <body
        className="antialiased bg-slate-950 text-white"
      >
        {/* Immediate loading screen */}
        <div id="initial-loading">
          <div className="loading-content">
            <div className="loading-logo">
              <img 
                src="/images/logo.svg" 
                alt="Madsen Development Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
                         <div className="loading-title">Madsen Development</div>
             <div className="loading-dots">
               <div className="loading-dot"></div>
               <div className="loading-dot"></div>
               <div className="loading-dot"></div>
             </div>
             <div className="loading-text" id="loading-text">Loading...</div>
            <div className="loading-progress"></div>
          </div>
        </div>

                  <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>}>
            <LanguageProvider>
              <SiteHeader />
              <main>
                {children}
              </main>
              <SiteFooter />
            </LanguageProvider>
          </Suspense>

                 <script
           dangerouslySetInnerHTML={{
             __html: `
                         // Update loading text based on language preference
          const userLang = navigator.language;
          const loadingText = document.getElementById('loading-text');
          if (loadingText) {
            if (userLang.startsWith('no')) {
              loadingText.textContent = 'Laster...';
            } else if (userLang.startsWith('es')) {
              loadingText.textContent = 'Cargando...';
            } else if (userLang.startsWith('fr')) {
              loadingText.textContent = 'Chargement...';
            } else if (userLang.startsWith('de')) {
              loadingText.textContent = 'Laden...';
            } else {
              loadingText.textContent = 'Loading...';
            }
          }
               
               // Hide the initial loading screen after React loads
               window.addEventListener('load', () => {
                 setTimeout(() => {
                   const loading = document.getElementById('initial-loading');
                   if (loading) {
                     loading.classList.add('hidden');
                     setTimeout(() => {
                       loading.remove();
                     }, 500);
                   }
                 }, 1500);
               });
             `,
           }}
         />
      </body>
    </html>
  );
}
