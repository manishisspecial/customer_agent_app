import React from "react";
import { ChevronDown, MoreHorizontal, User, MessageSquare } from "lucide-react";

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
    <div className="h-full flex flex-col bg-white [@media(min-width:1440px)]:ml-[-17px]">
      {/* Header */}
      <div className="px-3 [@media(max-width:1024px)]:px-2 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-base [@media(max-width:1024px)]:text-sm font-semibold text-gray-900">Inbox</h2>
          <button className="flex items-center text-xs [@media(max-width:1024px)]:text-[10px] text-gray-600">
            <span>{conversations.length} Open</span>
            <ChevronDown className="w-3.5 h-3.5 [@media(max-width:1024px)]:w-3 [@media(max-width:1024px)]:h-3 ml-1" />
          </button>
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelect(conversation)}
              className={`w-full text-left px-3 [@media(max-width:1024px)]:px-2 py-2.5 [@media(max-width:1024px)]:py-2 hover:bg-gray-50 transition-colors border-b border-gray-100
                ${selectedId === conversation.id ? 'bg-blue-50' : ''}
                [@media(max-width:425px)]:px-2 [@media(max-width:425px)]:py-2
              `}
            >
              <div className="flex items-start gap-2 [@media(max-width:1024px)]:gap-1.5 [@media(max-width:425px)]:gap-2">
                <img 
                  src={conversation.user.avatar} 
                  alt={conversation.user.name}
                  className="w-7 h-7 [@media(max-width:1024px)]:w-6 [@media(max-width:1024px)]:h-6 [@media(max-width:425px)]:w-8 [@media(max-width:425px)]:h-8 rounded-full" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs [@media(max-width:1024px)]:text-[11px] [@media(max-width:425px)]:text-xs font-medium text-gray-900 truncate">
                      {conversation.user.name}
                    </h3>
                    <span className="text-[10px] [@media(max-width:1024px)]:text-[9px] [@media(max-width:425px)]:text-[10px] text-gray-500">
                      {conversation.user.time}
                    </span>
                  </div>
                  <p className="text-xs [@media(max-width:1024px)]:text-[11px] [@media(max-width:425px)]:text-xs text-gray-600 truncate">
                    {conversation.user.message}
                  </p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-6 [@media(max-width:1024px)]:p-4 [@media(max-width:425px)]:p-3 text-center">
            <div className="w-14 h-14 [@media(max-width:1024px)]:w-12 [@media(max-width:1024px)]:h-12 [@media(max-width:425px)]:w-10 [@media(max-width:425px)]:h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-7 h-7 [@media(max-width:1024px)]:w-6 [@media(max-width:1024px)]:h-6 [@media(max-width:425px)]:w-5 [@media(max-width:425px)]:h-5 text-blue-600" />
            </div>
            <h3 className="text-base [@media(max-width:1024px)]:text-sm [@media(max-width:425px)]:text-sm font-semibold text-gray-900 mb-2">
              No conversations yet
            </h3>
            <p className="text-xs [@media(max-width:1024px)]:text-[11px] [@media(max-width:425px)]:text-xs text-gray-500 mb-4">
              Start a new conversation or wait for incoming messages
            </p>
            <button className="px-3 py-1.5 [@media(max-width:1024px)]:px-2.5 [@media(max-width:1024px)]:py-1 [@media(max-width:425px)]:px-2 [@media(max-width:425px)]:py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs">
              Start New Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList; 