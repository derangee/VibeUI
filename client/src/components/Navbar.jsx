import React from 'react';
import { Sparkles, LogOut, Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-600 h-16">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            VibeUI
          </span>
        </div>
        
        {/* Nav links on right side */}
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white">Docs</a>
          <a href="#" className="text-gray-400 hover:text-white">Support</a>
          <button className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700">
            <Bell size={20} />
          </button>
          <button className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700">
            <User size={20} />
          </button>
          <button className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;