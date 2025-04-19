import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShoppingBasket, Star, Award, TrendingUp, Flame, Zap } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import BottomNavigation from '../components/BottomNavigation';
import CategoryCard from '../components/CategoryCard';
import Banner from '../components/Banner';
import ProductModal from '../components/ProductModal';

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  isVegetarian?: boolean;
  originalPrice?: number;
  categoryId?: string;
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
}

interface Banner {
  image: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    // Запрос категорий
    axios.get(`${apiUrl}/api/categories`)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    // Запрос баннеров
    axios.get(`${apiUrl}/api/banners`)
      .then(response => setBannerImages(response.data.map((b: Banner) => b.image)))
      .catch(error => console.error('Error fetching banners:', error));

    // Запрос избранных продуктов
    axios.get(`${apiUrl}/api/products/featured`)
      .then(response => {
        console.log('Featured Products:', response.data);
        setFeaturedProducts(response.data);
      })
      .catch(error => console.error('Error fetching featured products:', error));

    // Запрос топ продуктов
    axios.get(`${apiUrl}/api/products/top`)
      .then(response => {
        console.log('Top Products:', response.data);
        setTopProducts(response.data);
      })
      .catch(error => console.error('Error fetching top products:', error));
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  return (
    <div className="app-container page-container pb-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="p-4">
        {/* Banners */}
        <Banner images={bannerImages} />

        {/* Categories */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{t('explore.categories')}</h2>
            <button 
              className="text-primary text-sm flex items-center"
              onClick={() => navigate('/menu')}
            >
              {t('view.all')} <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="flex justify-between">
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                name={category.name}
                image={category.image}
                onClick={() => navigate(`/category/${category.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Top Products Section */}
        <div className="mb-8 bg-gradient-to-r from-pink-100/60 to-purple-100/60 p-3 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Award size={20} className="text-primary mr-2" />
              <h2 className="text-lg font-semibold">Top Rated Products</h2>
            </div>
            <button 
              className="text-primary text-sm flex items-center"
              onClick={() => navigate('/menu')}
            >
              {t('view.all')} <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {topProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="w-full h-22 mb-2 overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-32 h-24 mx-auto object-cover"
                  />
                </div>
                <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                  <button className="bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center shadow-sm">
                    <ShoppingBasket size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer soft-glass-effect flex flex-col h-full"
              onClick={() => handleProductClick(product)}
            >
              <div className="w-full overflow-hidden rounded-xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-32 h-24 mx-auto object-cover"
                />
              </div>
              <div className="flex gap-1 mt-2">
                {product.originalPrice && (
                  <span className="absolute top-2 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                    Топ продаж
                  </span>
                )}
                {product.isVegetarian && (
                  <span className="absolute top-2 bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                    Пекельний смак 🌶️
                  </span>
                )}
              </div>
              <h3 className="font-medium text-sm mt-1">{product.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-2 flex-grow">{product.description}</p>
              <div className="mt-auto flex justify-between items-center pt-2">
                <div>
                  <span className="font-bold text-primary">${product.price.toFixed(2)} </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <button className="bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center shadow-sm">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Exclusive Deal */}
        <div className="mb-8 mt-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Zap size={20} className="text-yellow-500 mr-2" />
              <h2 className="text-lg font-semibold">{t('exclusive.deals')}</h2>
            </div>
          </div>
          <div 
            className="bg-gradient-to-r from-pink-100/70 to-purple-100/70 rounded-2xl p-4 flex justify-between items-center soft-glass-effect"
            onClick={() => navigate('/menu')}
          >
            <div>
              <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
                {t('order.now')}
              </span>
              <h3 className="font-semibold mt-2 mb-1">{t('deal.discount')}</h3>
              <p className="text-sm text-gray-600">{t('deal.code')}: WELCOME25</p>
            </div>
            <img 
              src="/placeholder.svg" 
              alt="Special offer" 
              className="w-20 h-20 object-contain ml-4"
            />
          </div>
        </div>

        {/* Creative Bottom Element */}
        <div className="mb-5 mt-10 rounded-2xl overflow-hidden shadow-md">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white text-center">
            <h3 className="text-xl font-bold mb-3">Join Our Loyalty Program</h3>
            <p className="mb-4">Get exclusive rewards, early access to new items, and special birthday treats!</p>
            <div className="flex justify-center">
              <button 
                className="bg-white text-pink-600 px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors shadow-md"
                onClick={() => navigate('/profile')}
              >
                Join Now
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <TrendingUp size={24} className="text-pink-600 mr-2" />
              <div>
                <h4 className="font-medium">Popular Right Now</h4>
                <p className="text-xs text-gray-600">See what others are ordering</p>
              </div>
            </div>
            <button 
              className="text-pink-600 font-medium"
              onClick={() => navigate('/menu')}
            >
              Explore
            </button>
          </div>
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

export default HomePage;