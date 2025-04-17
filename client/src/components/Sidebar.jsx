import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  Home,
  Box,
  Save,
  Settings,
  FileText,
  HelpCircle,
  Square,
  BarChart2,
  Star,
  LayoutDashboard,
  Menu,
  Folder,
  Code,
  FileCode,
  Clock,
} from 'lucide-react';

// Updated menu data structure with relevant icons
const SIDEBAR_MENU = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home,
    hasChildren: false,
    path: '/dashboard',
  },
  {
    id: 'components',
    title: 'Components',
    icon: Box,
    hasChildren: true,
    path: '/dashboard/components',
    children: [
      { id: 'buttons', title: 'Buttons', path: '/dashboard/components/buttons', icon: Square },
      { id: 'progressbar', title: 'Progress Bar', path: '/dashboard/components/progressbar', icon: BarChart2 },
      { id: 'ratings', title: 'Ratings', path: '/dashboard/components/ratings', icon: Star },
      { id: 'navbar', title: 'Navbar', path: '/dashboard/components/navbar', icon: LayoutDashboard },
      { id: 'menu', title: 'Drop Down Menu', path: '/dashboard/components/menu', icon: Menu },
    ],
  },
  {
    id: 'saved-components',
    title: 'Saved Components',
    icon: Save,
    hasChildren: true,
    path: '/dashboard/saved-components',
    children: [
      { id: 'project-a', title: 'Project A', path: '/dashboard/saved-components/project-a', icon: Folder },
      { id: 'project-b', title: 'Project B', path: '/dashboard/saved-components/project-b', icon: Folder },
      { id: 'recent', title: 'Recent', path: '/dashboard/saved-components/recent', icon: Clock },
    ],
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: FileText,
    hasChildren: true,
    path: '/dashboard/documents',
    children: [
      { id: 'tutorials', title: 'Tutorials', path: '/dashboard/documents/tutorials', icon: HelpCircle },
      { id: 'api-docs', title: 'API Docs', path: '/dashboard/documents/api-docs', icon: Code },
      { id: 'guidelines', title: 'Guidelines', path: '/dashboard/documents/guidelines', icon: FileCode },
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    hasChildren: false,
    path: '/dashboard/settings',
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const currentPath = location.pathname;
    const updatedOpenSections = {};

    SIDEBAR_MENU.forEach((item) => {
      if (item.hasChildren) {
        const isChildActive = item.children.some(
          (child) => currentPath.startsWith(child.path) || currentPath === child.path
        );

        if (isChildActive || currentPath === item.path) {
          updatedOpenSections[item.id] = true;
        }
      }
    });

    setOpenSections((prev) => ({
      ...prev,
      ...updatedOpenSections,
    }));
  }, [location.pathname]);

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const isSectionOpen = (sectionId) => !!openSections[sectionId];

  const isRouteActive = (path) =>
    location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(`${path}/`));

  const isDashboardActive = () => location.pathname === '/dashboard';

  const handleMenuItemClick = (item) => {
    if (item.hasChildren) {
      toggleSection(item.id);
    }
  };

  const renderMenuItem = (item) => {
    const isOpen = isSectionOpen(item.id);
    const isActive = item.id === 'dashboard' ? isDashboardActive() : isRouteActive(item.path);
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
            <span className="ml-2">{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
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
            {item.children.map((child) => {
              const ChildIcon = child.icon;

              return (
                <Link
                  key={child.id}
                  to={child.path}
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    isRouteActive(child.path)
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {ChildIcon && (
                    <span className="mr-2">
                      <ChildIcon size={16} />
                    </span>
                  )}
                  <span>{child.title}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-64 h-full bg-gray-800 border-r border-gray-600">
      <div className="p-4 h-full overflow-y-auto">
        <div className="py-2">
          <nav className="space-y-1">{SIDEBAR_MENU.map((item) => renderMenuItem(item))}</nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;