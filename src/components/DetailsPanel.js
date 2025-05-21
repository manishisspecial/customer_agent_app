import React, { useState } from "react";
import { Info, Copy, MoreHorizontal, CheckCircle } from "lucide-react";

const copilotContent = (
  <div className="space-y-3 animate-fade-in">
    <div className="font-semibold text-gray-900">What is our refund policy for damaged items? <Info size={16} className="inline ml-1 text-gray-400 cursor-pointer" title="This is an AI-generated answer." /></div>
    <div className="bg-gray-100 rounded-xl p-4 flex flex-col gap-2">
      <div className="text-sm text-gray-700">Hi &lt;firstname&gt;, thanks for waiting! Once you return the item, we'll issue a full refund within 5 business days.<span className="ml-1"><Info size={14} className="inline text-gray-400 cursor-pointer" title="Policy info" /></span></div>
      <div className="text-sm text-gray-700">I've also sent you a discount voucher for the inconvenience <Info size={14} className="inline text-gray-400 cursor-pointer" title="Voucher info" /></div>
      <div className="flex gap-2 mt-2">
        <button className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition flex items-center gap-1 animate-scale-in"><Copy size={16} /> Add to composer</button>
        <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition flex items-center gap-1 animate-scale-in"><MoreHorizontal size={16} /></button>
      </div>
    </div>
    <div className="text-xs text-gray-500 mt-2">5 relevant sources found</div>
    <ul className="text-xs text-gray-700 space-y-1">
      <li>• Getting a refund</li>
      <li>• Loyalty refund macro</li>
      <li>• Refund for an unwanted gift</li>
    </ul>
    <button className="text-xs text-blue-600 hover:underline mt-1">See all</button>
  </div>
);

const detailsContent = (
  <div className="space-y-6 animate-fade-in">
    <div>
      <div className="text-xs text-gray-500 mb-1">Assignee</div>
      <div className="text-sm text-gray-800 flex items-center gap-1">Unassigned <Info size={14} className="text-gray-400 cursor-pointer" title="No one assigned yet" /></div>
    </div>
    <div>
      <div className="text-xs text-gray-500 mb-1">Team</div>
      <div className="text-sm text-red-500 flex items-center gap-1">Disputes team <CheckCircle size={14} className="text-green-500" /></div>
    </div>
    <div>
      <div className="text-xs text-gray-500 mb-1">Links</div>
      <ul className="text-sm text-blue-600 space-y-1">
        <li><a href="#" className="hover:underline">Tracker tickets</a></li>
        <li><a href="#" className="hover:underline">Back-office tickets</a></li>
        <li><a href="#" className="hover:underline">Side conversations</a></li>
      </ul>
    </div>
    <div>
      <div className="text-xs text-gray-500 mb-1">Conversation attributes</div>
      <ul className="text-sm text-gray-700 space-y-1">
        <li>Id: <span className="text-gray-900 font-medium">113962</span></li>
        <li>Brand: <span className="text-gray-900 font-medium">Elephant clothing</span></li>
        <li>Topic: <span className="text-gray-900 font-medium">Faulty product</span></li>
        <li>Priority: <span className="text-gray-900 font-medium">Select</span></li>
        <li>Product area: <span className="text-gray-900 font-medium">Select</span></li>
        <li>Tag ID: <span className="text-gray-900 font-medium">1233445</span></li>
      </ul>
    </div>
    <div>
      <div className="text-xs text-gray-500 mb-1">Company details</div>
      <div className="text-sm text-gray-700">...</div>
    </div>
    <div>
      <div className="text-xs text-gray-500 mb-1">User notes</div>
      <div className="text-sm text-gray-700">...</div>
    </div>
    <div>
      <div className="text-xs text-gray-500 mb-1">User tags</div>
      <div className="text-sm text-gray-700">...</div>
    </div>
  </div>
);

const DetailsPanel = ({ mobileDrawer }) => {
  const [tab, setTab] = useState("copilot");
  const [composerFeedback, setComposerFeedback] = useState(false);

  const handleAddToComposer = () => {
    setComposerFeedback(true);
    setTimeout(() => setComposerFeedback(false), 1200);
  };

  return (
    <div className={`w-full h-full flex flex-col overflow-y-auto bg-white ${mobileDrawer ? 'max-w-md mx-auto shadow-xl rounded-t-2xl' : ''}`}>
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
        <button
          className={`font-semibold text-gray-800 px-2 py-1 rounded transition ${tab === "details" ? "bg-gray-100" : ""}`}
          onClick={() => setTab("details")}
        >
          Details
        </button>
        <button
          className={`font-semibold text-gray-800 px-2 py-1 rounded transition ${tab === "copilot" ? "bg-gray-100" : ""}`}
          onClick={() => setTab("copilot")}
        >
          Copilot
        </button>
        <span className="flex-1" />
        <button className="p-1 rounded hover:bg-gray-100 transition"><MoreHorizontal size={20} /></button>
      </div>
      <div className="px-6 py-4 flex-1 overflow-y-auto">
        {tab === "copilot" ? (
          <div>
            {copilotContent}
            <div className={`fixed top-20 right-8 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-300 ${composerFeedback ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>Added to composer!</div>
          </div>
        ) : (
          detailsContent
        )}
      </div>
    </div>
  );
};

export default DetailsPanel; 