import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, SlidersHorizontal } from 'lucide-react';
import axios from 'axios';
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
  categoryId: string;
}

interface Banner {
  image: string;
}

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log('API URL:', apiUrl); // Отладка

    // Запрос категорий
    axios
      .get(`${apiUrl}/api/categories`)
      .then(response => {
        console.log('Categories:', response.data);
        // Добавляем категорию "All"
        setCategories([{ id: 'all', name: 'All', image: 'https://via.placeholder.com/150' }, ...response.data]);
      })
      .catch(error => console.error('Error fetching categories:', error));

    // Запрос баннеров
    axios
      .get(`${apiUrl}/api/banners`)
      .then(response => {
        console.log('Banners:', response.data);
        setBannerImages(response.data.map((b: Banner) => b.image));
      })
      .catch(error => console.error('Error fetching banners:', error));

    // Запрос продуктов
    axios
      .get(`${apiUrl}/api/products`)
      .then(response => {
        console.log('Products:', response.data);
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory && activeCategory !== 'all' ? product.categoryId === activeCategory : true;
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container page-container bg-gradient-to-b from-pink-50 to-white">
      <div className="sticky top-0 z-20 glass-effect p-4 shadow-sm">
        <div className="flex items-center mb-3">
          <button
            className="mr-3 hover:bg-pink-100 p-1.5 rounded-full transition-colors"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Menu</h1>
        </div>

        <div className="flex">
          <div className="relative flex-1 mr-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm bg-white/70"
            />
          </div>
          <button className="bg-white p-2.5 rounded-full shadow-sm border border-pink-200">
            <SlidersHorizontal size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Banner */}
        <Banner images={bannerImages} />

        {/* Categories Horizontal Scroll */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3">Categories</h2>
          <div className="flex overflow-x-auto hide-scrollbar pb-2">
            {categories.map(category => (
              <div key={category.id} className="mr-4">
                <div
                  className={`cursor-pointer transition-all ${activeCategory === category.id ? 'opacity-100 scale-105' : 'opacity-80'}`}
                  onClick={() => setActiveCategory(category.id === 'all' ? null : category.id)}
                >
                  <CategoryCard
                    name={category.name}
                    image={category.image || 'https://via.placeholder.com/150'}
                    onClick={() => {}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products in 2 Columns */}
        <div>
          <h2 className="font-semibold mb-3">
            {activeCategory && activeCategory !== 'all'
              ? `${categories.find(c => c.id === activeCategory)?.name || 'Items'}`
              : 'All Items'}
          </h2>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer soft-glass-effect"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="w-full h-32 mb-2 overflow-hidden rounded-xl">
                    <img
                      src={product.image || 'https://via.placeholder.com/150'}
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
            <div className="text-center py-8 bg-white/70 rounded-2xl soft-glass-effect">
              <p className="text-gray-500">No products found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>

      {showProductModal && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setShowProductModal(false)} />
      )}

      <BottomNavigation />
    </div>
  );
};

export default MenuPage;// Test change
