'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiInstagram, FiLinkedin, FiMail, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import FeaturedArt from '../components/featured_art';

const navItems = [
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
      {/* Mobile Nav Toggle */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-6 right-6 z-50 p-2 rounded-full bg-gray-900/80 dark:bg-white/80 backdrop-blur-sm text-white dark:text-gray-900 md:hidden"
        aria-label="Open menu"
      >
        <FiMenu className="text-xl" />
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-20 z-50 p-2 rounded-full bg-gray-900/80 dark:bg-white/80 backdrop-blur-sm text-white dark:text-gray-900"
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute top-0 right-0 h-full w-3/4 max-w-sm bg-white dark:bg-gray-900 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 flex justify-end">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
                  aria-label="Close menu"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              <nav className="px-6 py-12">
                <ul className="space-y-8">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-3xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-400/10 blur-3xl animate-float dark:bg-purple-600/10"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-yellow-300/10 blur-3xl animate-float-delay dark:bg-yellow-500/10"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="block">Hi, I&apos;m</span>
                <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Eddy Okao M
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                A visual artist telling stories through color, composition, and texture.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/gallery" className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                  View Gallery
                </Link>
                <Link href="/contact" className="px-8 py-4 border-2 border-black dark:border-white rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                  Get In Touch
                </Link>
              </div>
              <div className="flex gap-6">
                <a href="https://instagram.com/yourartistpage" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 backdrop-blur-sm transition-colors">
                  <FiInstagram className="text-xl" />
                </a>
                <a href="https://www.linkedin.com/in/alvin-nsongambi-609810167/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 backdrop-blur-sm transition-colors">
                  <FiLinkedin className="text-xl" />
                </a>
                <a href="mailto:alvinnsongambi9@gmail.com" className="p-3 rounded-full bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 backdrop-blur-sm transition-colors">
                  <FiMail className="text-xl" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Profile Image */}
          <div className="lg:w-1/2 flex justify-center mt-12 lg:mt-0">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="relative">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-2xl">
                <Image src="/portImage.jpg" alt="Okao" fill className="object-cover" priority />
              </div>
              <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <span className="text-xs font-medium">Painter</span>
              </motion.div>
              <motion.div animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <span className="text-xs font-medium">Mixed Media</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="animate-bounce">
          <span className="block text-sm mb-2">Scroll down</span>
          <div className="w-px h-8 bg-gray-400 mx-auto"></div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 10s ease-in-out infinite 2s;
        }
      `}</style>
    </section>
    <FeaturedArt />
    </>
  );
}
