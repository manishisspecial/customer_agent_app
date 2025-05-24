import React, { useState } from 'react';
import { MessageSquare, Star, Menu, Search, Settings } from 'lucide-react';
import ConversationList from './ConversationList';
import Sidebar from './Sidebar';
import InboxPanel from './InboxPanel';

const Layout = () => {
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Bottom navigation items (mobile only)
  const navItems = [
    { id: 'chats', icon: MessageSquare, label: 'Chats' },
    { id: 'starred', icon: Star, label: 'Starred' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar with Mobile Navigation */}
      <Sidebar isOpen={isInboxOpen} setIsOpen={setIsInboxOpen} />
      
      {/* Inbox Panel */}
      <InboxPanel isOpen={isInboxOpen} setIsOpen={setIsInboxOpen} />

      {/* Chat Window */}
      <div className="flex-1">
        {selectedConversation ? (
          <div className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={selectedConversation.avatar}
                  alt={selectedConversation.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">{selectedConversation.name}</h2>
                  <p className="text-sm text-gray-500">Active now</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Add chat messages here */}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg">
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout; 