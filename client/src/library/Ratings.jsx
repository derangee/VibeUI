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

// Ratings Demo Component
const RatingsDemo = () => {
  const [rating1, setRating1] = useState(4);
  const [rating2, setRating2] = useState(3);
  const [rating3, setRating3] = useState(5);

  return (
    <div className="p-8 bg-gray-900 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-white mb-8">Interactive Ratings Component Library</h1>

      {/* Interactive Ratings */}
      <section>
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Interactive Ratings</h2>
        <div className="space-y-4">
          <Ratings value={rating1} onChange={setRating1} variant="primary" />
          <Ratings value={rating2} onChange={setRating2} variant="success" />
          <Ratings value={rating3} onChange={setRating3} variant="warning" />
        </div>
      </section>

      {/* Ratings Sizes */}
      <section>
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Interactive Ratings with Sizes</h2>
        <div className="space-y-4">
          <Ratings value={rating1} onChange={setRating1} size="sm" />
          <Ratings value={rating2} onChange={setRating2} size="md" />
          <Ratings value={rating3} onChange={setRating3} size="lg" />
        </div>
      </section>

      {/* Custom Max Ratings */}
      <section>
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Custom Max Ratings</h2>
        <div className="space-y-4">
          <Ratings value={rating1} onChange={setRating1} max={10} />
          <Ratings value={rating2} onChange={setRating2} max={7} variant="success" />
          <Ratings value={rating3} onChange={setRating3} max={7} variant="danger" />
        </div>
      </section>
    </div>
  );
};

export { Ratings, RatingsDemo };
export default Ratings; 
