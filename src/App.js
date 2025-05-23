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

// Dashboard Component
const Dashboard = () => {
  const [currentView, setCurrentView] = useState('list');
  const [showDetails, setShowDetails] = useState(true);
  const [showCopilot, setShowCopilot] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      // Responsive layout adjustments
      if (width >= 1024) { // Desktop
        setIsSidebarOpen(true);
        if (width >= 1920) { // Large screens
          setShowDetails(true);
          setShowCopilot(true);
        }
      } else if (width < 768) { // Mobile
        setIsSidebarOpen(false);
        setShowDetails(false);
        setShowCopilot(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive breakpoints
  const is4K = windowWidth >= 2560;
  const isLargeScreen = windowWidth >= 1920 && windowWidth < 2560;
  const isDesktop = windowWidth >= 1280 && windowWidth < 1920;
  const isTablet = windowWidth >= 768 && windowWidth < 1280;
  const isMobile = windowWidth < 768;

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobile || isTablet) {
      setCurrentView('chat');
      setIsSidebarOpen(false);
    }
  };

  const handleShowDetails = () => {
    if (isMobile || isTablet) {
      setCurrentView('details');
    } else {
      setShowDetails(!showDetails);
    }
  };

  const handleShowCopilot = () => {
    if (isMobile || isTablet) {
      setCurrentView('copilot');
    } else {
      setShowCopilot(!showCopilot);
    }
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
            ${isSidebarOpen ? 'w-60 xl:w-72 2xl:w-80' : 'w-0'}
            flex-shrink-0 bg-white border-r border-gray-200
          `}>
            <InboxPanel />
          </div>

          <div className={`
            flex flex-1 min-w-0
            ${is4K ? 'max-w-[2560px] mx-auto' : ''}
          `}>
          {(isTablet || isMobile) ? (
            <>
                {currentView === "list" && (
                  <div className="w-full">
                    <ConversationList 
                      onSelect={handleSelectConversation} 
                      selectedId={selectedConversation?.id} 
                    />
                  </div>
                )}
                {currentView === "chat" && (
                  <div className="w-full">
                    <ChatWindow 
                      conversation={selectedConversation}
                      onShowDetails={handleShowDetails}
                      onShowCopilot={handleShowCopilot}
                      onBack={isMobile ? handleBack : undefined}
                      messageInput={messageInput}
                      setMessageInput={setMessageInput}
                    />
                </div>
              )}
                {currentView === "details" && (
                  <div className="fixed inset-0 z-50 bg-black/30 flex items-end md:items-center justify-center">
                    <div className="w-full max-w-md bg-white rounded-t-2xl shadow-2xl">
                      <button 
                        className="absolute top-4 left-4 z-10 bg-gray-100 rounded-full p-2" 
                        onClick={handleBack}
                      >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                      <ConversationDetails 
                        conversation={selectedConversation}
                        onClose={handleBack}
                      />
                    </div>
                  </div>
                )}
                {currentView === "copilot" && (
                  <div className="fixed inset-0 z-50 bg-black/30 flex items-end md:items-center justify-center">
                    <div className="w-full max-w-md bg-white rounded-t-2xl shadow-2xl">
                      <button 
                        className="absolute top-4 left-4 z-10 bg-gray-100 rounded-full p-2" 
                        onClick={handleBack}
                      >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>
                      <Copilot 
                        conversation={selectedConversation}
                        onClose={handleBack}
                        onInsertResponse={handleInsertResponse}
                      />
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
                <div className={`
                  flex-shrink-0 bg-white border-r border-gray-200
                  w-[280px] lg:w-[320px] xl:w-[360px] 2xl:w-[400px]
                  ml-6
                `}>
                  <ConversationList 
                    onSelect={handleSelectConversation} 
                    selectedId={selectedConversation?.id} 
                  />
                </div>
                
                <div className="flex-1 min-w-[400px] bg-white">
                  {selectedConversation ? (
                    <ChatWindow 
                      conversation={selectedConversation}
                      onShowDetails={handleShowDetails}
                      onShowCopilot={handleShowCopilot}
                      messageInput={messageInput}
                      setMessageInput={setMessageInput}
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
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

                <div className="flex">
                  <div className={`
                    bg-white border-l border-gray-200 transition-all duration-300
                    w-[320px] xl:w-[360px] 2xl:w-[400px]
                    ${showDetails ? 'translate-x-0' : 'translate-x-full'}
                  `}>
                    <div className="h-full relative">
                      <button 
                        onClick={() => setShowDetails(!showDetails)}
                        className="absolute -left-3 top-4 bg-white rounded-l-md p-1 border border-r-0 border-gray-200 shadow-sm"
                      >
                        <svg 
                          width="20" 
                          height="20" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                          className={`transition-transform duration-300 ${showDetails ? 'rotate-0' : 'rotate-180'}`}
                        >
                          <polyline points="15 6 9 12 15 18" />
                        </svg>
                      </button>
                      <ConversationDetails 
                        conversation={selectedConversation}
                        onClose={() => setShowDetails(false)}
                      />
                    </div>
                  </div>

                  <div className={`
                    bg-white border-l border-gray-200 transition-all duration-300
                    w-[320px] xl:w-[360px] 2xl:w-[400px]
                    ${showCopilot ? 'translate-x-0' : 'translate-x-full'}
                  `}>
                    <div className="h-full relative">
                      <button 
                        onClick={() => setShowCopilot(!showCopilot)}
                        className="absolute -left-3 top-4 bg-white rounded-l-md p-1 border border-r-0 border-gray-200 shadow-sm"
                      >
                        <svg 
                          width="20" 
                          height="20" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                          className={`transition-transform duration-300 ${showCopilot ? 'rotate-0' : 'rotate-180'}`}
                        >
                          <polyline points="15 6 9 12 15 18" />
                        </svg>
                      </button>
                      <Copilot 
                        conversation={selectedConversation}
                        onClose={() => setShowCopilot(false)}
                        onInsertResponse={handleInsertResponse}
                      />
                    </div>
              </div>
              </div>
            </>
          )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Main App Component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication on mount
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    if (!authStatus) {
      localStorage.removeItem('sessionStart');
    }
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogin = (credentials) => {
    if (credentials && credentials.username === 'admin_beyond' && credentials.password === 'beyondChat') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('sessionStart', new Date().getTime().toString());
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
