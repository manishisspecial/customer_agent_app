import React from "react";
import { Home, Inbox, Users, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-16 min-w-16 bg-white border-r border-gray-200 flex-col items-center py-4 h-full">
      {/* Logo */}
      <img src="/logo192.png" alt="BeyondChats Logo" className="h-8 w-8 mb-8" />
      {/* Sidebar nav icons */}
      <div className="flex flex-col gap-8 mt-4 text-gray-500">
        <button className="hover:text-blue-600 transition-colors" title="Home"><Home size={24} /></button>
        <button className="hover:text-blue-600 transition-colors" title="Inbox"><Inbox size={24} /></button>
        <button className="hover:text-blue-600 transition-colors" title="Users"><Users size={24} /></button>
        <button className="hover:text-blue-600 transition-colors" title="Settings"><Settings size={24} /></button>
      </div>
    </aside>
  );
};

export default Sidebar; 