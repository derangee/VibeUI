import React from 'react';
import { X } from 'lucide-react';

// Add CSS animation if not already present
const injectAnimation = () => {
  if (!document.getElementById('drawer-animation')) {
    const style = document.createElement('style');
    style.id = 'drawer-animation';
    style.textContent = `
      @keyframes slide-in-right {
        from {
          transform: translateX(100%);
        }
        to {
          transform: translateX(0);
        }
      }
      
      @keyframes slide-in-left {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }
      
      @keyframes slide-in-top {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
      }
      
      @keyframes slide-in-bottom {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      
      .animate-slide-in-right {
        animation: slide-in-right 0.3s ease-out forwards;
      }
      
      .animate-slide-in-left {
        animation: slide-in-left 0.3s ease-out forwards;
      }
      
      .animate-slide-in-top {
        animation: slide-in-top 0.3s ease-out forwards;
      }
      
      .animate-slide-in-bottom {
        animation: slide-in-bottom 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
  }
};

/**
 * Drawer component that slides in from the right side of the screen
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the drawer is open
 * @param {function} props.onClose - Function to call when drawer is closed
 * @param {string} props.title - Title to display in the drawer header
 * @param {React.ReactNode} props.children - Content to display in the drawer
 * @param {string} props.position - Position of the drawer (right, left, top, bottom)
 * @param {string} props.width - Width of the drawer (for right/left positioned drawers)
 */
const Drawer = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = 'right',
  width = 'max-w-md',
  hideCloseButton = false,
  className = '',
  footer = null
}) => {
  // Inject animation styles
  React.useEffect(() => {
    injectAnimation();
  }, []);

  if (!isOpen) return null;

  const positions = {
    right: 'flex justify-end',
    left: 'flex justify-start',
    top: 'flex items-start',
    bottom: 'flex items-end',
  };

  const drawerStyles = {
    right: `bg-gray-900 border-l border-gray-700 h-full ${width} flex flex-col animate-slide-in-right`,
    left: `bg-gray-900 border-r border-gray-700 h-full ${width} flex flex-col animate-slide-in-left`,
    top: `bg-gray-900 border-b border-gray-700 w-full max-h-[80vh] flex flex-col animate-slide-in-top`,
    bottom: `bg-gray-900 border-t border-gray-700 w-full max-h-[80vh] flex flex-col animate-slide-in-bottom`,
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Drawer container */}
      <div className={`fixed inset-0 pointer-events-none ${positions[position]}`}>
        <div className={`pointer-events-auto ${drawerStyles[position]} ${className}`}>
          {/* Header */}
          {(title || !hideCloseButton) && (
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              {title && <h2 className="text-lg font-medium text-white">{title}</h2>}
              
              {!hideCloseButton && (
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 ml-auto"
                  aria-label="Close drawer"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="p-4 border-t border-gray-700">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;