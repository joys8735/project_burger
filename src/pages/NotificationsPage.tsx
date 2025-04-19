
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Package, Tag, CreditCard, Gift } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    {
      id: '1',
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #9876565821 has been delivered. Enjoy your meal!',
      time: '2 mins ago',
      read: false,
      icon: <Package size={20} />
    },
    {
      id: '2',
      type: 'promo',
      title: '25% Off Weekend Special',
      message: 'Get 25% off on all orders this weekend. Use code: WEEKEND25',
      time: '3 hours ago',
      read: true,
      icon: <Tag size={20} />
    },
    {
      id: '3',
      type: 'order',
      title: 'Order Accepted',
      message: 'Your order #9876565821 has been accepted and is being prepared.',
      time: 'Yesterday',
      read: true,
      icon: <Package size={20} />
    },
    {
      id: '4',
      type: 'promo',
      title: 'New Restaurant Added',
      message: 'Taco Fiesta is now available for ordering through our app!',
      time: '2 days ago',
      read: true,
      icon: <Tag size={20} />
    },
    {
      id: '5',
      type: 'payment',
      title: 'Payment Successful',
      message: 'Your payment for order #9876565821 was successful.',
      time: '3 days ago',
      read: true,
      icon: <CreditCard size={20} />
    },
    {
      id: '6',
      type: 'gift',
      title: 'You Have Earned a Gift!',
      message: 'Congratulations! You\'ve earned a free dessert with your next order.',
      time: '5 days ago',
      read: true,
      icon: <Gift size={20} />
    }
  ];

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === activeTab);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'order', label: 'Orders' },
    { id: 'promo', label: 'Promos' },
    { id: 'payment', label: 'Payments' }
  ];

  return (
    <div className="app-container page-container bg-gradient-to-b from-pink-50 to-white">
      <div className="sticky top-0 z-20 glass-effect p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <button 
            className="mr-3 hover:bg-pink-100 p-1.5 rounded-full transition-colors"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Notifications</h1>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white/70 text-gray-600 border border-pink-200'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`rounded-2xl p-4 transition-all ${
                  !notification.read 
                    ? 'soft-glass-effect shadow-md' 
                    : 'bg-white/70 border border-pink-100'
                }`}
              >
                <div className="flex items-start">
                  <div className={`rounded-full p-3 mr-3 flex-shrink-0 ${
                    notification.type === 'order' 
                      ? 'bg-green-100' 
                      : notification.type === 'promo'
                      ? 'bg-blue-100'
                      : notification.type === 'payment'
                      ? 'bg-purple-100'
                      : notification.type === 'gift'
                      ? 'bg-amber-100'
                      : 'bg-gray-100'
                  }`}>
                    {notification.icon || <Bell size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="bg-pink-100 rounded-full p-6 mb-4">
              <Bell size={32} className="text-pink-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">No Notifications</h2>
            <p className="text-gray-500 text-center px-8">
              You don't have any notifications yet. We'll notify you when something important happens.
            </p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default NotificationsPage;
