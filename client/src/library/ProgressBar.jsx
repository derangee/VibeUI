import React from "react";

// ProgressBar variants (aligned with Button.jsx theme)
const variants = {
  primary: "bg-purple-600",
  secondary: "bg-gray-700",
  success: "bg-green-600",
  danger: "bg-red-600",
  warning: "bg-yellow-500",
  outline: "bg-transparent border border-gray-600", // optional visual case for completeness
  ghost: "bg-gray-700", // matches ghost hover effect
};

// ProgressBar sizes
const sizes = {
  sm: "h-2",
  md: "h-4",
  lg: "h-6",
};

// ProgressBar component
const ProgressBar = ({
  value = 0,
  max = 100,
  variant = "primary",
  size = "md",
  striped = false,
  animated = false,
  className = "",
  ...props
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const baseClasses = "w-full rounded overflow-hidden bg-gray-200";
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  const stripedClass = striped ? "bg-stripes" : "";
  const animatedClass = animated ? "animate-pulse" : "";
  const progressClasses = `${variantClasses} ${sizeClasses} ${stripedClass} ${animatedClass}`;

  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      <div
        className={progressClasses}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
      ></div>
    </div>
  );
};

// Demo component remains the same
const ProgressBarDemo = () => {
  return ( <ProgressBar value={40} variant="primary" /> );
};

export { ProgressBar, ProgressBarDemo };

const ProgressBarSource = `
import React from "react";

// ProgressBar variants (aligned with Button.jsx theme)
const variants = {
  primary: "bg-purple-600",
  secondary: "bg-gray-700",
  success: "bg-green-600",
  danger: "bg-red-600",
  warning: "bg-yellow-500",
  outline: "bg-transparent border border-gray-600", // optional visual case for completeness
  ghost: "bg-gray-700", // matches ghost hover effect
};

// ProgressBar sizes
const sizes = {
  sm: "h-2",
  md: "h-4",
  lg: "h-6",
};

// ProgressBar component
const ProgressBar = ({
  value = 0,
  max = 100,
  variant = "primary",
  size = "md",
  striped = false,
  animated = false,
  className = "",
  ...props
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const baseClasses = "w-full rounded overflow-hidden bg-gray-200";
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  const stripedClass = striped ? "bg-stripes" : "";
  const animatedClass = animated ? "animate-pulse" : "";
  const progressClasses = \`\${variantClasses} \${sizeClasses} \${stripedClass} \${animatedClass}\`;

  return (
    <div className={\`\${baseClasses} \${className}\`} {...props}>
      <div
        className={progressClasses}
        style={{ width: \`\${percentage}%\` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
      ></div>
    </div>
  );
};

export default ProgressBar;
`;

const ProgressBarPreview = ` <ProgressBar value={40} variant="primary" />   `;

export { ProgressBarSource, ProgressBarPreview };