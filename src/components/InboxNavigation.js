import React from 'react';
import { Inbox, AtSign, Users, BarChart, Star, Mail, Clock, MessageSquare } from 'lucide-react';

const InboxNavigation = () => {
  const navigationItems = [
    {
      id: 'your-inbox',
      label: 'Your Inbox',
      icon: Inbox,
      count: 5,
      isActive: true
    },
    {
      id: 'mentions',
      label: 'Mentions',
      icon: AtSign,
      count: 2
    },
    {
      id: 'assigned',
      label: 'Assigned',
      icon: Users,
      count: 0
    },
    {
      id: 'unassigned',
      label: 'Unassigned',
      icon: BarChart,
      count: 8
    }
  ];

  const views = [
    {
      id: 'waiting-premium',
      label: 'Waiting premium',
      icon: Clock,
      count: 6
    },
    {
      id: 'emails',
      label: 'Emails',
      icon: Mail,
      count: 21
    },
    {
      id: 'calls-in-progress',
      label: 'Calls in progress',
      icon: MessageSquare,
      count: 68
    },
    {
      id: 'social-channels',
      label: 'Social channels',
      icon: Star,
      count: 0
    }
  ];

  const renderNavigationItem = (item) => (
    <button
      key={item.id}
      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm ${
        item.isActive 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-2">
        <item.icon size={16} />
        <span>{item.label}</span>
      </div>
      {item.count > 0 && (
        <span className={`text-xs ${item.isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          {item.count}
        </span>
      )}
    </button>
  );

  return (
    <div className="w-56 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Navigation Items */}
      <div className="p-2 space-y-1">
        {navigationItems.map(renderNavigationItem)}
      </div>

      {/* Views Section */}
      <div className="mt-4">
        <div className="px-3 py-2">
          <h3 className="text-xs font-medium text-gray-500 uppercase">Views</h3>
        </div>
        <div className="p-2 space-y-1">
          {views.map(renderNavigationItem)}
        </div>
      </div>
    </div>
  );
};

export default InboxNavigation; 