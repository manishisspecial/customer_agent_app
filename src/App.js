import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import InboxPanel from "./components/InboxPanel";
import ConversationList from "./components/ConversationList";
import ChatWindow from "./components/ChatWindow";
import DetailsPanel from "./components/DetailsPanel";
import FloatingChat from "./components/FloatingChat";
import Footer from "./components/Footer";

function App() {
  // New state for navigation and overlays
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState("list"); // 'list', 'chat', 'details'
  const [showDetails, setShowDetails] = useState(false);

  // Helper for responsive detection
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1280;
  const isMobile = window.innerWidth < 640;

  // Handlers for navigation
  const handleSelectConversation = () => {
    if (isTablet || isMobile) setPanel("chat");
  };
  const handleBackToList = () => {
    if (isTablet || isMobile) setPanel("list");
  };
  const handleShowDetails = () => {
    if (isTablet || isMobile) setPanel("details");
    else setShowDetails(true);
  };
  const handleCloseDetails = () => {
    if (isTablet || isMobile) setPanel("chat");
    else setShowDetails(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#eaf6fb]">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {/* Main Content */}
      <div className="flex-1 w-full max-w-screen-2xl mx-auto px-0 flex flex-col gap-0 pt-[66px]">
        <div className="flex-1 w-full flex flex-row overflow-x-hidden min-h-0">
          {/* Sidebar: fixed width */}
          <div className="hidden md:flex flex-shrink-0 w-16 min-w-16"><Sidebar /></div>
          {/* InboxPanel: fixed width */}
          <div className="hidden md:flex flex-shrink-0 w-60 min-w-60"><InboxPanel /></div>
          {/* Tablet/Mobile Navigation */}
          {(isTablet || isMobile) ? (
            <>
              {panel === "list" && (
                <div className="flex-1 min-w-0"><ConversationList onSelect={handleSelectConversation} /></div>
              )}
              {panel === "chat" && (
                <div className="flex-1 min-w-0 animate-fade-in">
                  <ChatWindow showDetailsButton={true} onShowDetails={handleShowDetails} onBack={handleBackToList} />
                </div>
              )}
              {panel === "details" && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-end md:items-center justify-center animate-fade-in">
                  <div className="w-full max-w-md bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 animate-slide-up relative">
                    <button className="absolute top-4 left-4 z-10 bg-gray-100 rounded-full p-2 shadow hover:bg-gray-200" onClick={handleCloseDetails} aria-label="Back">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <DetailsPanel mobileDrawer={true} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* ConversationList: fixed width */}
              <div className="flex-shrink-0 w-72 min-w-[220px] max-w-[320px]"><ConversationList onSelect={handleSelectConversation} /></div>
              {/* ChatWindow: flexible, always min-w-[350px] */}
              <div className="flex-1 min-w-[350px] min-w-0 flex flex-col overflow-hidden">
                <ChatWindow showDetailsButton={true} onShowDetails={handleShowDetails} />
              </div>
              {/* DetailsPanel: always show on xl+, overlay drawer on <xl */}
              {/* Overlay backdrop for drawer */}
              <div className={`fixed inset-0 z-40 bg-black/30 transition ${showDetails ? 'block xl:hidden' : 'hidden'}`}
                onClick={handleCloseDetails}
              />
              {/* Drawer for <xl */}
              <div className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 bg-white border-l border-gray-200 shadow-lg w-full max-w-md xl:hidden ${showDetails ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ minWidth: '320px' }}
              >
                <DetailsPanel mobileDrawer={true} />
              </div>
              {/* Side panel for xl+ */}
              <div className="hidden xl:flex flex-shrink-0 w-80 min-w-[320px] max-w-[400px] border-l border-gray-200 bg-white">
                <DetailsPanel mobileDrawer={false} />
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
      {/* Only show FloatingChat if no overlays/menus are open */}
      {!(menuOpen || panel === "details" || showDetails) && <FloatingChat />}
    </div>
  );
}

export default App;
