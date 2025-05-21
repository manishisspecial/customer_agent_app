import React from "react";

const FloatingChat = () => {
  return (
    <div
      className="fixed left-4 right-4 md:left-8 md:right-auto bottom-8 md:bottom-10 w-full max-w-xs md:max-w-sm bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200 z-[100] flex flex-col animate-fade-in transition-all duration-300"
      style={{ pointerEvents: 'auto', maxWidth: 'min(100vw - 2rem, 22rem)', marginBottom: 'env(safe-area-inset-bottom, 2rem)' }}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100">
        <img src="/logo192.png" alt="Fin" className="h-6 w-6 rounded-full" />
        <span className="font-semibold text-gray-800">Fin</span>
      </div>
      <div className="p-4 flex-1">
        <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-lg mb-2 max-w-xs">I'd like a refund, the sweater I received has a torn sleeve.</div>
      </div>
      <div className="px-4 py-2 border-t border-gray-100">
        <input type="text" placeholder="Message..." className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
    </div>
  );
};

export default FloatingChat; 