import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext'; // Import context

const ThemeToggleButton = ({ isDark, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
    aria-label="Toggle Dark Mode"
  >
    <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
      <svg className={`absolute w-5 h-5 transition-all duration-500 ease-in-out ${isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <svg className={`absolute w-5 h-5 transition-all duration-500 ease-in-out ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </div>
  </button>
);

export default function Navbar() {
  // Pull isAdmin from context alongside currentUser
  const { currentUser, isAdmin } = useSiteData(); 
  const [isOpen, setIsOpen] = useState(false);
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleTheme = () => setIsDark(!isDark);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 tracking-tight">
              ByteForge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                {link.name}
              </Link>
            ))}
            
            {/* Admin Link (Dynamic Role Check) */}
            {isAdmin && (
              <Link to="/admin" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">
                Admin
              </Link>
            )}
            
            <div className="flex items-center space-x-4 border-l border-gray-200 dark:border-gray-700 pl-6">
              <ThemeToggleButton isDark={isDark} toggleTheme={toggleTheme} />
              
              {currentUser ? (
                <Link to="/account" className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl font-bold dark:text-white hover:bg-gray-200 transition-all">
                  <span>👤</span> Account
                </Link>
              ) : (
                <>
                  <Link to="/signin" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Sign In</Link>
                  <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-bold transform hover:scale-105 shadow-md transition-all">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggleButton isDark={isDark} toggleTheme={toggleTheme} />
            <button onClick={toggleMenu} className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={closeMenu} className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
              {link.name}
            </Link>
          ))}
          
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-2 space-y-3">
            {currentUser ? (
              <>
                {/* Admin Link (Dynamic Role Check) */}
                {isAdmin && (
                  <Link to="/admin" onClick={closeMenu} className="block w-full text-center px-4 py-3 rounded-lg font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/20">
                    Admin Panel
                  </Link>
                )}
                <Link to="/account" onClick={closeMenu} className="block w-full text-center px-4 py-3 rounded-lg font-bold text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800">
                  Manage Account
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={closeMenu} className="block w-full text-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800">Sign In</Link>
                <Link to="/signup" onClick={closeMenu} className="block w-full text-center px-4 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}