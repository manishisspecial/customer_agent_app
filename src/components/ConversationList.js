import React from "react";
import { ChevronDown, MoreHorizontal, User, MessageSquare } from "lucide-react";

const conversations = [
  {
    id: 1,
    user: {
      name: "Alexandra Anholt",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      message: "Hey there, can you help me find my order?",
      time: "2m",
      active: true
    },
    messages: [
      {
        id: 1,
        text: "Hey there, can you help me find my order? I think it should have been delivered by now but I haven't received it.",
        time: "2m",
        isCustomer: true
      },
      {
        id: 2,
        text: "",
        time: "4m",
        isCustomer: true,
        attachment: {
          image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7",
          title: "Baies Scented Candle",
          subtitle: "Order #10859"
        }
      },
      {
        id: 3,
        text: "Hi Alexandra! No problem let me look into this for you.",
        time: "3m",
        isCustomer: false,
        seen: true
      }
    ]
  },
  {
    id: 2,
    user: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      message: "I need to return my sweater - it has a tear in the sleeve.",
      time: "5m",
      active: true
    },
    messages: [
      {
        id: 1,
        text: "I need to return my sweater - it has a tear in the sleeve.",
        time: "5m",
        isCustomer: true
      },
      {
        id: 2,
        text: "I understand your concern, James. I'll help you with the return process. Could you please share a photo of the damaged area?",
        time: "4m",
        isCustomer: false,
        seen: true
      }
    ]
  },
  {
    id: 3,
    user: {
      name: "Sarah Parker",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
      message: "The jacket I received is the wrong size.",
      time: "12m",
      active: true
    },
    messages: [
      {
        id: 1,
        text: "The jacket I received is the wrong size. I ordered a medium but got a small.",
        time: "12m",
        isCustomer: true
      },
      {
        id: 2,
        text: "I apologize for the mix-up, Sarah. Let me check our inventory for the correct size and arrange an exchange for you.",
        time: "10m",
        isCustomer: false,
        seen: true
      }
    ]
  },
  {
    id: 4,
    user: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      message: "Is it possible to exchange the shoes?",
      time: "25m",
      active: true
    },
    messages: [
      {
        id: 1,
        text: "Is it possible to exchange the shoes I bought? They're a bit tight.",
        time: "25m",
        isCustomer: true
      },
      {
        id: 2,
        text: "Of course, Michael! We can help you with that. What size would you like to exchange them for?",
        time: "23m",
        isCustomer: false,
        seen: true
      }
    ]
  },
  {
    id: 5,
    user: {
      name: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      message: "The color of the dress doesn't match.",
      time: "1h",
      active: true
    },
    messages: [
      {
        id: 1,
        text: "The color of the dress doesn't match what was shown on the website.",
        time: "1h",
        isCustomer: true
      },
      {
        id: 2,
        text: "I'm sorry to hear that, Emma. Could you please share a photo of the dress you received? I'll compare it with our product images.",
        time: "58m",
        isCustomer: false,
        seen: true
      }
    ]
  },
  {
    id: 6,
    user: {
      name: "David Rodriguez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      message: "I've been charged twice for my purchase.",
      time: "30m",
      active: true
    },
    messages: [
      {
        id: 1,
        text: "I've been charged twice for my last purchase. Can you help me resolve this?",
        time: "30m",
        isCustomer: true
      },
      {
        id: 2,
        text: "I apologize for the inconvenience, David. Let me check your transaction history right away. Could you please confirm your order number?",
        time: "28m",
        isCustomer: false,
        seen: true
      }
    ]
  },
  {
    id: 7,
    user: {
      name: "Sophie Anderson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      message: "Questions about premium features",
      time: "45m",
      active: true
    },
    messages: [
      {
        id: 1,
        text: "Hi! I'm interested in your premium subscription but have some questions about the features.",
        time: "45m",
        isCustomer: true
      },
      {
        id: 2,
        text: "Hello Sophie! I'd be happy to walk you through our premium features. What specific aspects would you like to know more about?",
        time: "42m",
        isCustomer: false,
        seen: true
      },
      {
        id: 3,
        text: "I'm mainly curious about the AI-powered analytics and team collaboration features.",
        time: "40m",
        isCustomer: true
      }
    ]
  },
  {
    id: 8,
    user: {
      name: "Ryan Mitchell",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
      message: "App keeps crashing during export",
      time: "15m",
      active: true
    },
    messages: [
      {
        id: 1,
        text: "Your app keeps crashing when I try to export my data. This is urgent as I need these reports for a meeting tomorrow.",
        time: "15m",
        isCustomer: true
      },
      {
        id: 2,
        text: "Hi Ryan, I understand this is time-sensitive. Could you tell me which version of the app you're using and what type of data you're trying to export?",
        time: "13m",
        isCustomer: false,
        seen: true
      },
      {
        id: 3,
        text: "I'm on version 2.4.1 and trying to export financial reports as PDF.",
        time: "10m",
        isCustomer: true
      }
    ]
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
              `}
            >
              <div className="flex items-start gap-2 [@media(max-width:1024px)]:gap-1.5">
                <img 
                  src={conversation.user.avatar} 
                  alt={conversation.user.name}
                  className="w-7 h-7 [@media(max-width:1024px)]:w-6 [@media(max-width:1024px)]:h-6 rounded-full" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs [@media(max-width:1024px)]:text-[11px] font-medium text-gray-900 truncate">
                      {conversation.user.name}
                    </h3>
                    <span className="text-[10px] [@media(max-width:1024px)]:text-[9px] text-gray-500">{conversation.user.time}</span>
                  </div>
                  <p className="text-xs [@media(max-width:1024px)]:text-[11px] text-gray-600 truncate">{conversation.user.message}</p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-6 [@media(max-width:1024px)]:p-4 text-center">
            <div className="w-14 h-14 [@media(max-width:1024px)]:w-12 [@media(max-width:1024px)]:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-7 h-7 [@media(max-width:1024px)]:w-6 [@media(max-width:1024px)]:h-6 text-blue-600" />
            </div>
            <h3 className="text-base [@media(max-width:1024px)]:text-sm font-semibold text-gray-900 mb-2">
              No conversations yet
            </h3>
            <p className="text-xs [@media(max-width:1024px)]:text-[11px] text-gray-500 mb-4">
              Start a new conversation or wait for incoming messages
            </p>
            <button className="px-3 py-1.5 [@media(max-width:1024px)]:px-2.5 [@media(max-width:1024px)]:py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs">
              Start New Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList; 