import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import InboxPanel from "./components/InboxPanel";
import ConversationList from "./components/ConversationList";
import ChatWindow from "./components/ChatWindow";
import ConversationDetails from "./components/ConversationDetails";
import Copilot from "./components/Copilot";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ChatLayout from "./components/ChatLayout";
import { MessageSquare } from "lucide-react";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  useEffect(() => {
    // Check session on mount
    const sessionStart = localStorage.getItem('sessionStart');
    if (!sessionStart) {
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/';
      return;
    }

    // Set up session timeout check
    const checkSession = () => {
      const now = new Date().getTime();
      const sessionTime = now - parseInt(sessionStart);
      if (sessionTime > 10 * 60 * 1000) { // 10 minutes
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('sessionStart');
        window.location.href = '/';
      }
    };

    const interval = setInterval(checkSession, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [rightPanel, setRightPanel] = useState('copilot');
  const [showRightPanel, setShowRightPanel] = useState(window.innerWidth > 768);
  const [messageInput, setMessageInput] = useState('');
  const [currentView, setCurrentView] = useState(window.innerWidth <= 425 ? 'list' : 'chat');
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  
  const isMobile = window.innerWidth <= 425;
  const isTablet = window.innerWidth > 425 && window.innerWidth < 768;
  const is4K = window.innerWidth >= 2560;

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 425) {
        setCurrentView('list');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (credentials) => {
    // Simple authentication logic (replace with your actual auth logic)
    if (credentials.username === 'admin_beyond' && credentials.password === 'beyondChat') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('sessionStart', new Date().getTime().toString());
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
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

  const handleBack = () => {
    if (currentView === 'chat') {
      setCurrentView('list');
    } else {
      setCurrentView('chat');
    }
  };

  const handleInsertResponse = (response) => {
    setMessageInput(response);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex flex-col bg-[#eaf6fb]">
                <Header />
                
                <div className="flex-1 flex pt-[66px]">
                  <Sidebar 
                    isOpen={isSidebarOpen} 
                    setIsOpen={setIsSidebarOpen}
                    isMobile={isMobile || isTablet}
                  />
                  
                  <div className="flex-1 flex overflow-hidden">
                    <div className={`
                      transition-all duration-300
                      ${isSidebarOpen ? 'w-[306px] [@media(max-width:1024px)]:w-[220px]' : 'w-0'}
                      flex-shrink-0 bg-white border-r border-gray-200
                      ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                    `}>
                      <InboxPanel />
                    </div>

                    <div className={`
                      flex flex-1 min-w-0
                      ${is4K ? 'max-w-[2560px] mx-auto' : ''}
                      ml-[-17px]
                    `}>
                      {isMobile ? (
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
                            w-[306px] [@media(max-width:1024px)]:w-[220px] [@media(max-width:768px)]:w-[180px]
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
                              ${isTablet ? 'fixed inset-0 z-50 bg-black/30 flex items-center justify-end' : 'relative'}
                            `}>
                              <div className={`
                                bg-white border-l border-gray-200 h-full
                                ${isTablet ? 'w-[280px] shadow-xl' : 'w-[332px]'}
                              `}>
                                {rightPanel === 'details' ? (
                                  <ConversationDetails 
                                    conversation={selectedConversation}
                                    onClose={isTablet ? handleCloseRightPanel : undefined}
                                    onSwitchPanel={(panel) => setRightPanel(panel)}
                                  />
                                ) : (
                                  <Copilot 
                                    onClose={isTablet ? handleCloseRightPanel : undefined}
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
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
