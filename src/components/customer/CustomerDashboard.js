import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import ConversationList from "../ConversationList";
import ChatWindow from "../ChatWindow";
import ConversationDetails from "../ConversationDetails";
import BottomNav from "../BottomNav";
import { MessageSquare, Plus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const CustomerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [currentView, setCurrentView] = useState('list');
  const [isCreatingNewChat, setIsCreatingNewChat] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setShowDetails(false);
      }
      if (width <= 425) {
        setCurrentView('list');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/conversations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }

      const data = await response.json();
      setConversations(data.conversations);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (window.innerWidth <= 768) {
      setCurrentView('chat');
    }
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleNewChat = async () => {
    setIsCreatingNewChat(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          customerId: user.id,
          status: 'pending'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create conversation');
      }

      const data = await response.json();
      navigate(`/conversation/${data.conversation._id}`);
    } catch (error) {
      console.error('Error starting conversation:', error);
      setError(error.message);
    } finally {
      setIsCreatingNewChat(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#eaf6fb]">
      <Header onSignOut={handleSignOut} userEmail={user?.email} isCustomer={true} />
      
      <div className="flex-1 flex pt-[66px] [@media(max-width:425px)]:pb-[60px]">
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
          isMobile={window.innerWidth <= 768}
          isCustomer={true}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <div className={`
            transition-all duration-300
            ${isSidebarOpen ? 'w-[306px] [@media(max-width:1024px)]:w-[220px] [@media(max-width:768px)]:w-[216px]' : 'w-0'}
            flex-shrink-0 bg-white border-r border-gray-200
            ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
            [@media(max-width:425px)]:fixed [@media(max-width:425px)]:-ml-8 [@media(max-width:425px)]:left-0 [@media(max-width:425px)]:top-[66px] [@media(max-width:425px)]:bottom-[60px] [@media(max-width:425px)]:w-[50%] [@media(max-width:425px)]:z-[40]
            [@media(max-width:425px)]:translate-x-0
            ${!isSidebarOpen && '[@media(max-width:425px)]:-translate-x-full'}
          `}>
            {/* Customer Conversations List */}
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <button
                  onClick={handleNewChat}
                  disabled={isCreatingNewChat}
                  className={`w-full flex items-center justify-center px-4 py-2 
                           bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                           transition-colors ${isCreatingNewChat ? 'opacity-75' : ''}`}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Conversation
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ConversationList 
                  onSelect={handleSelectConversation} 
                  selectedId={selectedConversation?.id}
                  customerId={user?.id}
                />
              </div>
            </div>
          </div>

          {/* Mobile overlay */}
          {isSidebarOpen && (
            <div 
              className="hidden [@media(max-width:425px)]:block fixed inset-0 bg-black/30 z-[30]"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <div className={`
            flex flex-1 min-w-0
            ${window.innerWidth >= 2560 ? 'max-w-[2560px] mx-auto' : ''}
          `}>
            {window.innerWidth <= 425 ? (
              <>
                {currentView === 'list' && (
                  <div className="w-full">
                    <ConversationList 
                      onSelect={handleSelectConversation} 
                      selectedId={selectedConversation?.id}
                      customerId={user?.id}
                    />
                  </div>
                )}
                {currentView === 'chat' && (
                  <div className="w-full">
                    <ChatWindow 
                      conversation={selectedConversation}
                      onShowDetails={handleShowDetails}
                      onBack={() => setCurrentView('list')}
                      messageInput={messageInput}
                      setMessageInput={setMessageInput}
                      isCustomer={true}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className={`
                  flex-shrink-0 bg-white border-r border-gray-200
                  w-[306px] [@media(max-width:1024px)]:w-[220px] [@media(max-width:768px)]:w-[216px]
                `}>
                  <ConversationList 
                    onSelect={handleSelectConversation} 
                    selectedId={selectedConversation?.id}
                    customerId={user?.id}
                  />
                </div>
                
                <div className="flex-1 min-w-[306px] [@media(max-width:768px)]:min-w-[250px] bg-white">
                  {selectedConversation ? (
                    <ChatWindow 
                      conversation={selectedConversation}
                      onShowDetails={handleShowDetails}
                      messageInput={messageInput}
                      setMessageInput={setMessageInput}
                      isCustomer={true}
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg [@media(max-width:1024px)]:text-base font-semibold text-gray-900 mb-2">
                        Start a New Conversation
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Get help from our customer service team
                      </p>
                      <button 
                        onClick={handleNewChat}
                        disabled={isCreatingNewChat}
                        className={`px-4 py-2 bg-blue-600 text-white rounded-lg 
                                hover:bg-blue-700 transition-colors flex items-center
                                ${isCreatingNewChat ? 'opacity-75' : ''}`}
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        New Conversation
                      </button>
                    </div>
                  )}
                </div>

                {showDetails && selectedConversation && (
                  <div className={`
                    ${window.innerWidth <= 768 ? 'fixed inset-0 z-50 bg-black/30 flex items-center justify-end' : 'relative'}
                  `}>
                    <div className={`
                      bg-white border-l border-gray-200 h-full
                      ${window.innerWidth <= 768 ? 'w-[280px] shadow-xl' : 'w-[332px]'}
                    `}>
                      <ConversationDetails 
                        conversation={selectedConversation}
                        onClose={window.innerWidth <= 768 ? handleShowDetails : undefined}
                        isCustomer={true}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <BottomNav 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen}
        isCustomer={true}
      />
    </div>
  );
};

export default CustomerDashboard; 