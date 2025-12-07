
import React from 'react';
import { LeafIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-3">
        <LeafIcon className="h-8 w-8 text-green-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          Guia do Agrônomo
        </h1>
      </div>
    </header>
  );
};

export default Header;
