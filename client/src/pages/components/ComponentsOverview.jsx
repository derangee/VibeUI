import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Square, 
  Type, 
  Table, 
  Layout, 
  SlidersHorizontal 
} from 'lucide-react';

const ComponentCard = ({ icon: Icon, title, description, to }) => {
  return (
    <Link 
      to={to} 
      className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors group"
    >
      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
        <Icon className="w-6 h-6 text-purple-500 group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </Link>
  );
};

const ComponentsOverview = () => {
  const components = [
    {
      icon: Square,
      title: 'Buttons',
      description: 'Action triggers with various styles, states, and variations.',
      to: '/dashboard/components/buttons'
    },
    {
      icon: Layout,
      title: 'Cards',
      description: 'Content containers with flexible layouts and styling options.',
      to: '/dashboard/components/cards'
    },
    {
      icon: Type,
      title: 'Forms',
      description: 'Input elements, validations, and submission handling.',
      to: '/dashboard/components/forms'
    },
    {
      icon: Table,
      title: 'Tables',
      description: 'Data presentation with sorting, filtering, and pagination.',
      to: '/dashboard/components/tables'
    },
    {
      icon: SlidersHorizontal,
      title: 'Modals',
      description: 'Dialog windows, popovers, and floating panels.',
      to: '/dashboard/components/modals'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-8 h-8 text-purple-500" />
          <h1 className="text-3xl font-bold text-white">UI Components</h1>
        </div>
        <p className="text-xl text-gray-400">
          Browse and customize these components to create beautiful interfaces that match your brand.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component, index) => (
          <ComponentCard key={index} {...component} />
        ))}
      </div>
    </div>
  );
};

export default ComponentsOverview;