'use client';
import Link from 'next/link';
import { useScroll } from './ScrollContext';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { scrollToForm } = useScroll();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRequestClick = () => {
    if (pathname === '/') {
      // If we're on the home page, just scroll to form
      const formSection = document.getElementById('form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home with scroll parameter
      router.push('/?scroll=form');
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className="w-full px-4 sm:px-8 py-2 fixed top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="w-[200px] sm:w-[270px] h-[50px] sm:h-[60px] flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.png" 
                alt="CreativeCommon Logo" 
                className="object-cover w-full h-full" 
                draggable="false"
              />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex items-center justify-start flex-1 ml-60">
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-lg hover:text-indigo-600 hover:scale-105 transition-colors duration-300 ${
                pathname === '/' 
                  ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' 
                  : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-lg hover:text-indigo-600 hover:scale-105 transition-colors duration-300 ${
                pathname === '/about' 
                  ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' 
                  : 'text-gray-600'
              }`}
            >
              About
            </Link>
            <Link 
              href="/portfolio" 
              className={`text-lg hover:text-indigo-600 hover:scale-105 transition-colors duration-300 ${
                pathname === '/portfolio' 
                  ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' 
                  : 'text-gray-600'
              }`}
            >
              Portfolio
            </Link>
          </div>
        </div>

        {/* Desktop Request Form Button */}
        <div className="hidden md:block">
          <button 
            onClick={handleRequestClick}
            className="px-6 py-2 bg-gradient-to-r text-lg from-indigo-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Request Form
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg md:hidden">
            <div className="flex flex-col items-center p-6 space-y-6">
              <Link 
                href="/" 
                className={`text-xl font-medium transition-colors duration-300 ${
                  pathname === '/' 
                    ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`text-xl font-medium transition-colors duration-300 ${
                  pathname === '/about' 
                    ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/portfolio" 
                className={`text-xl font-medium transition-colors duration-300 ${
                  pathname === '/portfolio' 
                    ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <button 
                onClick={handleRequestClick}
                className="w-48 px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-medium"
              >
                Request Form
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
