import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false);

  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          
          
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 tracking-tight">
              ByteForge
            </span>
          </Link>

          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            
            <div className="flex items-center space-x-4 border-l border-gray-200 dark:border-gray-700 pl-6">
              <Link to="/signin" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 shadow-md">
                Sign Up
              </Link>
            </div>
          </div>

          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>


      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={closeMenu} 
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-2 space-y-3">
            <Link 
              to="/signin" 
              onClick={closeMenu} 
              className="block w-full text-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              onClick={closeMenu} 
              className="block w-full text-center px-4 py-3 rounded-lg text-base font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}