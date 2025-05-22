import React from "react";
import { Circle } from "lucide-react";

const conversations = [
  { name: "Tom Simone", message: "I'd like a refund, the sweater I received has a torn sleeve.", time: "1m", active: true, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Jim Dietrich", message: "Hi there, I have a question...", time: "3m", avatar: "https://randomuser.me/api/portraits/men/33.jpg" },
  { name: "Kay Brakus", message: "Hi there, I have a question...", time: "5m", avatar: "https://randomuser.me/api/portraits/women/34.jpg" },
  { name: "Kari Emard III", message: "Hi there, I have a question...", time: "7m", avatar: "https://randomuser.me/api/portraits/men/35.jpg" },
  { name: "Shelley Mraz", message: "Hi there, I have a question...", time: "10m", avatar: "https://randomuser.me/api/portraits/women/36.jpg" },
  { name: "Jerry Pagac", message: "Hi there, I have a question...", time: "12m", avatar: "https://randomuser.me/api/portraits/men/37.jpg" },
  { name: "Elizabeth Schoen", message: "Hi there, I have a question...", time: "13m", avatar: "https://randomuser.me/api/portraits/women/38.jpg" },
  { name: "Jenna Bailey", message: "Hi there, I have a question...", time: "14m", avatar: "https://randomuser.me/api/portraits/women/39.jpg" },
  { name: "Willie Larson", message: "Hi there, I have a question...", time: "15m", avatar: "https://randomuser.me/api/portraits/men/40.jpg" },
  { name: "Philip Heaney", message: "Hi there, I have a question...", time: "15m", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
  { name: "Shelley Mraz", message: "Hi there, I have a question...", time: "15m", avatar: "https://randomuser.me/api/portraits/women/42.jpg" },
];

const ConversationList = ({ onSelect }) => {
  return (
    <div className="w-full md:w-72 min-w-[220px] max-w-[320px] bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto animate-fade-in">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <span className="font-semibold text-gray-800 text-base">Mentions</span>
        <span className="text-xs text-gray-500">12 Open</span>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {conversations.map((conv, idx) => (
          <li
            key={idx}
            className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors group relative overflow-hidden ${conv.active ? "bg-blue-50" : "hover:bg-gray-50"}`}
            onClick={onSelect}
          >
            <span className="absolute inset-0 bg-blue-100 opacity-0 group-active:opacity-30 transition-opacity duration-200 pointer-events-none" />
            <div className="relative">
              <img src={conv.avatar} alt={conv.name} className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow" />
              {conv.active && <span className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-3 h-3 border-2 border-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800 text-base truncate">{conv.name}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">{conv.time} {conv.active && <Circle size={10} className="text-blue-500" fill="#3b82f6" />}</span>
              </div>
              <div className="text-xs text-gray-600 truncate group-hover:text-gray-900">{conv.message}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList; 