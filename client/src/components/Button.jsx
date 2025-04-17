import React from 'react';
import { Loader } from 'lucide-react';

// Button variants
const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  success: "bg-green-600 hover:bg-green-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  outline: "bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-800",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-800"
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
  const baseClasses = "font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors";
  
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

// Button Group component for grouping related buttons
const ButtonGroup = ({ children, vertical = false, className = "", ...props }) => {
  const groupClasses = `inline-flex ${vertical ? 'flex-col' : 'flex-row'} ${className}`;
  
  return (
    <div className={groupClasses} {...props}>
      {React.Children.map(children, (child, index) => {
        // Skip non-Button children
        if (!React.isValidElement(child)) return child;
        
        let additionalProps = {};
        
        // Adjust border radius for horizontal button groups
        if (!vertical) {
          if (index === 0) {
            additionalProps.className = "rounded-r-none";
          } else if (index === React.Children.count(children) - 1) {
            additionalProps.className = "rounded-l-none";
          } else {
            additionalProps.className = "rounded-none";
          }
        } 
        // Adjust border radius for vertical button groups
        else {
          if (index === 0) {
            additionalProps.className = "rounded-b-none";
          } else if (index === React.Children.count(children) - 1) {
            additionalProps.className = "rounded-t-none";
          } else {
            additionalProps.className = "rounded-none";
          }
        }
        
        return React.cloneElement(child, additionalProps);
      })}
    </div>
  );
};

// Demonstration component showing all button variants
const ButtonDemo = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Button with Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>}
            >
              Left Icon
            </Button>
            <Button 
              icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>}
              iconPosition="right"
            >
              Right Icon
            </Button>
          </div>
        </section>
        
    </div>
  );
};

export default ButtonDemo;