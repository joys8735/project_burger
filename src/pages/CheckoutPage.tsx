
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, CreditCard, Clock, Gift, Truck, Store, Wallet, DollarSign, Plus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import BottomNavigation from '../components/BottomNavigation';
import { toast } from 'sonner';
import { useUser } from '../context/UserContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useUser();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('wallet');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(10);

  const deliveryFee = deliveryMethod === 'delivery' ? 3.99 : 0;
  const totalWithDelivery = totalPrice + deliveryFee;

  const paymentMethods = [
    { id: 'wallet', name: 'My Wallet', icon: '/placeholder.svg', description: `Balance: $${user?.balance || 0}` },
    { id: 'card', name: 'Credit/Debit Card', icon: '/placeholder.svg', description: 'Visa, Mastercard, Amex' },
    { id: 'cash', name: 'Cash on Delivery', icon: '/placeholder.svg', description: 'Pay when you receive' },
  ];

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (selectedPayment === 'wallet' && (user?.balance || 0) < totalWithDelivery) {
      toast.error('Insufficient wallet balance. Please top up or choose another payment method.');
      setShowTopUp(true);
      return;
    }

    setLoading(true);

    // Simulate order processing
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
      clearCart();

      // Show success message
      toast.success('Order placed successfully!');

      // Navigate to order tracking after a short delay
      setTimeout(() => {
        navigate('/tracking');
      }, 2000);
    }, 1500);
  };

  const handleTopUpWallet = () => {
    toast.success(`Added $${topUpAmount} to your wallet!`);
    setShowTopUp(false);
  };

  return (
    <div className="app-container page-container pb-20 ">
      <div className="sticky top-0 z-20 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button 
            className="mr-3"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Checkout</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Delivery Method */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3">Delivery Method</h2>
          <div className="flex space-x-3">
            <div 
              className={`flex-1 border rounded-xl p-3 flex items-center ${deliveryMethod === 'delivery' ? 'border-primary bg-white bg-opacity-5' : ''}`}
              onClick={() => setDeliveryMethod('delivery')}
            >
              <div className={`p-2 rounded-full mr-3 ${deliveryMethod === 'delivery' ? 'bg-gray bg-opacity-10' : 'bg-gray-100'}`}>
                <Truck size={20} className={deliveryMethod === 'delivery' ? 'text-primary' : 'text-gray-600'} />
              </div>
              <div>
                <h3 className="font-medium">Delivery</h3>
                <p className="text-xs text-gray-600">To your address</p>
              </div>
              <input 
                type="radio" 
                className="ml-auto" 
                checked={deliveryMethod === 'delivery'} 
                onChange={() => setDeliveryMethod('delivery')}
              />
            </div>
            
            <div 
              className={`flex-1 border rounded-xl p-3 flex items-center ${deliveryMethod === 'pickup' ? 'border-primary bg-white bg-opacity-5' : ''}`}
              onClick={() => setDeliveryMethod('pickup')}
            >
              <div className={`p-2 rounded-full mr-3 ${deliveryMethod === 'pickup' ? 'bg-gray bg-opacity-10' : 'bg-gray-100'}`}>
                <Store size={20} className={deliveryMethod === 'pickup' ? 'text-primary' : 'text-gray-600'} />
              </div>
              <div>
                <h3 className="font-medium">Pick Up</h3>
                <p className="text-xs text-gray-600">From restaurant</p>
              </div>
              <input 
                type="radio" 
                className="ml-auto" 
                checked={deliveryMethod === 'pickup'} 
                onChange={() => setDeliveryMethod('pickup')}
              />
            </div>
          </div>
        </div>

        {/* Delivery Address - Only show if delivery method is selected */}
        {deliveryMethod === 'delivery' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Delivery Address</h2>
              <button className="text-primary text-sm">Change</button>
            </div>
            <div className="flex items-start border rounded-xl p-3">
              <div className="bg-gray-100 rounded-full p-2 mr-3">
                <MapPin size={20} className="text-gray-600" />
              </div>
              
              <div>
                <h3 className="font-medium">Home</h3>
                <p className="text-sm text-gray-600">4140 Parker Rd. Allentown, New Mexico 31134</p>
              </div>
            </div>
          </div>
        )}

        {/* Pickup Location - Only show if pickup method is selected */}
        {deliveryMethod === 'pickup' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Pickup Location</h2>
              <button className="text-primary text-sm">Change</button>
            </div>
            <div className="flex items-start border rounded-xl p-3">
              <div className="bg-gray-100 rounded-full p-2 mr-3">
                <Store size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Downtown Restaurant</h3>
                <p className="text-sm text-gray-600">2715 Ash Dr. San Jose, California 83475</p>
              </div>
            </div>
          </div>
        )}

        {/* Delivery/Pickup Time */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">{deliveryMethod === 'delivery' ? 'Delivery Time' : 'Pickup Time'}</h2>
          </div>
          <div className="flex items-start border rounded-xl p-3">
            <div className="bg-gray-100 rounded-full p-2 mr-3">
              <Clock size={20} className="text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium">ASAP (25-35 min)</h3>
              <p className="text-sm text-gray-600">
                {deliveryMethod === 'delivery' 
                  ? 'Your order will arrive in 25-35 minutes' 
                  : 'Your order will be ready in 25-35 minutes'}
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Order Summary</h2>
            <button 
              className="text-primary text-sm"
              onClick={() => navigate('/cart')}
            >
              Edit
            </button>
          </div>
          <div className="border rounded-xl p-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between mb-3">
                <div className="flex items-center">
                  <span className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                    {item.quantity}
                  </span>
                  <span>{item.name}</span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gift Card */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Gift Card</h2>
          </div>
          <div className="flex items-start border rounded-xl p-3">
            <div className="bg-gray-100 rounded-full p-2 mr-3">
              <Gift size={20} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Add Gift Card</h3>
              <p className="text-sm text-gray-600">Add a gift card to your order</p>
            </div>
            <button 
              className="text-primary text-sm"
              onClick={() => navigate('/gift-cards')}
            >
              Add
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Payment Method</h2>
          </div>

          <div className="border rounded-xl overflow-hidden">
      {paymentMethods.map((method) => (
        <div 
          key={method.id} 
          className={`flex items-center justify-between p-4 ${
            selectedPayment === method.id ? 'bg-primary bg-opacity-5' : ''
          } ${method.id !== paymentMethods[paymentMethods.length - 1].id ? 'border-b' : ''}`}
          onClick={() => setSelectedPayment(method.id)}
        >
          <div className="flex items-center">
            {/* Іконки з умовним кольором */}
            {method.id === 'wallet' ? (
              <Wallet size={24} className={selectedPayment === method.id ? 'text-white mr-3' : 'text-black mr-3'} />
            ) : method.id === 'card' ? (
              <CreditCard size={24} className={selectedPayment === method.id ? 'text-white mr-3' : 'text-black mr-3'} />
            ) : (
              <DollarSign size={24} className={selectedPayment === method.id ? 'text-white mr-3' : 'text-black mr-3'} />
            )}
            <div>
              {/* Назва та опис методу */}
              <h3 className={selectedPayment === method.id ? 'text-white' : 'text-black'}>
                {method.name}
              </h3>
              <p className={`text-xs ${selectedPayment === method.id ? 'text-white/80' : 'text-gray-500'}`}>
                {method.description}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {method.id === 'wallet' && (
              <button 
                className="mr-3 text-sm bg-primary text-white px-3 py-1 rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTopUp(true);
                }}
              >
                Top Up
              </button>
            )}
            {/* Приховати саму радіокнопку */}
            <input 
              type="radio" 
              checked={selectedPayment === method.id} 
              onChange={() => setSelectedPayment(method.id)}
              className="opacity-0 absolute"
            />
          </div>
        </div>
      ))}
          </div>
        </div>

        {/* Wallet Top Up Modal */}
        {showTopUp && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowTopUp(false)}></div>
            <div className="fixed left-0 right-0 bottom-0 bg-white p-5 rounded-t-2xl z-50 animate-slide-up">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Top Up Wallet</h3>
                <button onClick={() => setShowTopUp(false)}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-2">Select amount to add</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[10, 20, 50, 100].map(amount => (
                    <button
                      key={amount}
                      className={`p-3 rounded-lg border ${
                        topUpAmount === amount 
                          ? 'bg-primary text-white border-primary' 
                          : 'bg-white border-gray-200'
                      }`}
                      onClick={() => setTopUpAmount(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                  <button 
                    className="p-3 rounded-lg border border-gray-200 flex items-center justify-center"
                    onClick={() => setTopUpAmount(0)}
                  >
                    <Plus size={18} /> Custom
                  </button>
                </div>
                
                {topUpAmount === 0 && (
                  <div className="mb-4">
                    <label className="text-sm text-gray-600">Enter custom amount</label>
                    <div className="flex items-center mt-1">
                      <span className="text-lg mr-2">$</span>
                      <input 
                        type="number" 
                        className="border border-gray-200 rounded-lg p-2 w-full" 
                        placeholder="Enter amount"
                        min="1"
                        onChange={(e) => setTopUpAmount(Number(e.target.value))}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                className="w-full py-3 bg-primary text-white rounded-lg font-medium"
                onClick={handleTopUpWallet}
              >
                Top Up ${topUpAmount}
              </button>
            </div>
          </>
        )}

        {/* Price Details */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg ">
          <h2 className="font-semibold mb-3">Bill Details</h2>
          <div className="space-y-2 text-sm mb-3">
            <div className="flex justify-between">
              <span>Item total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            {deliveryMethod === 'delivery' && (
              <div className="flex justify-between">
                <span>Delivery Fee | 5.0kms</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold">
              <span>To Pay</span>
              <span>${totalWithDelivery.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="left-0 right-0 p-4  shadow-lg ">
        <button 
          className={`w-full py-3 rounded-xl font-medium ${
            loading ? 'bg-gray-300' : 'bg-primary text-white'
          }`}
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? 'Placing Order...' : `Place Order • $${totalWithDelivery.toFixed(2)}`}
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CheckoutPage;
