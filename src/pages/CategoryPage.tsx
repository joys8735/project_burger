
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Search, SlidersHorizontal } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Mock category data based on id
  const categoryData = {
    burger: {
      name: 'Burgers',
      products: [
        {
          id: 'burger1',
          name: 'Gourmet Burger',
          price: 12.99,
          originalPrice: 15.99,
          image: '/placeholder.svg',
          description: 'Premium beef patty with special sauce and fresh vegetables',
          isVegetarian: false,
          options: [
            {
              name: 'Size',
              type: 'radio' as const,
              required: true,
              choices: [
                { id: 'regular', name: 'Regular', price: 0 },
                { id: 'large', name: 'Large', price: 2.5 }
              ]
            },
            {
              name: 'Add-ons',
              type: 'checkbox' as const,
              choices: [
                { id: 'cheese', name: 'Extra Cheese', price: 1 },
                { id: 'bacon', name: 'Bacon', price: 1.5 },
                { id: 'egg', name: 'Fried Egg', price: 1 }
              ]
            }
          ]
        },
        {
          id: 'burger2',
          name: 'Veggie Burger',
          price: 10.99,
          image: '/placeholder.svg',
          description: 'Plant-based patty with lettuce, tomato and vegan mayo',
          isVegetarian: true,
          options: [
            {
              name: 'Size',
              type: 'radio' as const,
              required: true,
              choices: [
                { id: 'regular', name: 'Regular', price: 0 },
                { id: 'large', name: 'Large', price: 2 }
              ]
            }
          ]
        },
        {
          id: 'burger3',
          name: 'Chicken Burger',
          price: 11.49,
          image: '/placeholder.svg',
          description: 'Crispy chicken patty with lettuce and special sauce',
          isVegetarian: false
        },
        {
          id: 'burger4',
          name: 'BBQ Burger',
          price: 13.99,
          image: '/placeholder.svg',
          description: 'Juicy beef with BBQ sauce and onion rings',
          isVegetarian: false
        }
      ]
    },
    pizza: {
      name: 'Pizzas',
      products: [
        {
          id: 'pizza1',
          name: 'Margherita Pizza',
          price: 13.99,
          image: '/taco.png',
          description: 'Classic pizza with tomato sauce, mozzarella, and basil',
          isVegetarian: true,
          options: [
            {
              name: 'Size',
              type: 'radio' as const,
              required: true,
              choices: [
                { id: 'small', name: 'Small (10")', price: 0 },
                { id: 'medium', name: 'Medium (12")', price: 2 },
                { id: 'large', name: 'Large (14")', price: 4 }
              ]
            },
            {
              name: 'Crust',
              type: 'radio' as const,
              choices: [
                { id: 'thin', name: 'Thin Crust', price: 0 },
                { id: 'thick', name: 'Thick Crust', price: 1 },
                { id: 'cheese', name: 'Cheese Stuffed', price: 2.5 }
              ]
            }
          ]
        },
        {
          id: 'pizza2',
          name: 'Pepperoni Pizza',
          price: 15.99,
          image: '/placeholder.svg',
          description: 'Classic pizza with pepperoni slices',
          isVegetarian: false
        }
      ]
    },
    mexican: {
      name: 'Mexican',
      products: [
        {
          id: 'mexican1',
          name: 'Beef Tacos',
          price: 9.99,
          image: '/taco.png',
          description: 'Three soft tacos with seasoned beef, lettuce, cheese and salsa',
          isVegetarian: false
        },
        {
          id: 'mexican2',
          name: 'Vegetable Burrito',
          price: 8.99,
          image: '/placeholder.svg',
          description: 'Large flour tortilla filled with rice, beans, and vegetables',
          isVegetarian: true
        }
      ]
    },
    candy: {
      name: 'Candy & Desserts',
      products: [
        {
          id: 'candy1',
          name: 'Chocolate Cake',
          price: 7.99,
          image: '/candy.png',
          description: 'Rich chocolate cake with ganache frosting',
          isVegetarian: true
        },
        {
          id: 'candy2',
          name: 'Strawberry Cheesecake',
          price: 6.99,
          image: '/placeholder.svg',
          description: 'Creamy cheesecake topped with strawberry sauce',
          isVegetarian: true
        }
      ]
    }
  };

  const category = categoryData[id as keyof typeof categoryData];

  if (!category) {
    return <div>Category not found</div>;
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  return (
    <div className="app-container page-container bg-gradient-to-b from-pink-50 to-white pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20 glass-effect p-4 shadow-sm">
        <div className="flex items-center mb-3">
          <button 
            className="mr-3 hover:bg-pink-100 p-1.5 rounded-full transition-colors"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <h1 className="text-xl font-bold">{category.name}</h1>
        </div>

        <div className="flex">
          <div className="relative flex-1 mr-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search in this category"
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm bg-white/70"
            />
          </div>
          <button className="bg-gray-100 p-2.5 rounded-full">
            <SlidersHorizontal size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Products List - Two Columns */}
        <div className="grid grid-cols-2 gap-3">
          {category.products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              description={product.description}
              isVegetarian={product.isVegetarian}
              onClick={() => handleProductClick(product)}
            />
          ))}
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

export default CategoryPage;
