import React, { useState, useRef, useEffect } from "react";
import { Star, Clock, Phone, Video, Settings, Plus, Smile, Send, Paperclip, Image, Bot, MoreHorizontal, 
  Zap, FileText, Mail, MessageSquare, Flag, ThumbsUp, ThumbsDown, Reply, ChevronDown, Search } from "lucide-react";
import ChatMessage from './ChatMessage';

// Each conversation will be a separate array of messages
const conversations = {
  1: [ // Alexandra's conversation
    {
      id: 1,
      text: "Hey there, can you help me find my order? I think it should have been delivered by now but I haven't received it.",
      time: "2m",
      isCustomer: true,
      customerInfo: {
        name: "Alexandra Anholt",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      }
    },
    {
      id: 2,
      text: "",
      time: "4m",
      isCustomer: true,
      customerInfo: {
        name: "Alexandra Anholt",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
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
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    }
  ],
  2: [ // James's conversation
    {
      id: 1,
      text: "I need to return my sweater - it has a tear in the sleeve.",
      time: "5m",
      isCustomer: true,
      customerInfo: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      }
    },
    {
      id: 2,
      text: "I understand your concern, James. I'll help you with the return process. Could you please share a photo of the damaged area?",
      time: "4m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    }
  ],
  3: [ // Sarah's conversation
    {
      id: 1,
      text: "The jacket I received is the wrong size. I ordered a medium but got a small.",
      time: "12m",
      isCustomer: true,
      customerInfo: {
        name: "Sarah Parker",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
      }
    },
    {
      id: 2,
      text: "I apologize for the mix-up, Sarah. Let me check our inventory for the correct size and arrange an exchange for you.",
      time: "10m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    }
  ],
  4: [ // Michael's conversation
    {
      id: 1,
      text: "Is it possible to exchange the shoes I bought? They're a bit tight.",
      time: "25m",
      isCustomer: true,
      customerInfo: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      }
    },
    {
      id: 2,
      text: "Of course, Michael! We can help you with that. What size would you like to exchange them for?",
      time: "23m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    }
  ],
  5: [ // Emma's conversation
    {
      id: 1,
      text: "The color of the dress doesn't match what was shown on the website.",
      time: "1h",
      isCustomer: true,
      customerInfo: {
        name: "Emma Thompson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
      }
    },
    {
      id: 2,
      text: "I'm sorry to hear that, Emma. Could you please share a photo of the dress you received? I'll compare it with our product images.",
      time: "58m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    }
  ],
  6: [ // David's conversation
    {
      id: 1,
      text: "I've been charged twice for my last purchase. Can you help me resolve this?",
      time: "30m",
      isCustomer: true,
      customerInfo: {
        name: "David Rodriguez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      }
    },
    {
      id: 2,
      text: "I apologize for the inconvenience, David. Let me check your transaction history right away. Could you please confirm your order number?",
      time: "28m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    }
  ],
  7: [ // Sophie's conversation
    {
      id: 1,
      text: "Hi! I'm interested in your premium subscription but have some questions about the features.",
      time: "45m",
      isCustomer: true,
      customerInfo: {
        name: "Sophie Anderson",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      }
    },
    {
      id: 2,
      text: "Hello Sophie! I'd be happy to walk you through our premium features. What specific aspects would you like to know more about?",
      time: "42m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    },
    {
      id: 3,
      text: "I'm mainly curious about the AI-powered analytics and team collaboration features.",
      time: "40m",
      isCustomer: true,
      customerInfo: {
        name: "Sophie Anderson",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      }
    }
  ],
  8: [ // Ryan's conversation
    {
      id: 1,
      text: "Your app keeps crashing when I try to export my data. This is urgent as I need these reports for a meeting tomorrow.",
      time: "15m",
      isCustomer: true,
      customerInfo: {
        name: "Ryan Mitchell",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce"
      }
    },
    {
      id: 2,
      text: "Hi Ryan, I understand this is time-sensitive. Could you tell me which version of the app you're using and what type of data you're trying to export?",
      time: "13m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    },
    {
      id: 3,
      text: "I'm on version 2.4.1 and trying to export financial reports as PDF.",
      time: "10m",
      isCustomer: true,
      customerInfo: {
        name: "Ryan Mitchell",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce"
      }
    }
  ]
};

const ChatWindow = ({ conversation, onShowDetails, onShowCopilot, messageInput, setMessageInput }) => {
  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white min-w-[440px] max-w-[516px] [@media(max-width:1024px)]:min-w-[330px] [@media(max-width:1024px)]:max-w-[440px] [@media(max-width:1024px)]:ml-[0px] border-r border-gray-200">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img 
            src={conversation.user.avatar}
            alt={conversation.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-base font-semibold text-gray-900">{conversation.user.name}</h2>
            <p className="text-sm text-gray-500">Active now</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-2 hover:bg-gray-100 rounded-lg" 
            title="Star"
            onClick={onShowDetails}
          >
            <Star className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Notes">
            <FileText className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Call">
            <Phone className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Video">
            <Video className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-500" />
          </button>
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg" 
            title="More"
            onClick={onShowCopilot}
          >
            <MoreHorizontal className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {conversation.messages && conversation.messages.map((message) => (
          <ChatMessage 
            key={message.id}
            message={{
              ...message,
              customerInfo: conversation.user,
              agentInfo: {
                name: "Manish Kumar Shah",
                avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
              }
            }}
          />
        ))}
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-gray-200">
        {/* Reply Dropdown */}
        <div className="flex items-center mb-3">
          <MessageSquare className="w-5 h-5 text-gray-700 stroke-[3] mr-1" />
          <button className="flex items-center space-x-1 text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded">
            <span className="font-medium">Reply</span>
            <ChevronDown className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Main Input Area */}
        <div className="flex flex-col space-y-1.5">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center -ml-2 space-x-1">
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Quick Reply">
                <Zap className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-700 stroke-[2.5]" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Notes">
                <FileText className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-700 stroke-[2.5]" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Image">
                <Image className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-700 stroke-[2.5]" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Emoji">
                <Smile className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-700 stroke-[2.5]" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Clock">
                <Clock className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-700 stroke-[2.5]" />
              </button>
            </div>
            <button
              className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span>Send</span>
              <ChevronDown className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow; 