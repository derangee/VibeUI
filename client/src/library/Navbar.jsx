import React from 'react';

// Navbar variants
const variants = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-gray-700 text-white",
  transparent: "bg-transparent text-gray-700",
};

// Navbar sizes
const sizes = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6",
  lg: "py-4 px-8 text-lg",
};

// Navbar component
const Navbar = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  logo = null,
  logoPosition = "left",
  ...props
}) => {
  // Base classes applied to all navbars
  const baseClasses = "flex items-center justify-between font-medium rounded transition-colors";
  
  // Classes for the specific variant
  const variantClasses = variants[variant] || variants.primary;
  
  // Classes for the specific size
  const sizeClasses = sizes[size] || sizes.md;
  
  // Full width class
  const widthClass = fullWidth ? "w-full" : "";
  
  // Combine all classes
  const navbarClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`;

  return (
    <nav className={navbarClasses} {...props}>
      {/* Logo Section */}
      {logo && logoPosition === "left" && (
        <div className="flex-shrink-0">
          {logo}
        </div>
      )}

      <div className="flex-1 flex justify-center space-x-4">
        {children}
      </div>

      {/* Logo on the right */}
      {logo && logoPosition === "right" && (
        <div className="flex-shrink-0">
          {logo}
        </div>
      )}
    </nav>
  );
};

const DummyNavbar = () => {
  return (
    <Navbar variant="primary" size="md" fullWidth logo={<span className="text-xl font-bold">MyLogo</span>} logoPosition="left">
      <a href="#home" className="text-white hover:text-purple-300">Home</a>
      <a href="#about" className="text-white hover:text-purple-300">About</a>
      <a href="#services" className="text-white hover:text-purple-300">Services</a>
      <a href="#contact" className="text-white hover:text-purple-300">Contact</a>
    </Navbar>
  );
};

export default DummyNavbar;
