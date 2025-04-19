
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, LayoutGrid, ShoppingBag, Bell, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

const BottomNavigation = () => {
  const { t } = useLanguage();
  const { totalItems } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { path: "/home", icon: <HomeIcon size={30} strokeWidth={1.5} /> },
    { path: "/menu", icon: <LayoutGrid size={30} strokeWidth={1.5} /> },
    { path: "/cart", icon: <ShoppingBag size={30} strokeWidth={1.5} />, badge: totalItems },
    { path: "/notifications", icon: <Bell size={30} strokeWidth={1.5} /> },
    { path: "/profile", icon: <User size={30} strokeWidth={1.5} /> }
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-30 transition-all duration-300 bg-white shadow-lg`}>
      <div className="max-w-[520px] mx-auto px-6 py-3 bottom-nav-height flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`bottom-nav-item ${isActive ? 'active' : 'text-gray-400'}`}
            >
              <div className="relative">
                {item.icon}
                {item.badge > 0 && (
  <span className="absolute -top-1.5 -right-1.5 bg-primary text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
    {item.badge}
  </span>
)}
              </div>
              {/* <span className="text-xs mt-1 font-medium">{item.label}</span> */}
              
              {isActive && (
                <div className=""></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
