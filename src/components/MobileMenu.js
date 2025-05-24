import React from 'react';
import { Menu } from 'lucide-react';

const MobileMenu = ({ onToggleSidebar }) => {
  return (
    <button
      onClick={onToggleSidebar}
      className="p-2 hover:bg-gray-100 rounded-full"
    >
      <Menu className="w-6 h-6 text-gray-600" />
    </button>
  );
};

export default MobileMenu; 