import React, { useState } from "react";
import { 
  Home, AtSign, UserCircle, Circle, 
  Users2, Eye, Clock, Mail, PhoneCall, MessageSquare,
  ChevronDown, Plus, Search
} from "lucide-react";

const InboxPanel = ({ isOpen }) => {
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
    <div className={`
      w-[216px] [@media(max-width:1024px)]:w-[164px] [@media(max-width:768px)]:w-[180px]
      bg-white border-r border-gray-200 flex flex-col h-full 
      [@media(min-width:1440px)]:ml-[72px] [@media(min-width:1024px)]:ml-[54px] [@media(max-width:768px)]:ml-[36px]
      [@media(max-width:425px)]:w-full [@media(max-width:425px)]:ml-0
    `}>
      {/* Header */}
      <div className="p-2 [@media(max-width:1024px)]:p-1.5 [@media(max-width:768px)]:p-1 flex items-center justify-between border-b border-gray-200 [@media(max-width:425px)]:px-3">
        <div className="flex items-center gap-2 [@media(max-width:1024px)]:gap-1.5 [@media(max-width:768px)]:gap-1">
          <span className="font-semibold text-sm [@media(max-width:1024px)]:text-xs [@media(max-width:768px)]:text-[11px]">Inbox</span>
          <Plus size={16} className="text-gray-500 [@media(max-width:1024px)]:w-3.5 [@media(max-width:1024px)]:h-3.5 [@media(max-width:768px)]:w-3 [@media(max-width:768px)]:h-3" />
          <Search size={16} className="text-gray-500 [@media(max-width:1024px)]:w-3.5 [@media(max-width:1024px)]:h-3.5 [@media(max-width:768px)]:w-3 [@media(max-width:768px)]:h-3" />
        </div>
        <button className="text-xs [@media(max-width:1024px)]:text-[10px] [@media(max-width:768px)]:text-[9px] text-gray-500">5 Open</button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto [@media(max-width:425px)]:pt-2">
        {/* Inbox Items */}
        <div className="[@media(max-width:425px)]:px-3 space-y-1">
          {inboxItems.map((item, index) => (
            <button
              key={index}
              className={`
                w-full flex items-center justify-between py-2 [@media(max-width:1024px)]:py-1.5 [@media(max-width:768px)]:py-1 px-2 rounded-md
                text-sm [@media(max-width:1024px)]:text-xs [@media(max-width:768px)]:text-[11px]
                ${item.isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}
                [@media(max-width:425px)]:py-3 [@media(max-width:425px)]:px-0
                [@media(max-width:425px)]:border-b [@media(max-width:425px)]:border-gray-100
                [@media(max-width:425px)]:rounded-none [@media(max-width:425px)]:hover:bg-transparent
              `}
            >
              <div className="flex items-center gap-3 [@media(max-width:1024px)]:gap-2 [@media(max-width:768px)]:gap-1.5">
                <item.icon size={20} className={`[@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 [@media(max-width:768px)]:w-3.5 [@media(max-width:768px)]:h-3.5 [@media(max-width:425px)]:w-5 [@media(max-width:425px)]:h-5 ${item.isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className="[@media(max-width:425px)]:font-medium">{item.label}</span>
              </div>
              {item.count > 0 && (
                <span className={`text-xs [@media(max-width:1024px)]:text-[10px] [@media(max-width:768px)]:text-[9px] ${item.isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mt-6 [@media(max-width:1024px)]:mt-4 [@media(max-width:768px)]:mt-3 [@media(max-width:425px)]:mt-4">
            <div className="[@media(max-width:425px)]:px-4 mb-2 [@media(max-width:768px)]:mb-1.5 px-2">
              <span className="text-xs [@media(max-width:1024px)]:text-[10px] [@media(max-width:768px)]:text-[9px] font-semibold text-gray-500 tracking-wide">
                {section.title}
              </span>
            </div>
            <div className="[@media(max-width:425px)]:px-4">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className="w-full flex items-center justify-between py-2 [@media(max-width:1024px)]:py-1.5 [@media(max-width:768px)]:py-1 px-2
                           text-sm [@media(max-width:1024px)]:text-xs [@media(max-width:768px)]:text-[11px] text-gray-700 hover:bg-gray-50 
                           [@media(max-width:425px)]:py-3 [@media(max-width:425px)]:hover:bg-transparent 
                           [@media(max-width:425px)]:border-b [@media(max-width:425px)]:border-gray-100"
                >
                  <div className="flex items-center gap-3 [@media(max-width:1024px)]:gap-2 [@media(max-width:768px)]:gap-1.5">
                    <item.icon size={20} className="[@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 [@media(max-width:768px)]:w-3.5 [@media(max-width:768px)]:h-3.5 [@media(max-width:425px)]:w-5 [@media(max-width:425px)]:h-5 text-gray-500" />
                    <span className="[@media(max-width:425px)]:font-medium">{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="text-xs [@media(max-width:1024px)]:text-[10px] [@media(max-width:768px)]:text-[9px] text-gray-500">
                      {item.count}
                    </span>
                  )}
                  {item.hasDropdown && (
                    <ChevronDown size={16} className="ml-2 [@media(max-width:1024px)]:w-3.5 [@media(max-width:1024px)]:h-3.5 [@media(max-width:768px)]:w-3 [@media(max-width:768px)]:h-3 text-gray-400" />
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