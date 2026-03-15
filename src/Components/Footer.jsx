// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 mt-auto">
      <div className="container mx-auto px-4 py-10 md:px-8 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div>
            <h4 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-4">ByteForge Tech</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Empowering creators with top-tier gear.</p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Laptops</Link></li>
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Accessories</Link></li>
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Monitors</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Support</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-sm">
              <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Shipping Info</Link></li>
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Returns</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-500 dark:text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="text-gray-400 text-sm text-center pt-8 border-t border-gray-100 dark:border-gray-800">
          © {new Date().getFullYear()} ByteForge Tech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}