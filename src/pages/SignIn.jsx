import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In Data:', formData);
    // Add real authentication logic here later
  };

  return (
    <div className="flex items-center justify-center min-h-[75vh] animate-fade-in-down px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 md:p-10">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-gray-700 text-3xl mb-4 shadow-inner">
            👋
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to access your ByteForge dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="ada@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
              <a href="#" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</a>
            </div>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-3 px-6 mt-4 text-white font-bold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02] shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Navigation Link to Sign Up */}
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-blue-600 dark:text-blue-400 hover:underline transition-all">
            Sign up
          </Link>
        </p>
        
      </div>
    </div>
  );
}