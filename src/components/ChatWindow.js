import React, { useState, useRef, useEffect } from "react";
import { Star, Clock, Phone, Video, Settings, Plus, Smile, Send, Paperclip, Image, Bot, MoreHorizontal, 
  Zap, FileText, Mail, MessageSquare, Flag, ThumbsUp, ThumbsDown, Reply, ChevronDown, Search, ArrowLeft } from "lucide-react";
import ChatMessage from './ChatMessage';

// Default avatar to use as fallback
const defaultAvatar = "https://via.placeholder.com/40";

// Each conversation will be a separate array of messages
const conversations = {
  1: [ // Alexandra's conversation - Order tracking
    {
      id: 1,
      text: "Hey there, can you help me find my order? I think it should have been delivered by now but I haven't received it.",
      time: "2m",
      isCustomer: true,
      customerInfo: {
        name: "Alexandra Anholt",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      }
    },
    {
      id: 2,
      text: "",
      time: "2m",
      isCustomer: true,
      customerInfo: {
        name: "Alexandra Anholt",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      attachment: {
        image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7",
        title: "Baies Scented Candle",
        subtitle: "Order #10859"
      }
    },
    {
      id: 3,
      text: "Hi Alexandra! No problem let me look into this for you.",
      time: "2m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    },
    {
      id: 4,
      text: "I can see your order #10859 is currently in transit. According to the tracking information, it's scheduled for delivery tomorrow between 9 AM and 5 PM.",
      time: "2m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    }
  ],
  2: [ // James's conversation - Quality issue with sweater
    {
      id: 1,
      text: "Hi, I received my order today but the quality isn't what I expected. The stitching is coming loose after just trying it on.",
      time: "5m",
      isCustomer: true,
      customerInfo: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      }
    },
    {
      id: 2,
      text: "I'm very sorry to hear about the quality issue, James. Could you please share a photo of the stitching problem?",
      time: "4m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    },
    {
      id: 3,
      text: "Here's where the stitching is coming apart",
      time: "3m",
      isCustomer: true,
      customerInfo: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      },
      attachment: {
        image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
        title: "Damaged Sweater",
        subtitle: "Order #10873"
      }
    }
  ],
  3: [ // Sarah's conversation - Shipping address change
    {
      id: 1,
      text: "Hi, I need to change my shipping address for my recent furniture order. Is it still possible?",
      time: "12m",
      isCustomer: true,
      customerInfo: {
        name: "Sarah Parker",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
      }
    },
    {
      id: 2,
      text: "Hello Sarah! Let me check the status of your order. Could you please provide your order number?",
      time: "10m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    },
    {
      id: 3,
      text: "Yes, it's #11234. Here's the item I ordered:",
      time: "8m",
      isCustomer: true,
      customerInfo: {
        name: "Sarah Parker",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
      },
      attachment: {
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
        title: "Modern Sofa Set",
        subtitle: "Order #11234"
      }
    }
  ],
  4: [ // Michael's conversation - Website technical issue
    {
      id: 1,
      text: "Hi, I'm having trouble uploading my product photos to the marketplace. The upload keeps failing.",
      time: "25m",
      isCustomer: true,
      customerInfo: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      }
    },
    {
      id: 2,
      text: "I'm sorry to hear that, Michael. Could you share a screenshot of the error you're seeing?",
      time: "23m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    },
    {
      id: 3,
      text: "Here's what I see when trying to upload:",
      time: "20m",
      isCustomer: true,
      customerInfo: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      },
      attachment: {
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        title: "Upload Error Screenshot",
        subtitle: "Error Code: UPL-404"
      }
    }
  ],
  5: [ // Emma's conversation - Premium subscription issue
    {
      id: 1,
      text: "Hi, I upgraded to the premium plan but can't access the analytics dashboard. Can you help?",
      time: "1h",
      isCustomer: true,
      customerInfo: {
        name: "Emma Thompson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
      }
    },
    {
      id: 2,
      text: "Hello Emma! I'll help you with your premium access. Could you share what you see when trying to access the dashboard?",
      time: "58m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    },
    {
      id: 3,
      text: "This is what I see when I try to access it:",
      time: "55m",
      isCustomer: true,
      customerInfo: {
        name: "Emma Thompson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
      },
      attachment: {
        image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73",
        title: "Dashboard Access Error",
        subtitle: "Premium Features Locked"
      }
    }
  ],
  6: [ // David's conversation - Billing issue
    {
      id: 1,
      text: "I noticed a duplicate charge on my account for my last purchase. Can you help me resolve this?",
      time: "30m",
      isCustomer: true,
      customerInfo: {
        name: "David Rodriguez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      }
    },
    {
      id: 2,
      text: "Here's my invoice showing the double charge:",
      time: "29m",
      isCustomer: true,
      customerInfo: {
        name: "David Rodriguez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      },
      attachment: {
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
        title: "Invoice Screenshot",
        subtitle: "Transaction ID: 89675"
      }
    },
    {
      id: 3,
      text: "I apologize for this error, David. I can see the duplicate charge and I'll process the refund right away.",
      time: "27m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    }
  ],
  7: [ // Sophie's conversation - Feature inquiry
    {
      id: 1,
      text: "Hi! I'm interested in your team collaboration features. Could you tell me more about the pricing for larger teams?",
      time: "45m",
      isCustomer: true,
      customerInfo: {
        name: "Sophie Anderson",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      }
    },
    {
      id: 2,
      text: "Here's our current team size and needs:",
      time: "44m",
      isCustomer: true,
      customerInfo: {
        name: "Sophie Anderson",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      },
      attachment: {
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        title: "Team Requirements Document",
        subtitle: "25+ team members"
      }
    },
    {
      id: 3,
      text: "Thank you for sharing that, Sophie! I'll be happy to walk you through our enterprise pricing options for teams of that size.",
      time: "42m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    }
  ],
  8: [ // Ryan's conversation - App issue
    {
      id: 1,
      text: "The mobile app keeps crashing when I try to generate reports. This is urgent as I need these for a meeting.",
      time: "15m",
      isCustomer: true,
      customerInfo: {
        name: "Ryan Mitchell",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce"
      }
    },
    {
      id: 2,
      text: "Here's the error I get every time:",
      time: "14m",
      isCustomer: true,
      customerInfo: {
        name: "Ryan Mitchell",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce"
      },
      attachment: {
        image: "https://images.unsplash.com/photo-1525373698358-041e3a460346",
        title: "App Crash Screenshot",
        subtitle: "Error: REP-2023"
      }
    },
    {
      id: 3,
      text: "I'm sorry about this, Ryan. Let me check with our mobile team about this specific error code.",
      time: "12m",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    }
  ]
};

const ChatWindow = ({ 
  conversation, 
  onShowDetails, 
  onShowCopilot, 
  onBack,
  messageInput,
  setMessageInput,
  activePanel 
}) => {
  const [messages, setMessages] = useState(conversations[conversation?.id] || []);

  useEffect(() => {
    if (conversation?.id) {
      setMessages(conversations[conversation.id] || []);
    }
  }, [conversation?.id]);

  const handleSendMessage = (e) => {
    // Prevent default form submission
    if (e) {
      e.preventDefault();
    }
    
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: messageInput,
      time: "Just now",
      isCustomer: false,
      seen: true,
      agentInfo: {
        name: "Manish Kumar Shah",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      }
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  const customerInfo = messages.find(m => m.isCustomer)?.customerInfo || {
    name: conversation.user.name,
    avatar: conversation.user.avatar
  };

  return (
    <div className={`
      flex-1 flex flex-col h-full bg-white
      min-w-[440px] max-w-[516px]
      [@media(max-width:1024px)]:min-w-[330px] [@media(max-width:1024px)]:max-w-[440px]
      [@media(max-width:425px)]:min-w-0 [@media(max-width:425px)]:max-w-full [@media(max-width:425px)]:w-full
      border-r border-gray-200
    `}>
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 [@media(max-width:1024px)]:px-3 [@media(max-width:425px)]:px-2 py-4 [@media(max-width:425px)]:py-2 border-b border-gray-200">
        <div className="flex items-center space-x-4 [@media(max-width:1024px)]:space-x-2 flex-shrink min-w-0 [@media(max-width:1024px)]:max-w-[45%]">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-1 hover:bg-gray-100 rounded-lg [@media(max-width:425px)]:mr-1 hidden [@media(max-width:425px)]:block"
            >
              <ArrowLeft className="w-5 h-5 [@media(max-width:425px)]:w-4 [@media(max-width:425px)]:h-4" />
            </button>
          )}
          <img 
            src={customerInfo.avatar}
            alt={customerInfo.name}
            className="w-10 h-10 [@media(max-width:1024px)]:w-8 [@media(max-width:1024px)]:h-8 rounded-full flex-shrink-0"
          />
          <div className="min-w-0">
            <h2 className="text-base [@media(max-width:1024px)]:text-sm font-semibold text-gray-900 truncate">{customerInfo.name}</h2>
            <p className="text-sm [@media(max-width:1024px)]:text-xs text-gray-500">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 flex-shrink-0">
            <button
            className={`p-2 [@media(max-width:1024px)]:p-1.5 hover:bg-gray-100 rounded-lg ${activePanel === 'details' ? 'bg-gray-100' : ''}`}
            title="Details"
              onClick={onShowDetails}
            >
            <Star className={`w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 ${activePanel === 'details' ? 'text-blue-600' : 'text-gray-500'}`} />
          </button>
          <button className="p-2 [@media(max-width:1024px)]:p-1.5 hover:bg-gray-100 rounded-lg [@media(max-width:425px)]:hidden" title="Notes">
            <FileText className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-500" />
          </button>
          <button className="p-2 [@media(max-width:1024px)]:p-1.5 hover:bg-gray-100 rounded-lg [@media(max-width:425px)]:hidden" title="Call">
            <Phone className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-500" />
          </button>
          <button className="p-2 [@media(max-width:1024px)]:p-1.5 hover:bg-gray-100 rounded-lg [@media(max-width:425px)]:hidden" title="Video">
            <Video className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-500" />
          </button>
          <button 
            className={`p-2 [@media(max-width:1024px)]:p-1.5 hover:bg-gray-100 rounded-lg ${activePanel === 'copilot' ? 'bg-blue-50' : ''}`}
            title="AI Copilot"
            onClick={onShowCopilot}
          >
            <Bot className={`w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 ${activePanel === 'copilot' ? 'text-blue-600' : 'text-gray-500'}`} />
            </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 [@media(max-width:1024px)]:px-4 [@media(max-width:425px)]:px-2 py-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex [@media(min-width:426px)_and_(max-width:1024px)]:justify-center ${message.isCustomer ? 'justify-start' : 'justify-end'} w-full`}
          >
            <div className={`max-w-[85%] [@media(max-width:425px)]:max-w-[90%] rounded-lg p-3 [@media(max-width:425px)]:p-2 ${
              message.isCustomer 
                ? 'bg-gray-100 text-gray-900' 
                : 'bg-[#0057FF] text-white'
            }`}>
              <p className="text-[13px] [@media(max-width:1024px)]:text-xs whitespace-pre-wrap break-words">{message.text}</p>
              {message.attachment && (
                <div className="mt-2 bg-white rounded-md overflow-hidden">
                  {message.attachment.image && (
                    <img 
                      src={message.attachment.image} 
                      alt={message.attachment.title || 'Attachment'} 
                      className="w-full h-32 [@media(max-width:425px)]:h-24 object-cover"
                    />
                  )}
                  {(message.attachment.title || message.attachment.subtitle) && (
                    <div className="p-3 [@media(max-width:425px)]:p-2">
                      {message.attachment.title && (
                        <p className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-900">
                          {message.attachment.title}
                        </p>
                      )}
                      {message.attachment.subtitle && (
                        <p className="text-[11px] [@media(max-width:1024px)]:text-[10px] text-gray-500">
                          {message.attachment.subtitle}
                        </p>
                      )}
                </div>
                  )}
                </div>
                )}
              <div className="mt-1 text-[11px] [@media(max-width:1024px)]:text-[10px] opacity-70">
                {message.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-gray-200">
        <div className="px-6 [@media(max-width:1024px)]:px-4 [@media(max-width:425px)]:px-2 py-4 [@media(max-width:425px)]:py-2">
          {/* Reply Dropdown - Hide on mobile */}
          <div className="flex items-center mb-3 [@media(max-width:425px)]:hidden">
            <MessageSquare className="w-5 h-5 text-gray-700 stroke-[3] mr-1" />
            <button className="flex items-center space-x-1 text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded">
              <span className="font-medium [@media(max-width:1024px)]:text-xs">Reply</span>
              <ChevronDown className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Main Input Area */}
          <div className="flex flex-col space-y-1.5">
            <form onSubmit={handleSendMessage} className="relative [@media(max-width:1024px)]:mr-6 [@media(max-width:425px)]:mr-0">
              <div className="[@media(max-width:425px)]:flex [@media(max-width:425px)]:items-center [@media(max-width:425px)]:gap-2">
                <textarea
                  className="w-full px-4 [@media(max-width:425px)]:px-3 py-3 [@media(max-width:425px)]:py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 resize-none min-h-[44px] [@media(max-width:425px)]:min-h-[38px]"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows="1"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className={`
                    [@media(min-width:426px)]:absolute [@media(min-width:426px)]:right-2 [@media(min-width:426px)]:top-1/2 [@media(min-width:426px)]:-translate-y-1/2
                    [@media(max-width:425px)]:flex-shrink-0 [@media(max-width:425px)]:inline-flex [@media(max-width:425px)]:items-center [@media(max-width:425px)]:justify-center
                    [@media(max-width:425px)]:w-[38px] [@media(max-width:425px)]:h-[38px] [@media(max-width:425px)]:rounded-full
                    flex items-center space-x-1 px-3 py-1.5 text-sm rounded-lg 
                    ${messageInput.trim() ? 'text-white bg-blue-600 hover:bg-blue-700' : 'text-gray-400 bg-gray-100'}
                  `}
                >
                  <Send className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4" />
                  <span className="font-medium [@media(max-width:1024px)]:text-xs [@media(max-width:425px)]:hidden">Send</span>
                </button>
              </div>
            </form>

            {/* Bottom Action Bar - Hide on mobile */}
            <div className="flex items-center justify-between pt-0.5 [@media(max-width:425px)]:hidden">
              <div className="flex items-center -ml-2 space-x-1 [@media(max-width:425px)]:hidden">
                <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0" title="Quick Reply">
                  <Zap className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-700 stroke-[2.5]" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0" title="Notes">
                  <FileText className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-700 stroke-[2.5]" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0" title="Image">
                  <Image className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-700 stroke-[2.5]" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0" title="Emoji">
                  <Smile className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-700 stroke-[2.5]" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0" title="Clock">
                  <Clock className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4 text-gray-700 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow; 