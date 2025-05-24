import React, { useState, useEffect } from "react";
import { Search, Bell, Settings, MoreHorizontal, Camera, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('sessionStart');
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-[66px] bg-white border-b border-gray-200 z-50">
      {/* Desktop/Tablet Header - Hidden on Mobile */}
      <div className="[@media(max-width:425px)]:hidden h-full flex items-center justify-between px-4">
        <span className="font-semibold text-xl">BeyondChats</span>
        <div className="w-96 relative">
          <input
            type="text"
            placeholder="Search conversations, users, or teams..."
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4" strokeWidth={2.5} />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <Settings className="w-5 h-5 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4" strokeWidth={2.5} />
          </button>
          <div className="relative">
            <button 
              className="flex items-center space-x-2"
              onClick={() => setShowAccountMenu(!showAccountMenu)}
            >
              <span className="text-sm [@media(max-width:1024px)]:text-xs text-gray-700">Manish Kumar Shah</span>
              <div className="h-8 w-8 [@media(max-width:1024px)]:w-7 [@media(max-width:1024px)]:h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm [@media(max-width:1024px)]:text-xs">
                MK
              </div>
            </button>
            
            {showAccountMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Customer Service Agent</p>
                  <p className="text-xs text-gray-500">manish.shah@beyondchats.com</p>
                </div>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {/* Handle View Profile */}}
                >
                  View Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {/* Handle Edit Profile */}}
                >
                  Edit Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {/* Handle Settings */}}
                >
                  Settings
                </button>
                <div className="border-t border-gray-100">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header - Only shown on Mobile */}
      <div className="hidden [@media(max-width:425px)]:flex h-14 items-center justify-between px-4">
        <span className="font-semibold text-lg">BeyondChats</span>
        
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
            <Camera className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Mobile Settings Menu */}
            {showMobileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-50" 
                  onClick={() => setShowMobileMenu(false)}
                />
                <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg py-1 z-50">
                  <button className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-gray-50">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-gray-50">
                    <Bell className="w-4 h-4" />
                    Notifications
                  </button>
                  <button className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-gray-50">
                    <Search className="w-4 h-4" />
                    Search Settings
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 