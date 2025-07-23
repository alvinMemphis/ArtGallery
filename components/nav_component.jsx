'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

export function Nav({ search = '', handleNavSearch = () => {} }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          Alvin Art
        </Link>
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)} aria-label="Open Menu">
            <FiMenu className="text-2xl" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50">
          <div className="absolute top-0 right-0 w-3/4 max-w-sm h-full bg-white dark:bg-gray-900 shadow-lg p-6">
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)} aria-label="Close Menu">
                <FiX className="text-2xl" />
              </button>
            </div>
            <ul className="mt-8 space-y-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xl font-medium text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
