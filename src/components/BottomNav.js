import React, { useState } from 'react';
import { MessageSquare, Star, Search, User, Settings, HelpCircle, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BottomNav = ({ onToggleSidebar, isSidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('sessionStart');
    navigate('/');
  };

  return (
    <>
      {/* Profile Menu Overlay */}
      {showProfileMenu && (
        <>
          <div 
            className="hidden [@media(max-width:425px)]:block fixed inset-0 bg-black/20 z-[200]"
            onClick={() => setShowProfileMenu(false)}
          />
          <div className="hidden [@media(max-width:425px)]:block fixed bottom-16 right-2 bg-white rounded-lg shadow-lg z-[201] w-56 py-1">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">Manish Kumar Shah</p>
              <p className="text-xs text-gray-500">manish.shah@beyondchats.com</p>
            </div>
            <button className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-gray-50">
              <User className="w-4 h-4" />
              Profile
            </button>
            <button className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-gray-50">
              <Settings className="w-4 h-4" />
              Account Settings
            </button>
            <button className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-gray-50">
              <HelpCircle className="w-4 h-4" />
              Help & Support
            </button>
            <div className="h-[1px] bg-gray-200 my-1" />
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-gray-50 text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </>
      )}

      {/* Bottom Navigation */}
      <div className="hidden [@media(max-width:425px)]:flex fixed bottom-0 left-0 right-0 h-[60px] bg-white border-t border-gray-200 items-center justify-between px-6 z-[50]">
        <button 
          onClick={onToggleSidebar}
          className="flex flex-col items-center gap-1"
        >
          <Menu className={`w-6 h-6 ${isSidebarOpen ? 'text-blue-600' : 'text-gray-600'}`} />
          <span className={`text-xs ${isSidebarOpen ? 'text-blue-600' : 'text-gray-600'}`}>Menu</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <MessageSquare className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600">Chats</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Star className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600">Starred</span>
        </button>
        <button 
          onClick={() => setShowProfileMenu(true)}
          className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm"
        >
          MK
        </button>
      </div>
    </>
  );
};

export default BottomNav; 