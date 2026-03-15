import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  // Dark mode state
  const [isDark, setIsDark] = useState(false);

  // Toggle the 'dark' class on the HTML element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="flex items-center justify-between p-5 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300 border-b border-gray-200 dark:border-gray-800">
      
      {/* Logo with Gradient text */}
      <Link to="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 hover:from-purple-500 hover:to-blue-600 transition-all">
        ByteForge
      </Link>

      {/* Navigation Links using Flexbox */}
      <div className="flex items-center gap-6 font-medium">
        <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
        <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
        <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
        
        {/* Animated Sign Up Button */}
        <Link to="/signup" className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 hover:shadow-lg">
          Sign Up
        </Link>

        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 ml-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}