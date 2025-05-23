import React from 'react';
import { Bot } from 'lucide-react';

const CopilotButton = ({ onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
        isActive 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Bot size={16} />
      <span>AI Copilot</span>
    </button>
  );
};

export default CopilotButton; 