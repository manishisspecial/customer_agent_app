import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import InboxPanel from "../InboxPanel";
import ConversationList from "../ConversationList";
import ChatWindow from "../ChatWindow";
import ConversationDetails from "../ConversationDetails";
import Copilot from "../Copilot";
import BottomNav from "../BottomNav";
import { MessageSquare } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const AgentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [rightPanel, setRightPanel] = useState('copilot');
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [currentView, setCurrentView] = useState('list');
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Hide panels by default on tablet and mobile
      if (width <= 768) {
        setShowRightPanel(false);
      } else {
        setShowRightPanel(true);
      }
      // Switch to list view on mobile
      if (width <= 425) {
        setCurrentView('list');
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (window.innerWidth <= 768) {
      setCurrentView('chat');
    }
  };

  const handleShowDetails = () => {
    if (rightPanel === 'details' && showRightPanel) {
      setShowRightPanel(false);
    } else {
      setRightPanel('details');
      setShowRightPanel(true);
    }
  };

  const handleShowCopilot = () => {
    if (rightPanel === 'copilot' && showRightPanel) {
      setShowRightPanel(false);
    } else {
      setRightPanel('copilot');
      setShowRightPanel(true);
    }
  };

  const handleCloseRightPanel = () => {
    setShowRightPanel(false);
  };

  const handleInsertResponse = (response) => {
    setMessageInput(response);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#eaf6fb]">
      <Header onSignOut={signOut} userEmail={user?.email} />
      
      <div className="flex-1 flex pt-[66px] [@media(max-width:425px)]:pb-[60px]">
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
          isMobile={window.innerWidth <= 768}
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
            <InboxPanel isOpen={isSidebarOpen} />
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
                    />
                  </div>
                )}
                {currentView === 'chat' && (
                  <div className="w-full">
                    <ChatWindow 
                      conversation={selectedConversation}
                      onShowDetails={handleShowDetails}
                      onShowCopilot={handleShowCopilot}
                      onBack={() => setCurrentView('list')}
                      messageInput={messageInput}
                      setMessageInput={setMessageInput}
                      activePanel={showRightPanel ? rightPanel : null}
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
                  />
                </div>
                
                <div className="flex-1 min-w-[306px] [@media(max-width:768px)]:min-w-[250px] bg-white">
                  {selectedConversation ? (
                    <ChatWindow 
                      conversation={selectedConversation}
                      onShowDetails={handleShowDetails}
                      onShowCopilot={handleShowCopilot}
                      messageInput={messageInput}
                      setMessageInput={setMessageInput}
                      activePanel={showRightPanel ? rightPanel : null}
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg [@media(max-width:1024px)]:text-base font-semibold text-gray-900 mb-2">
                        Select a conversation to start chatting
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Choose a conversation from the list to begin messaging
                      </p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        New Conversation
                      </button>
                    </div>
                  )}
                </div>

                {showRightPanel && (
                  <div className={`
                    ${window.innerWidth <= 768 ? 'fixed inset-0 z-50 bg-black/30 flex items-center justify-end' : 'relative'}
                  `}>
                    <div className={`
                      bg-white border-l border-gray-200 h-full
                      ${window.innerWidth <= 768 ? 'w-[280px] shadow-xl' : 'w-[332px]'}
                    `}>
                      {rightPanel === 'details' ? (
                        <ConversationDetails 
                          conversation={selectedConversation}
                          onClose={window.innerWidth <= 768 ? handleCloseRightPanel : undefined}
                          onSwitchPanel={(panel) => setRightPanel(panel)}
                        />
                      ) : (
                        <Copilot 
                          onClose={window.innerWidth <= 768 ? handleCloseRightPanel : undefined}
                          onInsertResponse={handleInsertResponse}
                          currentConversation={selectedConversation}
                          onSwitchPanel={(panel) => setRightPanel(panel)}
                        />
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <BottomNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default AgentDashboard; 