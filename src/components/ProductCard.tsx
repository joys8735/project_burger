
import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description?: string;
  isVegetarian?: boolean;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  image,
  description,
  isVegetarian,
  onClick
}) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-3 soft-glass-effect"
      onClick={onClick}
    >
      <div className="relative aspect-square mb-3">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover rounded-xl"
        />
        {isVegetarian && (
          <span className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Pure veg
          </span>
        )}
        {originalPrice && originalPrice > price && (
          <span className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
            Sale
          </span>
        )}
      </div>
      
      <h3 className="font-medium text-sm mb-1 line-clamp-1">{name}</h3>
      {description && (
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <span className="font-bold text-base">${price.toFixed(2)}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-xs text-gray-500 line-through ml-2">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button 
          className="bg-primary text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <ShoppingCart size={14} className="mr-1" strokeWidth={1.5} />
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
