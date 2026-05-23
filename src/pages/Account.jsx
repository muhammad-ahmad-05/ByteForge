import { useState } from 'react';
import { useSiteData } from '../context/SiteContext';
import { auth } from '../firebase';
import { sendPasswordResetEmail, deleteUser, signOut } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Account() {
  const { currentUser } = useSiteData();
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  if (!currentUser) return <Navigate to="/signin" />;

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/signin');
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, currentUser.email);
      setMessage({ type: 'success', text: 'Password reset email sent!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("WARNING: This will permanently delete your account. Are you sure?")) {
      try {
        await deleteUser(currentUser);
        navigate('/signup');
      } catch (err) {
        setMessage({ type: 'error', text: "For security, please log out and log back in before deleting your account." });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl border-4 border-white dark:border-gray-800 flex items-center justify-center text-4xl shadow-lg">
              {currentUser.photoURL ? <img src={currentUser.photoURL} className="rounded-xl" /> : '👤'}
            </div>
          </div>

          <h1 className="text-2xl font-black dark:text-white">{currentUser.displayName || 'User Account'}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">{currentUser.email}</p>

          {message.text && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div>
                <p className="font-bold dark:text-white">Security</p>
                <p className="text-sm text-gray-500">Update your password via email</p>
              </div>
              <button onClick={handleResetPassword} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 dark:text-white transition-colors">
                Reset Password
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleSignOut}
                className="flex-1 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                Sign Out
              </button>
              <button 
                onClick={handleDeleteAccount}
                className="px-6 py-3 border border-red-200 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}