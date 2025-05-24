import React from 'react';
import { Search, Camera, MoreVertical } from 'lucide-react';

const MobileHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#008069] text-white">
      <div className="text-lg font-semibold">BeyondChat</div>
      <div className="flex items-center space-x-4">
        <Search className="w-5 h-5" />
        <Camera className="w-5 h-5" />
        <MoreVertical className="w-5 h-5" />
      </div>
    </div>
  );
};

export default MobileHeader; 