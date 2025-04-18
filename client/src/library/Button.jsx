import React from 'react';
import { Loader } from 'lucide-react';

// Button variants
const variants = {
  primary: "bg-purple-600 hover:bg-purple-700 text-white",
  secondary: "bg-gray-700 hover:bg-gray-600 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  outline: "bg-transparent border border-gray-600 hover:bg-gray-700 text-white",
  ghost: "bg-transparent hover:bg-gray-700 text-gray-400 hover:text-white"
};

// Button sizes
const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg"
};

// Button component
const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  iconPosition = "left",
  className = "",
  ...props 
}) => {
  // Base classes applied to all buttons
  const baseClasses = "font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors";
  
  // Classes for the specific variant
  const variantClasses = variants[variant] || variants.primary;
  
  // Classes for the specific size
  const sizeClasses = sizes[size] || sizes.md;
  
  // Disabled state classes
  const disabledClasses = disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  // Full width class
  const widthClass = fullWidth ? "w-full" : "";
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${widthClass} ${className}`;
  
  return (
    <button 
      className={buttonClasses} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-flex items-center">
          <Loader className="animate-spin w-4 h-4" />
        </span>
      )}
      
      {icon && iconPosition === "left" && !loading && (
        <span className="mr-2 inline-flex items-center">
          {icon}
        </span>
      )}
      
      {children}
      
      {icon && iconPosition === "right" && (
        <span className="ml-2 inline-flex items-center">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;

//demo button
const DemoButton = () => {
  return (
    <Button 
      variant="primary" 
      size="md" 
      loading={false} 
      fullWidth={false} 
      icon={<Loader />} 
      iconPosition="left"
    >
      Primary Button
    </Button>
  );
}

export { DemoButton };


const ButtonSource  = `
import React from 'react';
import { Loader } from 'lucide-react';

// Button variants
const variants = {
  primary: "bg-purple-600 hover:bg-purple-700 text-white",
  secondary: "bg-gray-700 hover:bg-gray-600 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  outline: "bg-transparent border border-gray-600 hover:bg-gray-700 text-white",
  ghost: "bg-transparent hover:bg-gray-700 text-gray-400 hover:text-white"
};

// Button sizes
const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg"
};

// Button component
const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  iconPosition = "left",
  className = "",
  ...props 
}) => {
  // Base classes applied to all buttons
  const baseClasses = "font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors";
  
  // Classes for the specific variant
  const variantClasses = variants[variant] || variants.primary;
  
  // Classes for the specific size
  const sizeClasses = sizes[size] || sizes.md;
  
  // Disabled state classes
  const disabledClasses = disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  // Full width class
  const widthClass = fullWidth ? "w-full" : "";
  
  // Combine all classes
  const buttonClasses = {baseClasses} {variantClasses} {sizeClasses} {disabledClasses} {widthClass} {className};
  
  return (
    <button 
      className={buttonClasses} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-flex items-center">
          <Loader className="animate-spin w-4 h-4" />
        </span>
      )}
      
      {icon && iconPosition === "left" && !loading && (
        <span className="mr-2 inline-flex items-center">
          {icon}
        </span>
      )}
      
      {children}
      
      {icon && iconPosition === "right" && (
        <span className="ml-2 inline-flex items-center">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;

const DemoButton = () => {
  return (
    <Button 
      variant="primary" 
      size="md" 
      loading={false} 
      fullWidth={false} 
      icon={<Loader />} 
      iconPosition="left"
    >
      Primary Button
    </Button>
  );
}

export { DemoButton };
`;

const ButtonPreview = `<button>  Primary Button  </button>`;

export { ButtonSource, ButtonPreview };