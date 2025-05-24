import React from "react";
import { ChevronDown, MoreHorizontal, User, MessageSquare, Search, Plus } from "lucide-react";

const conversations = [
  {
    id: 1,
    user: {
      name: "Alexandra Anholt",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      message: "Looking for my Baies Scented Candle order",
      time: "2m",
      active: true
    }
  },
  {
    id: 2,
    user: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      message: "Quality issue with sweater stitching",
      time: "5m",
      active: true
    }
  },
  {
    id: 3,
    user: {
      name: "Sarah Parker",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
      message: "Need to change furniture delivery address",
      time: "12m",
      active: true
    }
  },
  {
    id: 4,
    user: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      message: "Product photo upload failing",
      time: "25m",
      active: true
    }
  },
  {
    id: 5,
    user: {
      name: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      message: "Premium dashboard access issue",
      time: "1h",
      active: true
    }
  },
  {
    id: 6,
    user: {
      name: "David Rodriguez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      message: "Double charge on recent purchase",
      time: "30m",
      active: true
    }
  },
  {
    id: 7,
    user: {
      name: "Sophie Anderson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      message: "Enterprise team pricing inquiry",
      time: "45m",
      active: true
    }
  },
  {
    id: 8,
    user: {
      name: "Ryan Mitchell",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
      message: "Mobile app crashing during report generation",
      time: "15m",
      active: true
    }
  }
];

const ConversationList = ({ onSelect, selectedId }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Search Header */}
      <div className="p-4 [@media(max-width:425px)]:p-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations, users, or teams..."
            className="w-full pl-8 pr-3 py-2 [@media(max-width:425px)]:py-1.5 bg-gray-100 rounded-lg text-sm [@media(max-width:425px)]:text-xs"
          />
          <Search className="absolute left-2 top-2.5 [@media(max-width:425px)]:top-2 w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Inbox Header */}
      <div className="flex items-center justify-between px-4 [@media(max-width:425px)]:px-2 py-2 border-b border-gray-200">
        <div className="flex items-center">
          <h2 className="text-base [@media(max-width:425px)]:text-sm font-semibold">Inbox</h2>
          <span className="ml-2 text-xs [@media(max-width:425px)]:text-[10px] text-gray-500">8 Open</span>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-lg">
          <Plus className="w-4 h-4 [@media(max-width:425px)]:w-3.5 [@media(max-width:425px)]:h-3.5" />
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation)}
            className={`w-full text-left px-4 [@media(max-width:425px)]:px-2 py-3 [@media(max-width:425px)]:py-2 hover:bg-gray-50 border-b border-gray-100 ${
              selectedId === conversation.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center gap-3 [@media(max-width:425px)]:gap-2">
              <img
                src={conversation.user.avatar}
                alt={conversation.user.name}
                className="w-10 h-10 [@media(max-width:425px)]:w-8 [@media(max-width:425px)]:h-8 rounded-full"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm [@media(max-width:425px)]:text-xs text-gray-900 truncate">
                    {conversation.user.name}
                  </h3>
                  <span className="text-xs [@media(max-width:425px)]:text-[10px] text-gray-500">
                    {conversation.user.time}
                  </span>
                </div>
                <p className="text-sm [@media(max-width:425px)]:text-xs text-gray-500 truncate">
                  {conversation.user.message}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-200">
        <div className="px-4 [@media(max-width:425px)]:px-2 py-2">
          <h3 className="text-xs [@media(max-width:425px)]:text-[10px] font-medium text-gray-500 uppercase tracking-wider">
            Teams
          </h3>
        </div>
        <nav className="space-y-1">
          <button className="w-full text-left px-4 [@media(max-width:425px)]:px-2 py-2 hover:bg-gray-50 text-sm [@media(max-width:425px)]:text-xs text-gray-700">
            Team inboxes
          </button>
          <button className="w-full text-left px-4 [@media(max-width:425px)]:px-2 py-2 hover:bg-gray-50 text-sm [@media(max-width:425px)]:text-xs text-gray-700">
            Teammates
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ConversationList; 