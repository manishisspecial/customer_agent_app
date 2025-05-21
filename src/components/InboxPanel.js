import React from "react";
import { Inbox, AtSign, PlusCircle, Users, Eye, Bot, ChevronDown } from "lucide-react";

const InboxPanel = () => {
  return (
    <div className="hidden md:flex w-64 min-w-60 bg-white border-r border-gray-200 flex-col h-full overflow-y-auto">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Inbox</h2>
        <button className="p-1 rounded hover:bg-gray-100 transition"><PlusCircle size={20} /></button>
      </div>
      <nav className="flex-1 px-2 py-2 text-sm text-gray-700">
        <div className="mb-6">
          <div className="font-semibold text-xs text-gray-500 mb-2">Inbox</div>
          <ul className="space-y-1">
            <li><a href="#" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition font-semibold text-black bg-gray-100"><Inbox size={16} />Your inbox <span className="ml-auto text-xs text-gray-400">12</span></a></li>
            <li><a href="#" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition"><AtSign size={16} />Mentions <span className="ml-auto text-xs text-gray-400">12</span></a></li>
            <li><a href="#" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition"><PlusCircle size={16} />Created by you <span className="ml-auto text-xs text-gray-400">4</span></a></li>
            <li><a href="#" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition"><Inbox size={16} />All <span className="ml-auto text-xs text-gray-400">2370</span></a></li>
            <li><a href="#" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition"><Inbox size={16} />Unassigned <span className="ml-auto text-xs text-gray-400">0</span></a></li>
          </ul>
        </div>
        <div className="mb-6">
          <div className="font-semibold text-xs text-gray-500 mb-2">Dashboard</div>
          <ul className="space-y-1">
            <li><a href="#" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition"><ChevronDown size={16} />Team inboxes</a></li>
            <li><a href="#" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition"><Users size={16} />Teammates</a></li>
            <li><a href="#" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition"><Eye size={16} />Views</a></li>
            <li><a href="#" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition"><Bot size={16} />Fin AI Agent</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default InboxPanel; 