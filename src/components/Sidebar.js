import React, { useState } from "react";
import {
  Home,
  Search,
  Plus,
  Mail,
  Phone,
  Clock,
  Star,
  Users,
  MessageSquare,
  BarChart2,
  Settings,
  HelpCircle,
  User,
  Menu
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const [activeIcon, setActiveIcon] = useState('home');
  const topIcons = [
    { icon: Home, id: 'home', label: 'Home' },
    { icon: Search, id: 'search', label: 'Search' },
    { icon: Plus, id: 'plus', label: 'Add New' }
  ];
  
  const mainIcons = [
    { icon: Mail, id: 'mail', label: 'Mail' },
    { icon: Phone, id: 'phone', label: 'Phone' },
    { icon: Clock, id: 'clock', label: 'Clock' },
    { icon: Star, id: 'star', label: 'Star' },
    { icon: Users, id: 'users', label: 'Users' },
    { icon: MessageSquare, id: 'messages', label: 'Messages' },
    { icon: BarChart2, id: 'charts', label: 'Analytics' },
    { icon: Settings, id: 'settings', label: 'Settings' },
    { icon: HelpCircle, id: 'help', label: 'Help' }
  ];

  // Main sidebar content
  const sidebarContent = (
    <div className={`
      fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200
      transition-all duration-300 z-30
      w-[64px] [@media(min-width:1440px)]:w-[68px]
      [@media(max-width:1024px)]:w-[36px]
      [@media(max-width:425px)]:hidden
      ${!isOpen && '[@media(max-width:425px)]:-translate-x-full'}
    `}>
      <div className="h-full flex flex-col">
        {/* Top Icons - Vertical layout */}
        <div className="pt-4 flex flex-col items-center space-y-1">
          {topIcons.map(({ icon: Icon, id, label }) => (
            <button 
              key={id}
              onClick={() => setActiveIcon(id)}
              className={`
                w-10 h-10 [@media(max-width:1024px)]:w-8 [@media(max-width:1024px)]:h-8 
                flex items-center justify-center rounded-lg 
                transition-colors
                ${activeIcon === id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
              title={label}
            >
              <Icon 
                className="w-5 h-5 [@media(min-width:1440px)]:w-6 [@media(min-width:1440px)]:h-6 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4" 
                strokeWidth={2.5} 
              />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-4 mb-4 w-8 [@media(max-width:1024px)]:w-6 h-[1px] bg-gray-200 mx-auto" />

        {/* Main Icons - Vertical layout */}
        <div className="flex-1 flex flex-col items-center space-y-1 mb-4">
          {mainIcons.map(({ icon: Icon, id, label }, index) => (
            <button 
              key={id}
              onClick={() => setActiveIcon(id)}
              className={`
                w-10 h-10 [@media(max-width:1024px)]:w-8 [@media(max-width:1024px)]:h-8 
                flex items-center justify-center rounded-lg 
                transition-colors
                ${activeIcon === id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
              title={label}
            >
              <Icon 
                className="w-5 h-5 [@media(min-width:1440px)]:w-6 [@media(min-width:1440px)]:h-6 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4" 
                strokeWidth={2.5} 
              />
            </button>
          ))}
        </div>

        {/* User Profile Icon */}
        <div className="mb-4 flex justify-center">
          <button className="w-10 h-10 [@media(max-width:1024px)]:w-8 [@media(max-width:1024px)]:h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center text-white font-medium [@media(max-width:1024px)]:text-sm">
            MK
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile bottom navigation
  const mobileNav = (
    <div className="hidden [@media(max-width:425px)]:flex fixed bottom-0 left-0 right-0 h-[60px] bg-white border-t border-gray-200 items-center px-4 z-40">
      <div className="flex items-center justify-between w-full">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-10 h-10 flex items-center justify-center rounded-lg 
            transition-colors
            ${isOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}
          `}
        >
          <Menu className="w-5 h-5" strokeWidth={2.5} />
        </button>

        {/* Main Navigation Icons */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveIcon('messages')}
            className={`
              w-10 h-10 flex items-center justify-center rounded-lg
              transition-colors
              ${activeIcon === 'messages' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            <MessageSquare className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => setActiveIcon('star')}
            className={`
              w-10 h-10 flex items-center justify-center rounded-lg
              transition-colors
              ${activeIcon === 'star' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            <Star className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => setActiveIcon('search')}
            className={`
              w-10 h-10 flex items-center justify-center rounded-lg
              transition-colors
              ${activeIcon === 'search' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            <Search className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => setActiveIcon('settings')}
            className={`
              w-10 h-10 flex items-center justify-center rounded-lg
              transition-colors
              ${activeIcon === 'settings' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            <Settings className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* User Profile */}
        <button className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm">
          MK
        </button>
      </div>
    </div>
  );

  // Overlay for mobile when inbox is open
  const overlay = isOpen && (
    <div 
      className="hidden [@media(max-width:425px)]:block fixed inset-0 bg-black/20 z-30"
      onClick={() => setIsOpen(false)}
    />
  );

  return (
    <>
      {sidebarContent}
      {mobileNav}
      {overlay}
    </>
  );
};

export default Sidebar; 