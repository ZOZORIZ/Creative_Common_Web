'use client';
import Link from 'next/link';
import { useScroll } from './ScrollContext';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const { scrollToForm } = useScroll();
  const pathname = usePathname();
  const router = useRouter();

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
  };

  return (
    <nav className="w-full px-8 py-2 fixed top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        {/* Left - Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="w-[270px] h-[60px] flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.png" 
                alt="CreativeCommon Logo" 
                className="object-cover w-full h-full" 
                draggable="false"
              />
            </div>
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex items-center justify-center space-x-8 text-lg justify-self-center">
          <Link href="/" className="text-gray-600 hover:text-indigo-600 hover:scale-105 transition-colors duration-300">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-indigo-600 hover:scale-105 transition-colors duration-300">
            About
          </Link>
          <Link href="/portfolio" className="text-gray-600 hover:text-indigo-600 hover:scale-105 transition-colors duration-300">
            Portfolio
          </Link>
        </div>

        {/* Right - Request Button */}
        <div className="justify-self-end">
          <button 
            onClick={handleRequestClick}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Request Form
          </button>
        </div>
      </div>
    </nav>
  );
}
