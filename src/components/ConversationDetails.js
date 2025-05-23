import React, { useState } from 'react';
import { ChevronDown, Plus, Link as LinkIcon } from 'lucide-react';

const ConversationDetails = ({ conversation, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    links: false,
    attributes: true,
    userData: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Sample conversation data (replace with actual data)
  const conversationData = {
    assignee: {
      name: "Ellen Edwards",
      avatar: "https://ui-avatars.com/api/?name=Ellen+Edwards&background=0057FF&color=fff"
    },
    team: {
      name: "Delivery",
      avatar: "https://ui-avatars.com/api/?name=Delivery&background=4CAF50&color=fff"
    },
    links: {
      trackerTicket: "#TK-123",
      backOfficeTickets: ["#BO-456", "#BO-789"],
      sideConversations: ["#SC-001"]
    },
    attributes: {
      subject: "+ Add",
      id: "#19859",
      priority: "Medium",
      version: "V3",
      language: "English",
      legacy: "False"
    },
    userData: {
      name: "Alexandra An...",
      company: "-",
      location: "London",
      email: "alexandra@n..."
    }
  };

  const SectionHeader = ({ title, isExpanded, onClick }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      {title}
      <ChevronDown
        className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? '' : '-rotate-90'}`}
      />
    </button>
  );

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="p-4">
        {/* Assignee and Team Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-2">
            <img
              src={conversationData.assignee.avatar}
              alt={conversationData.assignee.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-700">{conversationData.assignee.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src={conversationData.team.avatar}
              alt={conversationData.team.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-700">{conversationData.team.name}</span>
          </div>
        </div>

        {/* Links Section */}
        <div className="border-t border-gray-200 py-3">
          <SectionHeader
            title="LINKS"
            isExpanded={expandedSections.links}
            onClick={() => toggleSection('links')}
          />
          {expandedSections.links && (
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Tracker ticket</span>
                </div>
                <button className="flex items-center text-gray-400 hover:text-gray-600">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Back-office tickets</span>
                </div>
                <button className="flex items-center text-gray-400 hover:text-gray-600">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Side conversations</span>
                </div>
                <button className="flex items-center text-gray-400 hover:text-gray-600">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Conversation Attributes Section */}
        <div className="border-t border-gray-200 py-3">
          <SectionHeader
            title="CONVERSATION ATTRIBUTES"
            isExpanded={expandedSections.attributes}
            onClick={() => toggleSection('attributes')}
          />
          {expandedSections.attributes && (
            <div className="mt-2 space-y-2">
              {Object.entries(conversationData.attributes).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">{key}</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Data Section */}
        <div className="border-t border-gray-200 py-3">
          <SectionHeader
            title="USER DATA"
            isExpanded={expandedSections.userData}
            onClick={() => toggleSection('userData')}
          />
          {expandedSections.userData && (
            <div className="mt-2 space-y-2">
              {Object.entries(conversationData.userData).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">{key}</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* See all link */}
        <div className="border-t border-gray-200 pt-3">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            See all
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetails; 