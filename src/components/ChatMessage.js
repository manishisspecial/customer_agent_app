import React from 'react';
import { Check, ThumbsUp, ThumbsDown, Reply, MoreHorizontal } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const { text, time, isCustomer, customerInfo, agentInfo, attachment, seen } = message;
  
  return (
    <div className={`flex ${isCustomer ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex ${isCustomer ? 'flex-row' : 'flex-row-reverse'} items-start max-w-[70%] gap-2`}>
        <img
          src={isCustomer ? customerInfo.avatar : agentInfo.avatar}
          alt={isCustomer ? customerInfo.name : agentInfo.name}
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
        <div>
          <div className={`flex items-center gap-2 ${isCustomer ? '' : 'flex-row-reverse'} mb-1`}>
            <span className="text-sm font-medium text-gray-900">
              {isCustomer ? customerInfo.name : agentInfo.name}
            </span>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          
          <div className={`
            rounded-lg p-3 
            ${isCustomer 
              ? 'bg-gray-100 text-gray-900' 
              : 'bg-blue-600 text-white'
            }
          `}>
            {text && <p className="text-sm whitespace-pre-wrap">{text}</p>}
            
            {attachment && (
              <div className="mt-2 bg-white rounded-md overflow-hidden">
                {attachment.image && (
                  <img 
                    src={attachment.image} 
                    alt={attachment.title || 'Attachment'} 
                    className="w-full h-32 object-cover"
                  />
                )}
                {(attachment.title || attachment.subtitle) && (
                  <div className="p-3">
                    {attachment.title && (
                      <p className="text-sm font-medium text-gray-900">{attachment.title}</p>
                    )}
                    {attachment.subtitle && (
                      <p className="text-xs text-gray-500">{attachment.subtitle}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {!isCustomer && seen && (
            <div className="flex justify-end mt-1">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Check className="w-3 h-3 [@media(max-width:1024px)]:w-2.5 [@media(max-width:1024px)]:h-2.5" strokeWidth={2.5} />
                <span>Seen</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 