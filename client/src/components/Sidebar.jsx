import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  Home, 
  Layers, 
  Save, 
  Settings,
  Users,
  BarChart,
  FileText,
  HelpCircle,
  Mail
} from 'lucide-react';

// Menu data structure with routes
const SIDEBAR_MENU = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home,
    hasChildren: false,
    path: '/dashboard'
  },
  {
    id: 'components',
    title: 'Components',
    icon: Layers,
    hasChildren: true,
    path: '/components',
    children: [
      { id: 'buttons', title: 'Buttons', path: '/components/buttons' },
      { id: 'cards', title: 'Cards', path: '/components/cards' },
      { id: 'forms', title: 'Forms', path: '/components/forms' },
      { id: 'tables', title: 'Tables', path: '/components/tables' },
      { id: 'modals', title: 'Modals', path: '/components/modals' }
    ]
  },
  {
    id: 'saved-components',
    title: 'Saved Components',
    icon: Save,
    hasChildren: true,
    path: '/saved-components',
    children: [
      { id: 'project-a', title: 'Project A', path: '/saved-components/project-a' },
      { id: 'project-b', title: 'Project B', path: '/saved-components/project-b' },
      { id: 'recent', title: 'Recent', path: '/saved-components/recent' }
    ]
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: FileText,
    hasChildren: true,
    path: '/documents',
    children: [
      { id: 'tutorials', title: 'Tutorials', path: '/documents/tutorials' },
      { id: 'api-docs', title: 'API Docs', path: '/documents/api-docs' },
      { id: 'guidelines', title: 'Guidelines', path: '/documents/guidelines' }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    hasChildren: false,
    path: '/settings'
  },
];

const Sidebar = () => {
  const location = useLocation();
  // State to track which sections are open
  const [openSections, setOpenSections] = useState({});
  
  // Initialize open sections based on current path
  React.useEffect(() => {
    const currentPath = location.pathname;
    const updatedOpenSections = {};
    
    // Check each menu item to see if the current path matches or is a child route
    SIDEBAR_MENU.forEach(item => {
      if (item.hasChildren) {
        // Check if any child route matches the current path
        const isChildActive = item.children.some(child => 
          currentPath.startsWith(child.path) || currentPath === child.path
        );
        
        if (isChildActive) {
          updatedOpenSections[item.id] = true;
        }
      }
    });
    
    setOpenSections(prev => ({
      ...prev,
      ...updatedOpenSections
    }));
  }, [location.pathname]);
  
  // Toggle a section's open/closed state
  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  // Check if a section is open
  const isSectionOpen = (sectionId) => {
    return !!openSections[sectionId];
  };
  
  // Check if a route is active
  const isRouteActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  // Handle click on a menu item
  const handleMenuItemClick = (item) => {
    if (item.hasChildren) {
      toggleSection(item.id);
    }
  };
  
  // Render a menu item
  const renderMenuItem = (item) => {
    const isOpen = isSectionOpen(item.id);
    const isActive = isRouteActive(item.path);
    const Icon = item.icon;
    
    return (
      <div key={item.id} className="mb-1">
        {item.hasChildren ? (
          <button
            onClick={() => handleMenuItemClick(item)}
            className={`flex items-center w-full p-3 rounded-md text-left transition-colors ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span className="mr-3">
              <Icon size={20} />
            </span>
            <span className="flex-grow">{item.title}</span>
            <span className="ml-2">
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>
        ) : (
          <Link
            to={item.path}
            className={`flex items-center w-full p-3 rounded-md text-left transition-colors ${
              isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span className="mr-3">
              <Icon size={20} />
            </span>
            <span className="flex-grow">{item.title}</span>
          </Link>
        )}
        
        {item.hasChildren && isOpen && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map(child => (
              <Link
                key={child.id}
                to={child.path}
                className={`block p-2 rounded-md transition-colors ${
                  isRouteActive(child.path) 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-64 h-full bg-gray-800 border-r border-gray-600">
      <div className="p-4 h-full overflow-y-auto">
        <div className="py-2">
          {/* Sidebar content */}
          <nav className="space-y-1">
            {SIDEBAR_MENU.map(item => renderMenuItem(item))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;