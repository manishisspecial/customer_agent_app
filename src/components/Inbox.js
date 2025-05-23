import React, { useState } from 'react';
import { Search, Plus, Star, Filter, Clock, MessageSquare, ChevronDown, Settings, Phone, Video, Bell, X } from 'lucide-react';
import InboxNavigation from './InboxNavigation';
import ConversationDetails from './ConversationDetails';
import CopilotButton from './CopilotButton';
import Copilot from './Copilot';

const Inbox = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showDetails, setShowDetails] = useState(true);
  const [showCopilot, setShowCopilot] = useState(false);
  
  const conversations = [
    {
      id: 1,
      user: {
        name: "Alexandra Anholt",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        message: "Hey there, can you help me find my order? I think it should have been delivered by now but I haven't received it.",
        time: "2m",
        status: "active"
      }
    },
    {
      id: 2,
      user: {
        name: "Francesca Lopez",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        message: "I created a new page and I'm...",
        time: "5m",
        status: "active"
      }
    },
    {
      id: 3,
      user: {
        name: "Alan Nader",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        message: "#13896 - Account deletion",
        time: "8m",
        status: "active"
      }
    }
  ];

  const handleInsertAIResponse = (response) => {
    // Handle inserting AI response into the message input
    console.log('Inserting AI response:', response);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Navigation Menu */}
      <InboxNavigation />

      {/* Inbox List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Inbox Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img src="/logo192.png" alt="Logo" className="h-6 w-6" />
              <span className="font-semibold">Inbox</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-gray-100 rounded-md">
                <Search size={16} />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-md">
                <Plus size={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              <Filter size={14} /> Filter
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              <Star size={14} /> Saved
            </button>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div 
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <img 
                  src={conv.user.avatar} 
                  alt={conv.user.name}
                  className="w-8 h-8 rounded-full" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm text-gray-900 truncate">
                      {conv.user.name}
                    </h3>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.user.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedConversation.user.avatar}
                  alt={selectedConversation.user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h2 className="font-semibold text-gray-900">{selectedConversation.user.name}</h2>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CopilotButton 
                  onClick={() => setShowCopilot(!showCopilot)}
                  isActive={showCopilot}
                />
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Phone size={18} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Video size={18} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Bell size={18} />
                </button>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <Settings size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Messages will be rendered here */}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Plus size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Message..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MessageSquare size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>

      {/* Right Sidebar - Details Panel */}
      {showDetails && (
        <div className="w-80 border-l border-gray-200">
          <ConversationDetails 
            conversation={selectedConversation}
            onClose={() => setShowDetails(false)}
          />
        </div>
      )}

      {/* AI Copilot Panel */}
      {showCopilot && (
        <div className="w-80 border-l border-gray-200">
          <Copilot 
            onClose={() => setShowCopilot(false)}
            onInsertResponse={handleInsertAIResponse}
            currentConversation={selectedConversation}
          />
        </div>
      )}
    </div>
  );
};

export default Inbox; 