import React, { useEffect } from 'react';
import { LogOut, Sparkles } from 'lucide-react'; // Import Sparkles icon
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../utils/firebase';

const Navbar = () => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  useEffect(() => {
    console.log('Current User:', user); // Debugging: Check if user is retrieved
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      // Optionally redirect to login page
      window.location.href = '/auth'; // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-600 h-16">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Logo Section */}
        <div className="flex items-center gap-2 ml-7">
          <div className="bg-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
            <Sparkles size={20} className="text-white" /> {/* Sparkles icon */}
          </div>
          <span className="text-xl font-bold text-white">VibeUI</span>
        </div>

        {/* Profile Photo and Logout */}
        <div className="flex items-center space-x-4">
          {user && user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-600"
            />
          ) : (
            <img
              src="https://via.placeholder.com/40"
              alt="Default Avatar"
              className="w-10 h-10 rounded-full border border-gray-600"
            />
          )}
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;