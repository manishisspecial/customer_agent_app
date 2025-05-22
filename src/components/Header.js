import React from "react";
import { ChevronDown, Menu } from "lucide-react";

const Header = ({ menuOpen, setMenuOpen }) => {
  const [productOpen, setProductOpen] = React.useState(false);
  const [resourcesOpen, setResourcesOpen] = React.useState(false);
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 lg:px-12 py-3 bg-white/80 backdrop-blur border-b border-gray-200 z-30 shadow-sm">
      {/* Left: Logo + Nav */}
      <div className="flex items-center gap-2 lg:gap-8">
        <button className="flex items-center gap-1 group">
          <img src="/logo192.png" alt="Logo" className="h-8 w-8" />
          <ChevronDown className="text-gray-500 group-hover:text-black" size={18} />
        </button>
        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-6 text-gray-800 font-medium">
          <a href="#" className="hover:text-blue-600">Home</a>
          <div className="relative">
            <button onClick={()=>setProductOpen(v=>!v)} className="flex items-center gap-1 hover:text-blue-600">Product <ChevronDown size={16} className="mt-0.5" /></button>
            {productOpen && (
              <div className="absolute left-0 top-full mt-2 bg-white border rounded shadow-lg min-w-[180px] p-2 z-40">
                <a href="#" className="block px-3 py-2 hover:bg-gray-100 rounded">Helpdesk</a>
                <a href="#" className="block px-3 py-2 hover:bg-gray-100 rounded">Fin AI Agent</a>
                <a href="#" className="block px-3 py-2 hover:bg-gray-100 rounded">Tickets</a>
                <a href="#" className="block px-3 py-2 hover:bg-gray-100 rounded">Omnichannel</a>
              </div>
            )}
          </div>
          <a href="#" className="hover:text-blue-600">Customers</a>
          <div className="relative">
            <button onClick={()=>setResourcesOpen(v=>!v)} className="flex items-center gap-1 hover:text-blue-600">Resources <ChevronDown size={16} className="mt-0.5" /></button>
            {resourcesOpen && (
              <div className="absolute left-0 top-full mt-2 bg-white border rounded shadow-lg min-w-[180px] p-2 z-40">
                <a href="#" className="block px-3 py-2 hover:bg-gray-100 rounded">Events</a>
                <a href="#" className="block px-3 py-2 hover:bg-gray-100 rounded">Blog</a>
                <a href="#" className="block px-3 py-2 hover:bg-gray-100 rounded">Academy</a>
                <a href="#" className="block px-3 py-2 hover:bg-gray-100 rounded">Help Center</a>
              </div>
            )}
          </div>
          <a href="#" className="hover:text-blue-600">Pricing</a>
        </nav>
      </div>
      {/* Right: Actions */}
      <div className="hidden lg:flex items-center gap-2 xl:gap-6">
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Contact sales</a>
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Sign in</a>
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">View demo</a>
        <button className="bg-black text-white px-5 py-2 rounded font-semibold hover:bg-gray-800 transition text-base shadow">Start free trial</button>
      </div>
      {/* Hamburger for mobile/tablet */}
      <button className="lg:hidden flex items-center p-2" onClick={() => setMenuOpen(!menuOpen)}>
        <Menu size={28} />
      </button>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-2 p-4 lg:hidden z-40 animate-fade-in">
          <nav className="flex flex-col gap-2 text-gray-800 font-medium">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">Product</a>
            <a href="#" className="hover:text-blue-600">Customers</a>
            <a href="#" className="hover:text-blue-600">Resources</a>
            <a href="#" className="hover:text-blue-600">Pricing</a>
          </nav>
          <div className="flex flex-col gap-2 mt-2">
            <a href="#" className="text-gray-700 hover:text-blue-600 text-left">Contact sales</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 text-left">Sign in</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 text-left">View demo</a>
            <button className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition">Start free trial</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 