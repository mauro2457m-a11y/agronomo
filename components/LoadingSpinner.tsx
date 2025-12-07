
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-16">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-600"></div>
       <p className="ml-4 text-lg text-gray-600">Buscando dados com IA...</p>
    </div>
  );
};

export default LoadingSpinner;
