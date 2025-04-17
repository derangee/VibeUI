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
  return (
    <div className="p-8 bg-gray-900 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-white mb-8">ProgressBar Component Library</h1>

      {/* ProgressBar Variants */}
      <section>
        <h2 className="text-xl font-semibold text-gray-300 mb-4">ProgressBar Variants</h2>
        <div className="space-y-4">
          <ProgressBar value={40} variant="primary" />
          <ProgressBar value={60} variant="secondary" />
          <ProgressBar value={80} variant="success" />
          <ProgressBar value={50} variant="danger" />
          <ProgressBar value={70} variant="warning" />
          <ProgressBar value={90} variant="ghost" />
        </div>
      </section>

      {/* ProgressBar Sizes */}
      <section>
        <h2 className="text-xl font-semibold text-gray-300 mb-4">ProgressBar Sizes</h2>
        <div className="space-y-4">
          <ProgressBar value={50} size="sm" />
          <ProgressBar value={70} size="md" />
          <ProgressBar value={90} size="lg" />
        </div>
      </section>

      {/* Striped ProgressBar */}
      <section>
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Striped ProgressBar</h2>
        <div className="space-y-4">
          <ProgressBar value={40} variant="primary" striped />
          <ProgressBar value={60} variant="success" striped />
          <ProgressBar value={80} variant="ghost" striped />
        </div>
      </section>

      {/* Animated ProgressBar */}
      <section>
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Animated ProgressBar</h2>
        <div className="space-y-4">
          <ProgressBar value={50} variant="primary" animated />
          <ProgressBar value={70} variant="success" striped animated />
          <ProgressBar value={90} variant="ghost" animated />
        </div>
      </section>
    </div>
  );
};

export { ProgressBar, ProgressBarDemo };
