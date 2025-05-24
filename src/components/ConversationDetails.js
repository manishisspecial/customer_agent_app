import React, { useState } from 'react';
import { ChevronDown, Plus, Link as LinkIcon, X, User, Users, Link } from 'lucide-react';

const ConversationDetails = ({ conversation, onClose, onSwitchPanel }) => {
  const [expandedSections, setExpandedSections] = useState({
    links: true,
    attributes: true,
    userData: true,
    companyDetails: true,
    userMedia: true,
    userTags: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const Section = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-50"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? '' : '-rotate-90'}`} strokeWidth={2.5} />
      </button>
      {isExpanded && (
        <div className="px-4 py-2">
          {children}
        </div>
      )}
    </div>
  );

  const LinkItem = ({ icon: Icon, label }) => (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Icon className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
        <span>{label}</span>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <Plus className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );

  const AttributeItem = ({ label, value, addButton }) => (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-gray-600">{label}</span>
      {addButton ? (
        <button className="text-sm text-blue-600 hover:text-blue-700">+ Add</button>
      ) : (
        <span className="text-sm text-gray-900">{value}</span>
      )}
    </div>
  );

  return (
    <div className="h-full bg-white flex flex-col w-[332px] [@media(max-width:1024px)]:w-[260px] [@media(max-width:1024px)]:ml-[0px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button 
            className={`text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-900 border-b-2 border-[#0057FF] py-1`}
          >
            Details
          </button>
          <div className="h-4 w-[1px] bg-gray-200 mx-2"></div>
          <button 
            onClick={() => onSwitchPanel('copilot')}
            className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-500 hover:text-gray-900 py-1"
          >
            AI Copilot
          </button>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Assignee */}
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-500 uppercase mb-2">Assignee</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" alt="Ellen Edwards" className="w-6 h-6 rounded-full" />
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900">Ellen Edwards</span>
            </div>
            <button className="text-[13px] [@media(max-width:1024px)]:text-xs text-blue-600 hover:text-blue-700">Change</button>
          </div>
        </div>

        {/* Team */}
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-500 uppercase mb-2">Team</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-green-700">D</span>
              </div>
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900">Delivery</span>
            </div>
            <button className="text-[13px] [@media(max-width:1024px)]:text-xs text-blue-600 hover:text-blue-700">Change</button>
          </div>
        </div>

        {/* Links */}
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-500 uppercase mb-2">Links</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900 hover:bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Link className="w-4 h-4 text-gray-400" />
                <span>Tracker ticket</span>
              </div>
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900 hover:bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Link className="w-4 h-4 text-gray-400" />
                <span>Back-office tickets</span>
              </div>
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Conversation Attributes */}
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-500 uppercase mb-2">Conversation Attributes</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900">Subject</span>
              <button className="text-[13px] [@media(max-width:1024px)]:text-xs text-blue-600 hover:text-blue-700">+ Add</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900">ID</span>
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-500">#19859</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900">Priority</span>
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-500">Medium</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900">Version</span>
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-500">V3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900">Language</span>
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-500">English</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900">Legacy</span>
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-500">False</span>
            </div>
          </div>
        </div>

        {/* User Data */}
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-500 uppercase mb-2">User Data</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900">Name</span>
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-500">Alexandra Anholt</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900">Company</span>
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-500">-</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900">Location</span>
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-500">London</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-900">Email</span>
              <span className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-500">alexandra@n...</span>
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-500 uppercase mb-2">Company Details</h3>
          <div className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-500">
            No company details available
          </div>
        </div>

        {/* User Media */}
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-500 uppercase mb-2">User Media</h3>
          <div className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-500">
            No media available
          </div>
        </div>

        {/* User Tags */}
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-[13px] [@media(max-width:1024px)]:text-xs font-medium text-gray-500 uppercase mb-2">User Tags</h3>
          <div className="text-[13px] [@media(max-width:1024px)]:text-xs text-gray-500">
            No tags available
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetails; 