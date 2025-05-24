import React, { useState } from 'react';
import { X, ChevronDown, MessageSquare, Bot } from 'lucide-react';

const Copilot = ({ onClose, onInsertResponse, currentConversation, onSwitchPanel }) => {
  const [selectedResponse, setSelectedResponse] = useState(null);

  const suggestedResponses = [
    {
      id: 1,
      title: "What is our refund policy for damaged items?",
      response: "Hi, our standard policy for damaged items allows for a full refund within 3 business days of receipt. I've also sent you a document voucher for the inconvenience.",
      sources: [
        "Getting a refund",
        "Loyalty refund means",
        "Refund for damaged gift"
      ]
    }
  ];

  const handleAddToComposer = (response) => {
    onInsertResponse(response);
  };

  return (
    <div className="h-full bg-white flex flex-col w-[332px] [@media(max-width:1024px)]:w-[260px] [@media(max-width:1024px)]:ml-[0px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onSwitchPanel('details')}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 py-1"
          >
            Details
          </button>
          <div className="h-4 w-[1px] bg-gray-200 mx-2"></div>
          <button 
            className={`text-sm font-medium text-gray-900 border-b-2 border-[#0057FF] py-1`}
          >
            AI Copilot
          </button>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {suggestedResponses.map((item) => (
          <div key={item.id} className="mb-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.response}
                </p>
                <button
                  onClick={() => handleAddToComposer(item.response)}
                  className="mt-2 text-xs font-medium text-[#0057FF] hover:underline flex items-center gap-1"
                >
                  Add to composer
                  <ChevronDown className="w-3 h-3" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Sources */}
            <div className="ml-11">
              <h4 className="text-xs font-medium text-gray-500 mb-1">SOURCES</h4>
              <div className="space-y-1">
                {item.sources.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <MessageSquare className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
                    <span>{source}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <MessageSquare className="w-4 h-4" strokeWidth={2.5} />
          Ask a question
        </button>
      </div>
    </div>
  );
};

export default Copilot; 