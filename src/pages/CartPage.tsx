
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Ticket, ShoppingCart, X, Package, ShoppingBag, MapPin, Edit } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import BottomNavigation from '../components/BottomNavigation';
import CartItemCard from '../components/CartItemCard';
import { toast } from 'sonner';
import CouponModal from '../components/CouponModal';
// import AddressModal from '../components/AddressModal';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, clearCart, addItem } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const { t } = useLanguage();
  const [showCouponModal, setShowCouponModal] = useState(false);
  // const [deliveryAddress, setDeliveryAddress] = useState('123 Main Street, Apt 4B, New York');
  // const [showAddressModal, setShowAddressModal] = useState(false);

  const handleApplyCoupon = () => {
    if (couponCode) {
      toast.success('Coupon applied!', {
        duration: 2000,
        position: "top-center",
        className: "soft-glass-effect animate-bounce"
      });
    } else {
      setShowCouponModal(true);
    }
  };

  const handleCouponSelect = (code: string) => {
    setCouponCode(code);
    toast.success('Coupon applied!', {
      duration: 2000,
      position: "top-center",
      className: "soft-glass-effect animate-bounce"
    });
  };

  // Suggested products for "Also Buy" section
  const suggestedProducts = [
    {
      id: 'sug1',
      name: 'French Fries',
      price: 3.99,
      image: '/burger.png'
    },
    {
      id: 'sug2',
      name: 'Chocolate Shake',
      price: 4.99,
      image: '/burger.png'
    },
    {
      id: 'sug4',
      name: 'Chocolate Shake',
      price: 4.99,
      image: '/burger.png'
    },
    {
      id: 'sug5',
      name: 'Chocolate Shake',
      price: 4.99,
      image: '/burger.png'
    },
    {
      id: 'sug3',
      name: 'Cheesy Dip',
      price: 1.99,
      oldprice: 2.99,
      image: '/burger.png'
    }
  ];

  const handleAddSuggestion = (product: any) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      oldprice: product.oldprice,
      quantity: 1,
      image: product.image
    };
    
    addItem(item);
    toast.success(`${product.name} added to cart!`, {
      position: "top-center", 
      className: "soft-glass-effect"
    });
  };

  // const handleAddressChange = () => {
  //   setShowAddressModal(true);
  // };

  // const handleSelectAddress = (address: string) => {
  //   setDeliveryAddress(address);
  //   toast.success('Delivery address updated!', {
  //     position: "top-center",
  //     className: "soft-glass-effect"
  //   });
  // };
  

  return (
    <div className="app-container page-container bg-gradient-to-b from-pink-50 to-white pb-28">
      <div className="sticky top-0 z-20 glass-effect p-4 shadow-sm">
        <div className="flex items-center">
          <button 
            className="mr-3 hover:bg-pink-100 p-1.5 rounded-full transition-colors"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <h1 className="text-l font-bold">Your Cart</h1>
          {items.length > 0 && (
            <span className="ml-2 bg-gradient-to-r from-pink-100/60 to-purple-100/60 p-3 font-semibold text-xs text-pink-600 rounded-2xl soft-glass-effect h-2 w-1 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 ">
        {items.length > 0 ? (
          <>
            <div className="mb-6  ">
              {items.map((item) => (
                <CartItemCard 
                  key={item.id} 
                  item={item} 
                  
                />
              ))}

              <div className="flex justify-between items-center mt-4 ">
                <button 
                  className="text-red-500 text-sm font-medium bg-primary/10 px-3 py-1.5 rounded-full"
                  onClick={() => {
                    clearCart();
                    toast.success('Cart cleared!', {
                      position: "top-center",
                      className: "soft-glass-effect"
                    });
                  }}
                >
                  Clear Cart
                </button>
                <div className="text-sm text-gray-500 flex flex-col items-end">
                  <p className="text-xs italic">
                    <span className="font-medium">← Swipe left</span> to delete
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            {/* <div className="bg-white p-4 rounded-2xl mb-6 shadow-sm soft-glass-effect">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center">
                  <MapPin size={18} className="mr-2 text-primary" strokeWidth={1.5} />
                  Delivery Address
                </h3>
                <button 
                  className="text-primary text-sm font-medium flex items-center"
                  onClick={handleAddressChange}
                >
                  <Edit size={14} className="mr-1" strokeWidth={1.5} />
                  Change
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={deliveryAddress}
                  readOnly
                  className="w-full p-3 border border-pink-200 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                  onClick={handleAddressChange}
                />
                <MapPin 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  strokeWidth={1.5}
                />
              </div>
            </div> */}

            {/* Also Buy Section */}
            <div className="mb-6 bg-gradient-to-r from-pink-100/60 to-purple-100/60 p-4 rounded-2xl soft-glass-effect">
  <div className="flex items-center mb-3">
    <Package size={18} className="text-primary mr-2" strokeWidth={1.5} />
    <h3 className="font-medium">{t("app.suggestions")}</h3>
  </div>

  <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-1">
    {suggestedProducts.map((product) => (
      <div 
        key={product.id} 
        className="flex-shrink-0 w-28 snap-start flex flex-col items-center bg-white/80 rounded-lg p-2  cursor-pointer"
        onClick={() => handleAddSuggestion(product)}
      >
        <div className="w-16 h-14 overflow-hidden rounded-lg mb-1">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xs font-medium text-center leading-tight">{product.name}</p>
        <span className="text-xs text-primary font-medium">${product.price}</span>
        {product.oldprice && (
          <span className="text-xs text-muted-foreground line-through">${product.oldprice}</span>
        )}
      </div>
    ))}
  </div>
</div>

            <div className="bg-white p-4 rounded-2xl mb-6 shadow-sm soft-glass-effect">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Apply Coupon</h3>
                <button 
                  className="text-primary text-sm font-medium"
                  onClick={() => setShowCouponModal(true)}
                >
                  View All
                </button>
              </div>
              <div className="flex">
                <div className="relative flex-1 mr-2">
                  <Ticket className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} strokeWidth={1.5} />
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm bg-white/70"
                  />
                  {couponCode && (
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2" 
                      onClick={() => setCouponCode('')}
                    >
                      <X size={16} className="text-gray-400" strokeWidth={1.5} />
                    </button>
                  )}
                </div>
                <button 
                  className="bg-primary text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                  onClick={handleApplyCoupon} 
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl mb-6 shadow-sm soft-glass-effect">
              <h3 className="font-medium mb-3">Price Details</h3>
              <div className="space-y-2 text-sm mb-3">
                <div className="flex justify-between">
                  <span>Item total ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>$3.99</span>
                </div>
                {couponCode && (
                  <div className="flex justify-between text-green-600 animate-pulse">
                    <span>Discount (WELCOME20)</span>
                    <span>-$5.00</span>
                  </div>
                )}
                <div className="border-t border-pink-100 pt-2 mt-2 flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>${couponCode ? (totalPrice + 3.99 - 5).toFixed(2) : (totalPrice + 3.99).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="bg-pink-100 rounded-full p-6 mb-4">
              <ShoppingBag size={48} className="text-pink-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 text-center mb-6">Looks like you haven't added anything to your cart yet</p>
            <button 
              className="bg-primary text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-shadow flex items-center"
              onClick={() => navigate('/menu')}
            >
              <ShoppingBag size={20} className="mr-2" strokeWidth={1.5} />
              Browse Menu
            </button>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="bottom-[80px] left-0 right-0 p-4 glass-effect border-t border-pink-100 z-20">
          <button 
            className="w-full py-3 rounded-full bg-gradient-to-r from-primary to-pink-400 text-white font-medium shadow-md hover:shadow-lg transition-shadow"
            onClick={() => navigate('/checkout')}
          >
            {t('Proceed.Checkout')} • ${couponCode ? (totalPrice + 3.99 - 5).toFixed(2) : (totalPrice + 3.99).toFixed(2)}
          </button>
        </div>
      )}

      {showCouponModal && (
        <CouponModal 
          onClose={() => setShowCouponModal(false)} 
          onApply={handleCouponSelect}
        />
      )}

      {/* {showAddressModal && (
        <AddressModal
          onClose={() => setShowAddressModal(false)}
          onSelectAddress={handleSelectAddress}
          currentAddress={deliveryAddress}
        />
      )} */}

      <BottomNavigation />
    </div>
  );
};

export default CartPage;
