import React from "react";

const FloatingChat = ({ visible = true }) => {
  if (!visible) return null;
  return (
    <div
      className="fixed left-4 right-4 md:left-8 md:right-auto bottom-8 md:bottom-10 w-full max-w-xs md:max-w-sm bg-gradient-to-br from-blue-50 to-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-200 z-[100] flex flex-col animate-fade-in-up transition-all duration-500"
      style={{ pointerEvents: 'auto', maxWidth: 'min(100vw - 2rem, 22rem)', marginBottom: 'env(safe-area-inset-bottom, 2rem)' }}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-blue-100 bg-blue-50/60 rounded-t-2xl">
        <img src="/logo192.png" alt="Fin" className="h-6 w-6 rounded-full shadow" />
        <span className="font-semibold text-blue-800">Fin</span>
      </div>
      <div className="p-4 flex-1">
        <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-lg mb-2 max-w-xs shadow animate-bounce-in">I'd like a refund, the sweater I received has a torn sleeve.</div>
      </div>
      <div className="px-4 py-2 border-t border-blue-100 bg-blue-50/60 rounded-b-2xl">
        <input type="text" placeholder="Message..." className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/80" />
      </div>
    </div>
  );
};

export default FloatingChat; 