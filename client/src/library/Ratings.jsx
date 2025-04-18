import React, { useState } from "react";

// Rating variants
const variants = {
  primary: "text-purple-600",  // Primary variant color
  secondary: "text-gray-700",  // Secondary variant color
  success: "text-green-600",   // Success variant color
  danger: "text-red-600",      // Danger variant color
  warning: "text-yellow-500",  // Warning variant color
};

// Rating sizes
const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

// Star component
const Star = ({ filled, size, variant, onClick }) => {
  const baseClasses = "inline-block cursor-pointer";
  const sizeClasses = sizes[size] || sizes.md;
  const variantClasses = variants[variant] || variants.primary;
  const starClasses = `${baseClasses} ${sizeClasses} ${variantClasses}`;

  return (
    <span className={starClasses} onClick={onClick}>
      {filled ? "★" : "☆"}
    </span>
  );
};

// Ratings component
const Ratings = ({
  value = 0,
  max = 5,
  variant = "primary",
  size = "md",
  onChange = () => {},
  className = "",
  ...props
}) => {
  const stars = Array.from({ length: max }, (_, i) => i < value);

  return (
    <div className={`flex space-x-1 ${className}`} {...props}>
      {stars.map((filled, i) => (
        <Star
          key={i}
          filled={filled}
          size={size}
          variant={variant}
          onClick={() => onChange(i + 1)} // Update the rating when a star is clicked
        />
      ))}
    </div>
  );
};

export default Ratings;

// Ratings Demo Component
const RatingsDemo = () => {

  return ( <Ratings value={4} variant="primary" /> );
};

export { RatingsDemo };

const RatingsSource = `
import React, { useState } from "react";

// Rating variants
const variants = {
  primary: "text-purple-600",  // Primary variant color
  secondary: "text-gray-700",  // Secondary variant color
  success: "text-green-600",   // Success variant color
  danger: "text-red-600",      // Danger variant color
  warning: "text-yellow-500",  // Warning variant color
};

// Rating sizes
const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

// Star component
const Star = ({ filled, size, variant, onClick }) => {
  const baseClasses = "inline-block cursor-pointer";
  const sizeClasses = sizes[size] || sizes.md;
  const variantClasses = variants[variant] || variants.primary;
  const starClasses = \`\${baseClasses} \${sizeClasses} \${variantClasses}\`;

  return (
    <span className={starClasses} onClick={onClick}>
      {filled ? "★" : "☆"}
    </span>
  );
};

// Ratings component
const Ratings = ({
  value = 0,
  max = 5,
  variant = "primary",
  size = "md",
  onChange = () => {},
  className = "",
  ...props
}) => {
  const stars = Array.from({ length: max }, (_, i) => i < value);

  return (
    <div className={\`flex space-x-1 \${className}\`} {...props}>
      {stars.map((filled, i) => (
        <Star
          key={i}
          filled={filled}
          size={size}
          variant={variant}
          onClick={() => onChange(i + 1)} // Update the rating when a star is clicked
        />
      ))}
    </div>
  );
};

export default Ratings;

const RatingsDemo = () => {

  return ( <Ratings value={4} variant="primary" /> );
};

export { RatingsDemo };
`;

const RatingsPreview = ` <Ratings value={4}" /> `;

export { RatingsSource, RatingsPreview };