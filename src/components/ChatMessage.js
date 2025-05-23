import React from 'react';
import { Check } from 'lucide-react';

const ChatMessage = ({ message, isCustomer }) => {
  const personInfo = isCustomer ? message.customerInfo : message.agentInfo;

  return (
    <div className={`flex ${isCustomer ? 'justify-start' : 'justify-end'} mb-4 group`}>
      {/* Message Container */}
      <div className={`flex max-w-[70%] ${isCustomer ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          {personInfo?.avatar ? (
            <img 
              src={personInfo.avatar}
              alt={personInfo.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
              {personInfo?.name?.charAt(0) || 'A'}
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isCustomer ? 'ml-2' : 'mr-2'}`}>
          <div className={`
            px-4 py-2 rounded-2xl
            ${isCustomer 
              ? 'bg-gray-100 text-gray-900' 
              : 'bg-blue-50 text-gray-900'
            }
          `}>
            <p className="text-[15px] leading-[1.375rem] font-[-apple-system,BlinkMacSystemFont,Segoe_UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira_Sans,Droid_Sans,Helvetica_Neue,sans-serif]">
              {message.text}
            </p>
            {message.attachment && (
              <div className="mt-2 bg-white rounded-lg p-3 flex items-start space-x-3 border border-gray-200">
                <img 
                  src={message.attachment.image} 
                  alt={message.attachment.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{message.attachment.title}</p>
                  <p className="text-xs text-gray-500">{message.attachment.subtitle}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Message Meta */}
          <div className={`
            flex items-center text-xs text-gray-500 mt-1
            ${isCustomer ? 'ml-1' : 'justify-end mr-1'}
            font-[-apple-system,BlinkMacSystemFont,Segoe_UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira_Sans,Droid_Sans,Helvetica_Neue,sans-serif]
          `}>
            <span>{message.time}</span>
            {!isCustomer && message.seen && (
              <>
                <span className="mx-1">•</span>
                <span className="flex items-center">
                  Seen
                  <Check className="w-3 h-3 ml-1" />
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 