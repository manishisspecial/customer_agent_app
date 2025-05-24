import React, { useState } from 'react';
import { X, ChevronDown, MessageSquare, Bot, ArrowRight } from 'lucide-react';

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
            className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-500 hover:text-gray-900 py-1"
          >
            Details
          </button>
          <div className="h-4 w-[1px] bg-gray-200 mx-2"></div>
          <button 
            className={`text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-900 border-b-2 border-[#0057FF] py-1`}
          >
            AI Copilot
          </button>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Question */}
          <div className="mb-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-900 mb-2">
                  What is our refund policy for damaged items?
                </h3>
                <p className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-700">
                  Hi, our standard policy for damaged items allows for a full refund within 3 business days of receipt. I've also sent you a document voucher for the inconvenience.
                </p>
              </div>
            </div>
          </div>

          {/* Sources */}
          <div className="mb-4">
            <h4 className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-500 uppercase mb-2">
              Sources
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-700">Getting a refund</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-700">Loyalty refund means</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-700">Refund for damaged gift</span>
              </div>
            </div>
          </div>

          {/* Add to composer button */}
          <button 
            onClick={() => onInsertResponse("Hi, our standard policy for damaged items allows for a full refund within 3 business days of receipt. I've also sent you a document voucher for the inconvenience.")}
            className="w-full flex items-center justify-between text-[13px] [@media(max-width:1024px)]:text-xs text-gray-700 hover:bg-gray-50 p-2 rounded-lg"
          >
            <span>Add to composer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 text-[13px] [@media(max-width:1024px)]:text-xs text-gray-600 hover:text-gray-900">
          <MessageSquare className="w-4 h-4" strokeWidth={2.5} />
          Ask a question
        </button>
      </div>
    </div>
  );
};

export default Copilot; 