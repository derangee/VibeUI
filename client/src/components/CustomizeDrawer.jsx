import React from 'react';
import Button from '../library/Button';
import Drawer from './Drawer';

/**
 * Customization drawer specifically for button component
 */
const CustomizeDrawer = ({ isOpen, onClose, title, onApply }) => {
  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose}
      title={`Customize ${title}`}
      footer={
        <Button fullWidth onClick={onApply || onClose}>
          Apply Customization
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Variant Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">Variant</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-gray-800 border border-purple-500 text-white px-3 py-2 rounded-md text-sm">
              Primary
            </button>
            <button className="bg-gray-800 hover:border-purple-500 border border-transparent text-gray-400 px-3 py-2 rounded-md text-sm">
              Secondary
            </button>
            <button className="bg-gray-800 hover:border-purple-500 border border-transparent text-gray-400 px-3 py-2 rounded-md text-sm">
              Outline
            </button>
            <button className="bg-gray-800 hover:border-purple-500 border border-transparent text-gray-400 px-3 py-2 rounded-md text-sm">
              Ghost
            </button>
          </div>
        </div>
        
        {/* Size Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">Size</h3>
          <div className="flex gap-2">
            <button className="bg-gray-800 hover:border-purple-500 border border-transparent text-gray-400 px-3 py-2 rounded-md text-sm">
              Small
            </button>
            <button className="bg-gray-800 border border-purple-500 text-white px-3 py-2 rounded-md text-sm">
              Medium
            </button>
            <button className="bg-gray-800 hover:border-purple-500 border border-transparent text-gray-400 px-3 py-2 rounded-md text-sm">
              Large
            </button>
          </div>
        </div>
        
        {/* Color Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">Color</h3>
          <div className="grid grid-cols-5 gap-2">
            <button className="h-8 w-8 rounded-full bg-purple-600 border-2 border-white"></button>
            <button className="h-8 w-8 rounded-full bg-blue-600 hover:border-2 border-transparent"></button>
            <button className="h-8 w-8 rounded-full bg-green-600 hover:border-2 border-transparent"></button>
            <button className="h-8 w-8 rounded-full bg-red-600 hover:border-2 border-transparent"></button>
            <button className="h-8 w-8 rounded-full bg-yellow-500 hover:border-2 border-transparent"></button>
          </div>
        </div>
        
        {/* Icon Options */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">Icon</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Show Icon</span>
              <button className="w-10 h-5 bg-purple-600 rounded-full relative">
                <span className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Icon Position</span>
              <div className="flex gap-1">
                <button className="bg-purple-600 text-white px-2 py-1 text-xs rounded-l-md">Left</button>
                <button className="bg-gray-800 text-gray-400 px-2 py-1 text-xs rounded-r-md">Right</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Options */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">Options</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Full Width</span>
              <button className="w-10 h-5 bg-gray-700 rounded-full relative">
                <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Disabled</span>
              <button className="w-10 h-5 bg-gray-700 rounded-full relative">
                <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Loading</span>
              <button className="w-10 h-5 bg-gray-700 rounded-full relative">
                <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CustomizeDrawer;