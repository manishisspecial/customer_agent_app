import React, { useState, useRef, useEffect } from "react";
import { Star, Clock, Phone, Video, Settings, Plus, Smile, Send, Paperclip, Image, Bot, MoreHorizontal, 
  Zap, FileText, Mail, MessageSquare, Flag, ThumbsUp, ThumbsDown, Reply, ChevronDown } from "lucide-react";
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

  const currentMessages = conversations[conversation.id] || [];

  return (
    <div className="flex-1 flex flex-col h-full bg-white min-w-[440px] max-w-[516px] border-r border-gray-200">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
            {conversation.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">{conversation.name}</h2>
            <p className="text-sm text-gray-500">Active now</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg" 
            title="Star"
            onClick={onShowDetails}
          >
            <Star className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Notes">
            <FileText className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Call">
            <Phone className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Video">
            <Video className="w-5 h-5 text-gray-500" />
          </button>
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg" 
            title="More"
            onClick={onShowCopilot}
          >
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {currentMessages.map(message => (
          <ChatMessage 
            key={message.id}
            message={message}
            isCustomer={message.isCustomer}
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
              className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-gray-500"
              value="Use ⌘K for shortcuts"
              readOnly
            />
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center -ml-2 space-x-1">
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Quick Reply">
                <Zap className="w-5 h-5 text-gray-700 stroke-[2.5]" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Notes">
                <FileText className="w-5 h-5 text-gray-700 stroke-[2.5]" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Image">
                <Image className="w-5 h-5 text-gray-700 stroke-[2.5]" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Emoji">
                <Smile className="w-5 h-5 text-gray-700 stroke-[2.5]" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Clock">
                <Clock className="w-5 h-5 text-gray-700 stroke-[2.5]" />
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