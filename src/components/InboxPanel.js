import React, { useState } from "react";
import { 
  Home, AtSign, UserCircle, Circle, 
  Users2, Eye, Clock, Mail, PhoneCall, MessageSquare,
  ChevronDown, Plus, Search
} from "lucide-react";

const InboxPanel = () => {
  const [showTeamMenu, setShowTeamMenu] = useState(false);

  const inboxItems = [
    { icon: Circle, label: "Your inbox", count: 5, isActive: true },
    { icon: AtSign, label: "Mentions", count: 3 },
    { icon: UserCircle, label: "Created by you", count: 3 },
    { icon: Circle, label: "All", count: 81 },
    { icon: Circle, label: "Unassigned", count: 8 }
  ];

  const sections = [
    { 
      title: "TEAMS",
      items: [
        { icon: MessageSquare, label: "Team inboxes", hasDropdown: true }
      ]
    },
    {
      title: "TEAMMATES",
      items: [
        { icon: Users2, label: "Teammates" }
      ]
    },
    {
      title: "VIEWS",
      items: [
        { icon: Eye, label: "Views" },
        { icon: Clock, label: "Waiting premium", count: 6 },
        { icon: Mail, label: "Emails", count: 21 },
        { icon: PhoneCall, label: "Calls in progress", count: 68 },
        { icon: MessageSquare, label: "Social channels", count: 0 }
      ]
    }
  ];

  return (
    <div className="w-60 bg-white border-r border-gray-200 flex flex-col h-full [@media(min-width:1440px)]:ml-[72px]">
      {/* Header */}
      <div className="p-2 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Inbox</span>
          <Plus size={16} className="text-gray-500" />
          <Search size={16} className="text-gray-500" />
        </div>
        <button className="text-xs text-gray-500">5 Open</button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto">
        {/* Inbox Items */}
        <div className="py-1">
          {inboxItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center px-3 py-1 rounded-md text-sm ${
                item.isActive 
                  ? 'bg-blue-50 text-gray-900'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2 flex-1">
                <item.icon size={16} className={item.isActive ? 'text-gray-900' : 'text-gray-500'} />
                <span className={item.isActive ? 'font-semibold' : ''}>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className="text-xs text-gray-500">{item.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mt-3">
            <div className="px-3 mb-1">
              <span className="text-xs font-semibold text-gray-500 tracking-wide">
                {section.title}
              </span>
            </div>
            <div className="py-1">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className="w-full flex items-center px-3 py-1 rounded-md text-sm hover:bg-gray-50 text-gray-700"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <item.icon size={16} className="text-gray-500" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="text-xs text-gray-500">{item.count}</span>
                  )}
                  {item.hasDropdown && (
                    <ChevronDown size={14} className="ml-2 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxPanel; 