import React from "react";

// Card variants with enhanced borders
const variants = {
  basic: "bg-white border border-gray-300",
  elevated: "bg-white border border-gray-300 shadow-lg",
  outlined: "bg-white border-2 border-gray-400",
  filled: "bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300",
  hover: "bg-white border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
  gradient: "bg-white border-2 border-transparent bg-clip-border bg-gradient-to-r from-blue-500 to-purple-500",
  accent: "bg-white border-l-4 border-gray-300 border-blue-500",
};

// Card sizes
const sizes = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

// Card component
const Card = ({
  children,
  variant = "basic",
  size = "md",
  className = "",
  ...props
}) => {
  const baseClasses = "overflow-hidden rounded-lg";
  const variantClasses = variants[variant] || variants.basic;
  const sizeClasses = sizes[size] || sizes.md;
  const cardClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

// Card Header component
const CardHeader = ({ children, className = "", ...props }) => {
  return <div className={`p-4 border-b border-gray-200 ${className}`} {...props}>{children}</div>;
};

// Card Title component
const CardTitle = ({ children, className = "", ...props }) => {
  return <h3 className={`text-xl font-bold text-gray-800 ${className}`} {...props}>{children}</h3>;
};

// Card Subtitle component
const CardSubtitle = ({ children, className = "", ...props }) => {
  return <h4 className={`text-sm text-gray-600 ${className}`} {...props}>{children}</h4>;
};

// Card Content component
const CardContent = ({ children, className = "", ...props }) => {
  return <div className={`p-4 text-gray-700 ${className}`} {...props}>{children}</div>;
};

// Card Footer component
const CardFooter = ({ children, className = "", ...props }) => {
  return <div className={`p-4 border-t border-gray-200 ${className}`} {...props}>{children}</div>;
};

// Card Media component
const CardMedia = ({ src, alt = "", className = "", ...props }) => {
  return <img src={src} alt={alt} className={`w-full h-48 object-cover ${className}`} {...props} />;
};

// Horizontal Card component
const HorizontalCard = ({ mediaSrc, mediaAlt, children, className = "", ...props }) => {
  return (
    <div className={`flex bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg ${className}`} {...props}>
      <img src={mediaSrc} alt={mediaAlt} className="w-1/3 object-cover" />
      <div className="p-6 w-2/3">{children}</div>
    </div>
  );
};

// Card Demo Component
const CardDemo = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Enhanced Card Component Library</h1>

      {/* Profile Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Profile Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="gradient" className="text-center">
            <CardMedia src="https://picsum.photos/150/150" alt="Profile" className="rounded-full w-24 h-24 mx-auto mt-4 shadow-md" />
            <CardHeader>
              <CardTitle>John Doe</CardTitle>
              <CardSubtitle>Software Engineer</CardSubtitle>
            </CardHeader>
            <CardContent>
              <p>Passionate about building scalable web applications and user-friendly interfaces.</p>
            </CardContent>
            <CardFooter>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md">Follow</button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Horizontal Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Horizontal Cards</h2>
        <HorizontalCard mediaSrc="https://picsum.photos/300/200" mediaAlt="Horizontal Card">
          <CardHeader>
            <CardTitle>Horizontal Card</CardTitle>
            <CardSubtitle>Media on the left</CardSubtitle>
          </CardHeader>
          <CardContent>
            <p>This is a horizontal card with media on the left and content on the right.</p>
          </CardContent>
        </HorizontalCard>
      </section>



      {/* Blog Post Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Blog Post Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="accent">
            <CardMedia src="https://picsum.photos/300/200" alt="Blog Post" />
            <CardHeader>
              <CardTitle>Blog Post Title</CardTitle>
              <CardSubtitle>By Jane Doe</CardSubtitle>
            </CardHeader>
            <CardContent>
              <p>A short excerpt from the blog post goes here to entice readers to click and read more.</p>
            </CardContent>
            <CardFooter>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md">Read More</button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Stat Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Stat Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="gradient">
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-800">1,234</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardSubtitle, CardContent, CardFooter, CardMedia, HorizontalCard, CardDemo };