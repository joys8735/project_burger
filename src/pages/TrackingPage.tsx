
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

const TrackingPage = () => {
  const navigate = useNavigate();
  
  const orderDetails = {
    id: '9876565821',
    items: [
      { name: 'Margherita Pizza', quantity: 1 },
      { name: 'Garlic Bread', quantity: 2 }
    ],
    status: 'In Progress',
    estimatedTime: '25-35 minutes',
    restaurant: {
      name: 'Pizza Palace',
      address: '1901 Thornridge Cir. Shiloh, Hawaii 81063'
    },
    delivery: {
      address: 'Home',
      fullAddress: '4140 Parker Rd. Allentown, New Mexico 31134'
    }
  };
  
  return (
    <div className="app-container page-container">
      <div className="sticky top-0 z-20 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button 
            className="mr-3"
            onClick={() => navigate('/home')}
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold">Order Details</h1>
            <p className="text-sm text-gray-500">Order #{orderDetails.id}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Order Status */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="bg-yellow-400 rounded-full p-2 mr-3">
                <Clock size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{orderDetails.status}</h2>
                <p className="text-sm text-gray-700">Your order is being prepared</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-700">Estimated Delivery</span>
              <p className="font-semibold">{orderDetails.estimatedTime}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full mb-4">
            <div className="absolute h-full bg-yellow-400 rounded-full" style={{ width: '40%' }}></div>
          </div>

          <div className="flex justify-between text-xs text-gray-600">
            <span>Order Placed</span>
            <span>Preparing</span>
            <span>On the way</span>
            <span>Delivered</span>
          </div>
        </div>

        {/* Order Items */}
        <div className="border rounded-xl p-4 mb-6">
          <h2 className="font-semibold mb-3">Order Items</h2>
          {orderDetails.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center">
                <span className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                  {item.quantity}
                </span>
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Restaurant Details */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3">Restaurant</h2>
          <div className="flex items-start">
            <div className="bg-gray-100 rounded-full p-2.5 mr-3">
              <img 
                src="/placeholder.svg" 
                alt={orderDetails.restaurant.name} 
                className="w-5 h-5 object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium">{orderDetails.restaurant.name}</h3>
              <p className="text-sm text-gray-600">{orderDetails.restaurant.address}</p>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3">Delivery Address</h2>
          <div className="flex items-start">
            <div className="bg-gray-100 rounded-full p-2.5 mr-3">
              <img 
                src="/placeholder.svg" 
                alt="Home" 
                className="w-5 h-5 object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium">{orderDetails.delivery.address}</h3>
              <p className="text-sm text-gray-600">{orderDetails.delivery.fullAddress}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[72px] left-0 right-0 p-4 bg-white shadow-lg border-t">
        <button 
          className="border border-primary text-primary w-full py-3 rounded-full font-medium"
          onClick={() => navigate('/home')}
        >
          Order More Food
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TrackingPage;
