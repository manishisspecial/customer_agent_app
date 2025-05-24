import React from "react";
import {
  Home,
  Search,
  Plus,
  Mail,
  Phone,
  Clock,
  Star,
  Users,
  MessageSquare,
  BarChart2,
  Settings,
  HelpCircle,
  User
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const topIcons = [Home, Search, Plus];
  const mainIcons = [Mail, Phone, Clock, Star, Users, MessageSquare, BarChart2, Settings, HelpCircle];

  return (
    <div className={`
      fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200
      transition-all duration-300 z-40
      w-[64px] [@media(min-width:1440px)]:w-[68px]
      [@media(max-width:1024px)]:w-[48px]
      [@media(max-width:768px)]:w-[36px]
    `}>
      <div className="h-full flex flex-col">
        {/* Top Icons */}
        <div className="pt-4 flex flex-col items-center space-y-1">
          {topIcons.map((Icon, index) => (
            <button 
              key={index}
              className="w-10 h-10 [@media(max-width:1024px)]:w-8 [@media(max-width:1024px)]:h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Icon className="w-5 h-5 [@media(min-width:1440px)]:w-6 [@media(min-width:1440px)]:h-6 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4" strokeWidth={2.5} />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-4 mb-4 w-8 [@media(max-width:1024px)]:w-6 h-[1px] bg-gray-200 mx-auto" />

        {/* Spacer to push icons to bottom */}
        <div className="flex-1" />

        {/* Main Icons */}
        <div className="flex flex-col items-center space-y-1 mb-4">
          {mainIcons.map((Icon, index) => (
            <button 
              key={index}
              className="w-10 h-10 [@media(max-width:1024px)]:w-8 [@media(max-width:1024px)]:h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Icon className="w-5 h-5 [@media(min-width:1440px)]:w-6 [@media(min-width:1440px)]:h-6 [@media(max-width:1024px)]:w-4 [@media(max-width:1024px)]:h-4" strokeWidth={2.5} />
            </button>
          ))}
        </div>

        {/* User Profile Icon */}
        <div className="mb-4 flex justify-center">
          <button className="w-10 h-10 [@media(max-width:1024px)]:w-8 [@media(max-width:1024px)]:h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center text-white font-medium [@media(max-width:1024px)]:text-sm">
            MK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 