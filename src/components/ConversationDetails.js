import React, { useState } from 'react';
import { ChevronDown, Plus, Link as LinkIcon, X, User, Users } from 'lucide-react';

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
            className={`text-sm font-medium text-gray-900 border-b-2 border-[#0057FF] py-1`}
          >
            Details
          </button>
          <div className="h-4 w-[1px] bg-gray-200 mx-2"></div>
          <button 
            onClick={() => onSwitchPanel('copilot')}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 py-1"
          >
            AI Copilot
          </button>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Assignee & Team */}
        <div className="px-4 py-3 space-y-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
              <span className="text-xs font-medium text-gray-500">ASSIGNEE</span>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-700">Change</button>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://ui-avatars.com/api/?name=Ellen+Edwards&background=0057FF&color=fff"
              alt="Ellen Edwards"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-900">Ellen Edwards</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
              <span className="text-xs font-medium text-gray-500">TEAM</span>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-700">Change</button>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
              D
            </div>
            <span className="text-sm text-gray-900">Delivery</span>
          </div>
        </div>

        {/* Links Section */}
        <Section
          title="LINKS"
          isExpanded={expandedSections.links}
          onToggle={() => toggleSection('links')}
        >
          <div className="space-y-1">
            <LinkItem icon={LinkIcon} label="Tracker ticket" />
            <LinkItem icon={LinkIcon} label="Back-office tickets" />
            <LinkItem icon={LinkIcon} label="Side conversations" />
          </div>
        </Section>

        {/* Conversation Attributes */}
        <Section
          title="CONVERSATION ATTRIBUTES"
          isExpanded={expandedSections.attributes}
          onToggle={() => toggleSection('attributes')}
        >
          <div className="space-y-1">
            <AttributeItem label="Subject" addButton />
            <AttributeItem label="ID" value="#19859" />
            <AttributeItem label="Priority" value="Medium" />
            <AttributeItem label="Version" value="V3" />
            <AttributeItem label="Language" value="English" />
            <AttributeItem label="Legacy" value="False" />
          </div>
        </Section>

        {/* User Data */}
        <Section
          title="USER DATA"
          isExpanded={expandedSections.userData}
          onToggle={() => toggleSection('userData')}
        >
          <div className="space-y-1">
            <AttributeItem label="Name" value="Alexandra Anholt" />
            <AttributeItem label="Company" value="-" />
            <AttributeItem label="Location" value="London" />
            <AttributeItem label="Email" value="alexandra@n..." />
          </div>
          <button className="mt-3 text-sm text-[#0057FF] hover:underline">
            See all
          </button>
        </Section>

        {/* Company Details */}
        <Section
          title="COMPANY DETAILS"
          isExpanded={expandedSections.companyDetails}
          onToggle={() => toggleSection('companyDetails')}
        >
          <div className="text-sm text-gray-500">No company details available</div>
        </Section>

        {/* User Media */}
        <Section
          title="USER MEDIA"
          isExpanded={expandedSections.userMedia}
          onToggle={() => toggleSection('userMedia')}
        >
          <div className="text-sm text-gray-500">No media available</div>
        </Section>

        {/* User Tags */}
        <Section
          title="USER TAGS"
          isExpanded={expandedSections.userTags}
          onToggle={() => toggleSection('userTags')}
        >
          <div className="text-sm text-gray-500">No tags available</div>
        </Section>
      </div>
    </div>
  );
};

export default ConversationDetails; 