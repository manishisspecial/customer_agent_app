import React from 'react';
import { MoreHorizontal, MessageSquare } from 'lucide-react';

const ChatLayout = ({ selectedConversation }) => {
  return (
    <div className="flex flex-1 min-w-0">
      {/* Chat Section */}
      <div className="flex-1 bg-white relative [@media(min-width:1440px)]:min-w-[600px] [@media(min-width:1440px)]:ml-[72px]">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
              <div className="flex items-center space-x-3">
                <img
                  src={`https://source.unsplash.com/random/40x40?face&${selectedConversation.id}`}
                  alt={selectedConversation.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-sm font-medium text-gray-900">{selectedConversation.name}</h2>
                  <p className="text-xs text-gray-500">{selectedConversation.lastActive}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="absolute inset-0 top-16 overflow-y-auto px-6 py-4">
              {/* Messages will go here */}
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Select a conversation to start chatting
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Choose a conversation from the list to begin messaging
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              New Conversation
            </button>
          </div>
        )}
      </div>

      {/* Details & Copilot Section */}
      <div className="w-[640px] flex border-l border-gray-200 bg-white">
        <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
          {/* Details content */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">Details</h3>
            {selectedConversation && (
              <div className="mt-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Customer</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedConversation.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedConversation.email}</p>
                  </div>
                  {/* Add more details as needed */}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 overflow-y-auto">
          {/* Copilot content */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">AI Copilot</h3>
            {selectedConversation && (
              <div className="mt-4">
                {/* Add Copilot content */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout; 