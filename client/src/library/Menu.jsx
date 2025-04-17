import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Menu = ({ variant = 'primary', disabled = false }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    if (!disabled) {
      setOpen(!open);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const variants = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'border border-purple-600 text-purple-600 bg-transparent hover:bg-purple-600 hover:text-white',
    ghost: 'text-purple-600 hover:bg-purple-100',
    disabled: 'bg-gray-500 text-gray-300 cursor-not-allowed',
  };

  const buttonClasses = `px-4 py-2 rounded flex items-center gap-2 transition-all ${
    disabled ? variants.disabled : variants[variant]
  }`;

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button onClick={toggleMenu} className={buttonClasses} disabled={disabled}>
        Menu <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50"
        >
          <ul className="py-2 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
