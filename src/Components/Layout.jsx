// src/components/Layout.jsx
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      {/* Container for page content */}
      <main className="container mx-auto p-4 md:p-8">
        {children}
      </main>
      <Footer/>
    </div>
  );
}