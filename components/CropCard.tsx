
import React from 'react';
import { Crop } from '../types';

interface CropCardProps {
  crop: Crop;
  onSelect: (crop: Crop) => void;
}

const CropCard: React.FC<CropCardProps> = ({ crop, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(crop)}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
    >
      <img src={crop.imageUrl} alt={crop.name} className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 text-center group-hover:text-green-700 transition-colors">
          {crop.name}
        </h3>
      </div>
    </div>
  );
};

export default CropCard;
