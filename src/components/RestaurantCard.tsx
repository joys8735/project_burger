
import React from 'react';
import { Star } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  cuisine: string;
  deliveryTime?: string;
  onClick: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  image,
  rating,
  cuisine,
  deliveryTime,
  onClick
}) => {
  return (
    <div 
      className="relative w-full rounded-xl overflow-hidden shadow-sm mr-4"
      onClick={onClick}
      style={{ maxWidth: '250px' }}
    >
      <img 
        src={image} 
        alt={name} 
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-base line-clamp-1">{name}</h3>
        <div className="flex items-center mt-1">
          <div className="flex items-center bg-green-100 px-2 py-0.5 rounded text-xs text-green-800">
            <Star size={12} className="fill-green-800" />
            <span className="ml-1">{rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">{cuisine}</span>
        </div>
        {deliveryTime && (
          <div className="text-xs text-gray-500 mt-1">
            {deliveryTime} delivery
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
