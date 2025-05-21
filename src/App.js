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
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#eaf6fb]">
      <Header />
      {/* Main Content */}
      <div className="flex-1 w-full max-w-screen-2xl mx-auto px-0 flex flex-col gap-0 pt-[66px]">
        <div className="flex-1 w-full flex flex-row overflow-x-hidden min-h-0">
          {/* Sidebar: fixed width */}
          <div className="hidden md:flex flex-shrink-0 w-16 min-w-16"><Sidebar /></div>
          {/* InboxPanel: fixed width */}
          <div className="hidden md:flex flex-shrink-0 w-60 min-w-60"><InboxPanel /></div>
          {/* ConversationList: fixed width */}
          <div className="flex-shrink-0 w-72 min-w-[220px] max-w-[320px]"><ConversationList /></div>
          {/* ChatWindow: flexible, always min-w-[350px] */}
          <div className="flex-1 min-w-[350px] min-w-0 flex flex-col overflow-hidden">
            <ChatWindow showDetailsButton={true} onShowDetails={() => setShowDetails(true)} />
          </div>
          {/* DetailsPanel: always show on xl+, overlay drawer on <xl */}
          {/* Overlay backdrop for drawer */}
          <div className={`fixed inset-0 z-40 bg-black/30 transition ${showDetails ? 'block xl:hidden' : 'hidden'}`}
            onClick={() => setShowDetails(false)}
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
        </div>
      </div>
      <Footer />
      <FloatingChat />
    </div>
  );
}

export default App;
