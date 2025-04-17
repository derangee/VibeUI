import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  ArrowRight, 
  Save, 
  FileText, 
  Clock10Icon, 
  Star, 
  Code,
  Users
} from 'lucide-react';

const DashboardCard = ({ title, icon: Icon, value, trend, color }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color || 'bg-purple-600'}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            trend.startsWith('+') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-white text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

const RecentActivity = ({ date, title, description, icon: Icon, color }) => {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-700 last:border-0">
      <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <h4 className="font-medium text-white">{title}</h4>
          <span className="text-gray-500 text-sm">{date}</span>
        </div>
        <p className="text-gray-400 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
        <p className="text-xl text-gray-400">
          Here's what's happening with your UI components.
        </p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <DashboardCard 
          title="Total Components" 
          icon={Layers} 
          value="32" 
          trend="+12%" 
          color="bg-purple-600" 
        />
        <DashboardCard 
          title="Saved Templates" 
          icon={Save} 
          value="8" 
          trend="+3%" 
          color="bg-blue-600" 
        />
        <DashboardCard 
          title="Documentation Views" 
          icon={FileText} 
          value="1,024" 
          trend="+18%" 
          color="bg-green-600" 
        />
        <DashboardCard 
          title="Team Members" 
          icon={Users} 
          value="4" 
          color="bg-orange-600" 
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Popular Components */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-white">Popular Components</h3>
            <Link to="/dashboard/components" className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-700">
            <Link to="/dashboard/components/buttons" className="block px-6 py-4 hover:bg-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Buttons</h4>
                  <p className="text-gray-400 text-sm">Basic UI component for user actions</p>
                </div>
              </div>
            </Link>
            <Link to="/dashboard/components/forms" className="block px-6 py-4 hover:bg-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Forms</h4>
                  <p className="text-gray-400 text-sm">Input components for data collection</p>
                </div>
              </div>
            </Link>
            <Link to="/dashboard/components/cards" className="block px-6 py-4 hover:bg-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Cards</h4>
                  <p className="text-gray-400 text-sm">Containers for displaying related content</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="font-semibold text-white">Recent Activity</h3>
          </div>
          <div className="px-6">
            <RecentActivity 
              date="2h ago"
              title="New button component created"
              description="You created a new primary button variant"
              icon={Star}
              color="bg-purple-600"
            />
            <RecentActivity 
              date="Yesterday"
              title="Documentation updated"
              description="Updated the API reference for cards"
              icon={FileText}
              color="bg-blue-600"
            />
            <RecentActivity 
              date="7h ago"
              title="Template saved"
              description="Saved 'Dashboard UI Kit' to your templates"
              icon={Save}
              color="bg-green-600"
            />
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Getting Started with VibeUI</h3>
            <p className="text-gray-400 mb-4">
              VibeUI helps you create beautiful UI components that match your brand. 
              Explore our components library, save your customizations, and export code.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/dashboard/components">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                  Browse Components
                </button>
              </Link>
              <Link to="/dashboard/documents/tutorials">
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium">
                  Read Tutorials
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;