
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Star, Clock, MapPin, Search, Heart } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import ProductModal from '../components/ProductModal';

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('popular');
  
  // Mock restaurant data
  const restaurant = {
    id,
    name: 'Gourmet Heaven Cafe and Bakery',
    image: '/placeholder.svg',
    rating: 4.2,
    reviewCount: 125,
    deliveryTime: '20-30 min',
    location: '123 Maple Street, New York • 2km',
    categories: ['Cafe', 'Bakery', 'Breakfast'],
    menuCategories: [
      { id: 'popular', name: 'Popular' },
      { id: 'breakfast', name: 'Breakfast' },
      { id: 'maincourse', name: 'Main Course' },
      { id: 'sides', name: 'Sides' },
      { id: 'desserts', name: 'Desserts' },
      { id: 'drinks', name: 'Drinks' }
    ],
    offers: [
      { id: '1', title: 'Buy 1 Get 1 Free on All Pastries!', code: 'GOODDAY', validTill: '18 30th June' }
    ],
    products: {
      popular: [
        {
          id: 'p1',
          name: 'Margherita Pizza',
          price: 14.99,
          image: '/placeholder.svg',
          description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        },
        {
          id: 'p2',
          name: 'Garlic Bread',
          price: 5.99,
          image: '/placeholder.svg',
          description: 'Freshly baked bread with garlic butter and herbs',
        }
      ],
      breakfast: [
        {
          id: 'b1',
          name: 'Avocado Toast',
          price: 9.99,
          image: '/placeholder.svg',
          description: 'Smashed avocado on artisan toast with poached eggs',
        }
      ],
      maincourse: [
        {
          id: 'm1',
          name: 'Penne Arrabiata',
          price: 12.99,
          image: '/placeholder.svg',
          description: 'Penne pasta with spicy tomato sauce and chili flakes',
        }
      ],
      sides: [],
      desserts: [],
      drinks: []
    }
  };

  const productsToShow = restaurant.products[activeCategory as keyof typeof restaurant.products] || [];

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  return (
    <div className="app-container page-container bg-gradient-to-b from-pink-50 to-white">
      {/* Restaurant Header */}
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-48 object-cover"
        />
        <button 
          className="absolute top-4 left-4 bg-white/80 rounded-full p-2 shadow-md backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={20} />
        </button>
        <button className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow-md backdrop-blur-sm">
          <Heart size={20} />
        </button>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
        
        <div className="flex items-center mt-1 mb-3">
          <div className="flex items-center bg-green-100 px-2 py-0.5 rounded-full text-xs text-green-800 mr-2">
            <Star size={12} className="fill-green-800 mr-1" />
            <span>{restaurant.rating}</span>
          </div>
          <span className="text-sm text-gray-500">{restaurant.reviewCount} Ratings</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center mr-4">
            <MapPin size={14} className="mr-1" />
            <span>1.2km away</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{restaurant.deliveryTime}</span>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-xs font-medium bg-pink-100 px-2 py-1 rounded-full mr-1">
            Open • View Timings
          </span>
          {restaurant.categories.map((category, index) => (
            <span key={index} className="text-xs font-medium bg-pink-100 px-2 py-1 rounded-full mr-1">
              {category}
            </span>
          ))}
        </div>

        {/* Offers */}
        {restaurant.offers.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Additional Offers</h2>
            {restaurant.offers.map(offer => (
              <div key={offer.id} className="flex items-center justify-between bg-gradient-to-r from-pink-100/80 to-purple-100/80 p-3 rounded-2xl soft-glass-effect">
                <div className="flex items-start">
                  <div className="bg-pink-200 rounded-full p-1 mr-2">
                    <img src="/placeholder.svg" alt="Offer" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{offer.title}</h3>
                    <p className="text-xs text-gray-500">GOODDAY • {offer.validTill}</p>
                  </div>
                </div>
                <img src="/placeholder.svg" alt="Gift" className="w-8 h-8" />
              </div>
            ))}
          </div>
        )}

        {/* Table Booking */}
        <div className="mb-6">
          <div className="flex items-center justify-between bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl soft-glass-effect">
            <div>
              <h3 className="font-semibold">Table Booking</h3>
              <p className="text-xs text-gray-500">Quick Confirmations</p>
            </div>
            <div className="flex items-center">
              <button className="text-primary text-sm bg-white px-3 py-1.5 rounded-full shadow-sm">Book Now</button>
              <ChevronLeft size={16} className="text-gray-400 transform rotate-180" />
            </div>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3">Menu</h2>
          <div className="flex overflow-x-auto hide-scrollbar space-x-3 pb-2">
            {restaurant.menuCategories.map(category => (
              <button
                key={category.id}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white/70 border border-pink-200 text-gray-800'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products List */}
        <div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search dishes"
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm bg-white/70"
            />
          </div>

          {productsToShow.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {productsToShow.map(product => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer soft-glass-effect"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="w-full h-32 mb-2 overflow-hidden rounded-xl">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                    <button className="bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center shadow-sm">
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-white/70 rounded-2xl soft-glass-effect">
              <p className="text-gray-500">No items found in this category</p>
            </div>
          )}
        </div>
      </div>

      {showProductModal && selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setShowProductModal(false)} 
        />
      )}

      <BottomNavigation />
    </div>
  );
};

export default RestaurantPage;
