import React, { useState, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

interface CartItemCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    customizations?: Record<string, string | number | boolean>;
  };
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const [translateX, setTranslateX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    // Limit the swipe to left direction only (negative values)
    const newTranslateX = diff < 0 ? diff : 0;
    
    // Limit the maximum swipe distance
    if (newTranslateX < -60) {
      setTranslateX(-65);
    } else {
      setTranslateX(newTranslateX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // If swiped left more than 40% of the card width
    if (translateX < -60) {
      // Keep the button visible
      setTranslateX(-60);
    } else {
      // Snap back
      setTranslateX(0);
    }
  };

  const handleDeleteClick = () => {
    // Animate before removing
    setTranslateX(-60);
    
    setTimeout(() => {
      removeItem(item.id);
      toast.success(`${item.name} removed from cart`, {
        position: "top-center",
        className: "soft-glass-effect"
      });
    }, 200);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, item.quantity + change);
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="relative  overflow-hidden rounded-2xl mb-4">
      <div 
  className={`
    absolute top-1/2 -translate-y-1/2 right-0
    bg-red-500 w-12 h-12 rounded-full z-10
    flex items-center justify-center 
    transition-all duration-300 
    ${translateX < 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
  `}
  onClick={handleDeleteClick}
>
  <Trash2 className="text-white w-6 h-6 " strokeWidth={1.5} />
</div>

      <div 
        ref={cardRef}
        className={`flex items-center bg-white rounded-2xl p-2 relative transition-transform ${isDragging ? 'swipe-action swiping' : 'swipe-action'} `}
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-14 h-14 mr-3 rounded-xl overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-normal">{item.name}</h3>
          
          {item.customizations && Object.keys(item.customizations).length > 0 && (
            <div className="mt-1 mb-2">
              {Object.entries(item.customizations).map(([key, value]) => (
                <span key={key} className="text-xs bg-pink-50 text-gray-600 px-2 py-0.5 rounded-full mr-1">
                  {typeof value === 'boolean' ? key : `${key}: ${value}`}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <span className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
            
            <div className="flex items-center">
              <button 
                className="bg-pink-100 w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:bg-pink-200 transition-colors"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span className="mx-3 font-medium">{item.quantity}</span>
              <button 
                className="bg-pink-100 w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:bg-pink-200 transition-colors"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
