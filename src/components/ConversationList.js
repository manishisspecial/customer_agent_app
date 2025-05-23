import React from "react";
import { ChevronDown, MoreHorizontal, User, MessageSquare } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Alexandra Anholt",
    message: "Hey there, can you help me find my order?",
    time: "2m",
    active: true
  },
  {
    id: 2,
    name: "James Wilson",
    message: "I need to return my sweater - it has a tear in the sleeve.",
    time: "5m",
    active: true
  },
  {
    id: 3,
    name: "Sarah Parker",
    message: "The jacket I received is the wrong size.",
    time: "12m"
  },
  {
    id: 4,
    name: "Michael Chen",
    message: "Is it possible to exchange the shoes I bought?",
    time: "25m"
  },
  {
    id: 5,
    name: "Emma Thompson",
    message: "The color of the dress doesn't match.",
    time: "1h"
  }
];

const ConversationList = ({ onSelect, selectedId }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>
          <button className="flex items-center text-sm text-gray-600">
            <span>5 Open</span>
            <ChevronDown className="w-4 h-4 ml-1" />
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
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100
                ${selectedId === conversation.id ? 'bg-blue-50' : ''}
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className={`text-sm truncate ${conversation.active ? 'text-gray-900' : 'text-gray-500'}`}>
                    {conversation.message}
                  </p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Select a conversation to start chatting
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Choose from your active conversations or start a new one
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Start New Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList; 