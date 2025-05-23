import React from 'react';
import { AtSign, Bell, Clock, MessageSquare, User, X } from 'lucide-react';

const Mentions = ({ onClose }) => {
  const mentions = [
    {
      id: 1,
      type: 'mention',
      user: {
        name: 'Tom Simone',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      message: 'Mentioned you in a conversation',
      time: '2m ago',
    },
    {
      id: 2,
      type: 'assignment',
      user: {
        name: 'Sarah Parker',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
      message: 'Assigned you a conversation',
      time: '5m ago',
    },
    {
      id: 3,
      type: 'notification',
      user: {
        name: 'System',
        avatar: null,
      },
      message: 'New priority conversation needs attention',
      time: '10m ago',
    },
  ];

  return (
    <div className="fixed md:relative inset-0 md:inset-auto z-30 bg-white md:w-80 lg:w-72 xl:w-80 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Mentions</h2>
          <div className="flex items-center gap-2">
            <button className="text-blue-600 text-sm hover:text-blue-700">Mark all as read</button>
            <button 
              className="md:hidden text-gray-400 hover:text-gray-600 p-1"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm border-b border-gray-200">
          <button className="text-gray-900 border-b-2 border-blue-600 pb-2 px-1">All</button>
          <button className="text-gray-500 hover:text-gray-900 pb-2 px-1">Unread</button>
        </div>
      </div>

      {/* Mentions List */}
      <div className="flex-1 overflow-y-auto">
        {mentions.map((mention) => (
          <div
            key={mention.id}
            className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-start gap-3">
              {mention.user.avatar ? (
                <img
                  src={mention.user.avatar}
                  alt={mention.user.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Bell size={16} className="text-gray-600" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-sm text-gray-900 truncate">
                    {mention.user.name}
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {mention.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 truncate">{mention.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-4 gap-2">
          <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded">
            <AtSign size={18} className="text-gray-600" />
            <span className="text-xs text-gray-600">Mentions</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded">
            <MessageSquare size={18} className="text-gray-600" />
            <span className="text-xs text-gray-600">Chats</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded">
            <Clock size={18} className="text-gray-600" />
            <span className="text-xs text-gray-600">Tasks</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded">
            <User size={18} className="text-gray-600" />
            <span className="text-xs text-gray-600">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mentions; 