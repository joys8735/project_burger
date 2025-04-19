
import React, { useState } from 'react';
import { X, Minus, Plus, Heart, ShoppingBag } from 'lucide-react';
import { useCart, CartItem } from '../context/CartContext';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

interface ProductModalProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    options?: {
      name: string;
      type: 'radio' | 'checkbox';
      required?: boolean;
      choices: {
        id: string;
        name: string;
        price?: number;
      }[];
    }[];
  };
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({});
  const [additionalPrice, setAdditionalPrice] = useState(0);

  const handleOptionChange = (optionName: string, choice: any, type: 'radio' | 'checkbox') => {
    let newAdditionalPrice = additionalPrice;
    
    if (type === 'radio') {
      // Remove previous option price if exists
      const previousChoiceId = selectedOptions[optionName];
      const previousChoice = product.options?.find(opt => opt.name === optionName)?.choices.find(c => c.id === previousChoiceId);
      if (previousChoice?.price) {
        newAdditionalPrice -= previousChoice.price;
      }
      
      // Add new option price
      const newChoice = product.options?.find(opt => opt.name === optionName)?.choices.find(c => c.id === choice.id);
      if (newChoice?.price) {
        newAdditionalPrice += newChoice.price;
      }
      
      setSelectedOptions(prev => ({
        ...prev,
        [optionName]: choice.id
      }));
    } else {
      // Handle checkbox (toggle)
      setSelectedOptions(prev => {
        const currentValues = prev[optionName] || [];
        const valueExists = currentValues.includes(choice.id);
        
        if (valueExists) {
          // Remove price when unchecking
          if (choice.price) {
            newAdditionalPrice -= choice.price;
          }
          return {
            ...prev,
            [optionName]: currentValues.filter((v: any) => v !== choice.id)
          };
        } else {
          // Add price when checking
          if (choice.price) {
            newAdditionalPrice += choice.price;
          }
          return {
            ...prev,
            [optionName]: [...currentValues, choice.id]
          };
        }
      });
    }
    
    setAdditionalPrice(newAdditionalPrice);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const getTotalPrice = () => {
    return (product.price + additionalPrice) * quantity;
  };

  const handleAddToCart = () => {
    // Check if required options are selected
    const missingRequiredOptions = product.options?.filter(
      option => option.required && (!selectedOptions[option.name] || selectedOptions[option.name].length === 0)
    );

    if (missingRequiredOptions && missingRequiredOptions.length > 0) {
      toast.error(`Please select ${missingRequiredOptions[0].name}`);
      return;
    }

    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price + additionalPrice,
      quantity,
      image: product.image,
      customizations: selectedOptions
    };
    
    addItem(item);
    toast.success(`${product.name} added to cart!`, {
      position: "top-center",
      className: "soft-glass-effect"
    });
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content animate-slide-up soft-glass-effect">
        {/* Header with image */}
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-72 h-55 mx-auto mt-4 object-cover rounded-t-2xl"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
          {/* <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md"
          >
            <Heart 
              size={20} 
              strokeWidth={1.5}
              className={isFavorite ? 'fill-red-500 text-red-500' : ''}
            />
          </button> */}
        </div>
        
        {/* Product details */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-xl font-bold mb-6 ">
            ${(product.price + additionalPrice).toFixed(2)}
            {additionalPrice > 0 && (
              <span className="text-sm text-gray-500 ml-2">
                (Base: ${product.price.toFixed(2)} + Options: ${additionalPrice.toFixed(2)})
              </span>
            )}
          </div>
          
          {/* Customization options */}
          {product.options?.map((option, index) => (
            <div key={index} className="mb-6 bg-white/50 p-4 rounded-xl">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                {option.name}
                {option.required && <span className="text-red-500 ml-1">*</span>}
              </h3>
              
              {option.type === 'radio' ? (
                <RadioGroup 
                  value={selectedOptions[option.name]} 
                  onValueChange={(value) => {
                    const choice = option.choices.find(c => c.id === value);
                    if (choice) {
                      handleOptionChange(option.name, choice, 'radio');
                    }
                  }}
                  className="space-y-2"
                >
                  {option.choices.map(choice => (
                    <div 
                      key={choice.id}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                        selectedOptions[option.name] === choice.id
                          ? 'bg-primary/20 border border-primary'
                          : 'bg-white/70 border border-gray-100 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center">
                        <RadioGroupItem 
                          value={choice.id} 
                          id={`${option.name}-${choice.id}`}
                          className="mr-3"
                        />
                        <Label htmlFor={`${option.name}-${choice.id}`} className="cursor-pointer text-sm font-medium">
                          {choice.name}
                        </Label>
                      </div>
                      {choice.price && <span className="text-sm font-medium">${choice.price.toFixed(2)}</span>}
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  {option.choices.map(choice => {
                    const isChecked = selectedOptions[option.name]?.includes(choice.id);
                    return (
                      <div 
                        key={choice.id} 
                        className={`flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-primary/20 border border-primary'
                            : 'bg-white/70 border border-gray-100 hover:border-primary/30'
                        }`}
                        onClick={() => handleOptionChange(option.name, choice, 'checkbox')}
                      >
                        <div className="flex items-center">
                          <Checkbox 
                            id={`${option.name}-${choice.id}`}
                            checked={isChecked}
                            onCheckedChange={() => handleOptionChange(option.name, choice, 'checkbox')}
                            className="mr-3"
                          />
                          <Label htmlFor={`${option.name}-${choice.id}`} className="cursor-pointer text-sm font-medium">
                            {choice.name}
                          </Label>
                        </div>
                        {choice.price && <span className="text-sm font-medium">${choice.price.toFixed(2)}</span>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          
          {/* Quantity and Add to Cart */}
          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center border rounded-full overflow-hidden bg-white shadow-sm">
              <button 
                className="px-2 py-2 bg-gray-100 hover:bg-gray-200 transition-colors" 
                onClick={decreaseQuantity}
              >
                <Minus size={26} strokeWidth={1.5} />
              </button>
              <span className="px-3 font-normal">{quantity}</span>
              <button 
                className="px-2 py-2 bg-gray-100 hover:bg-gray-200 transition-colors" 
                onClick={increaseQuantity}
              >
                <Plus size={26} strokeWidth={1.5} />
              </button>
            </div>
            <button 
              className="bg-gradient-to-r from-pink-100 to-purple-100 text-gray-700 px-6 py-3 rounded-full font-medium flex items-center shadow-md hover:shadow-lg transition-all"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={26} className="mr-2" strokeWidth={1.5} />
              • ${getTotalPrice().toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
