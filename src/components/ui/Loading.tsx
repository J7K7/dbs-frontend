import React from 'react';

const Loading: React.FC = () => {
  return (
    <div id="loading-wrapper" className="fixed w-full h-full top-0 left-0 bg-gray-900 opacity-75 z-50">
      <div id="loading-content" className="absolute inset-0 m-auto w-24 h-24 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
