
import React from 'react';

interface CategoryCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="bg-black/80 rounded-2xl w-20 h-20 flex items-center justify-center mb-2 shadow-sm">
        <img 
          src={image} 
          alt={name} 
          className="w-16 h-16 object-contain"
        />
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default CategoryCard;
