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
import BottomNav from "./components/BottomNav";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const sessionStart = localStorage.getItem('sessionStart');

  // Check if authenticated and session is valid
  if (!isAuthenticated || !sessionStart) {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('sessionStart');
    return <Navigate to="/" replace />;
  }

  // Check session timeout (10 minutes)
  const now = new Date().getTime();
  const sessionTime = now - parseInt(sessionStart);
  if (sessionTime > 10 * 60 * 1000) {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('sessionStart');
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [rightPanel, setRightPanel] = useState('copilot');
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [currentView, setCurrentView] = useState('list');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize as false

  useEffect(() => {
    // Check authentication on mount
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    const sessionStart = localStorage.getItem('sessionStart');
    
    if (!isAuth || !sessionStart) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('sessionStart');
      setIsAuthenticated(false);
      return;
    }

    // Check session timeout
    const now = new Date().getTime();
    const sessionTime = now - parseInt(sessionStart);
    if (sessionTime > 10 * 60 * 1000) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('sessionStart');
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);
  }, []);

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

  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  const is4K = window.innerWidth >= 2560;

  const handleLogin = (credentials) => {
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
    if (isMobile || isTablet) {
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
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
