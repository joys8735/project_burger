
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Globe, Settings, FileText, Gift, History, LogOut, User as UserIcon, Bell, CreditCard, Heart, MapPin, Phone, Mail, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { toast } from 'sonner';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState<string>('settings');

  const handleLanguageChange = (lang: 'en' | 'uk' | 'ru') => {
    setLanguage(lang);
    toast.success(`Language changed to ${lang === 'en' ? 'English' : lang === 'uk' ? 'Ukrainian' : 'Russian'}`);
  };

  const handleLogout = () => {
    // In a real app, you would implement actual logout logic here
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="app-container page-container bg-[#FFF5F7]">
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-br from-[#FFDEE2] to-[#FFC8E1] opacity-80 z-0"></div>
      <div className="fixed top-40 right-5 w-40 h-40 rounded-full bg-[#FFD0E0] blur-3xl opacity-60 z-0"></div>
      <div className="fixed top-20 left-5 w-32 h-32 rounded-full bg-[#FFE2E8] blur-2xl opacity-50 z-0"></div>
      
      {/* Main content */}
      <div className="relative z-10 pt-12 px-5">
        <button 
          className="absolute left-4 top-6 bg-white/30 backdrop-blur-md p-2 rounded-full shadow-sm"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>

        {/* Profile header */}
        <div className="mt-2 flex flex-col items-center">
          {/* <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full flex items-center justify-center shadow-lg">
              <UserIcon size={42} className="text-white" />
            </div>
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
              <Settings size={16} className="text-pink-400" />
            </div>
          </div> */}
          
          <h1 className="font-bold text-2xl mt-2">{user?.name || 'Guest User'}</h1>
          <p className="text-gray-600">{user?.email || 'Sign in to access your profile'}</p>
          
          {/* Stats pills */}
          <div className="flex gap-3 mt-2">
            <div className="bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
              <span className="text-sm font-medium text-gray-700">Orders: 24</span>
            </div>
            <div className="bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
              <span className="text-sm font-medium text-gray-700">Points: {user?.rewards || '0'}</span>
            </div>
          </div>
        </div>

        {/* Balance card */}
        <div className="mt-8 bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">My Balance</h2>
            <button className="bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-full">
              Add Money
            </button>
          </div>
          
          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold text-gray-800">${user?.balance?.toFixed(2) || '0.00'}</span>
            <span className="text-sm text-gray-500 mb-1">available</span>
          </div>
          
          <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-300 to-pink-500 w-[0%]"></div>
          </div>
          
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>Spending limit: $500</span>
            <span>0% used</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 mb-6">
          <Tabs defaultValue="settings" onValueChange={setActiveTab} value={activeTab} className="w-full">
            <TabsList className="w-full grid grid-cols-4 bg-white/50 backdrop-blur-md rounded-xl h-auto p-1.5">
              <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Profile
              </TabsTrigger>
              <TabsTrigger value="language" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Language
              </TabsTrigger>
              <TabsTrigger value="agreements" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Legal
              </TabsTrigger>
              <TabsTrigger value="gift-cards" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Gifts
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-sm">
              <TabsContent value="settings" className="p-0 m-0">
                <div className="divide-y divide-gray-100">
                  <MenuItem 
                    icon={<UserIcon size={18} />} 
                    title="Personal Info" 
                    onPress={() => navigate('/profile/personal')} 
                  />
                  <MenuItem 
                    icon={<Phone size={18} />} 
                    title="Phone Number" 
                    description="+1 (555) 123-4567"
                    onPress={() => navigate('/profile/phone')} 
                  />
                  
                  <MenuItem 
                    icon={<MapPin size={18} />} 
                    title="Addresses" 
                    onPress={() => navigate('/profile/addresses')} 
                  />
                  <MenuItem 
                    icon={<CreditCard size={18} />} 
                    title="Payment Methods" 
                    onPress={() => navigate('/profile/payment')} 
                  />
                  {/* <MenuItem 
                    icon={<Heart size={18} />} 
                    title="Favorites" 
                    onPress={() => navigate('/profile/favorites')} 
                  />
                  <MenuItem 
                    icon={<Bell size={18} />} 
                    title="Notifications" 
                    onPress={() => navigate('/profile/notifications')} 
                  />
                  <MenuItem 
                    icon={<Shield size={18} />} 
                    title="Security" 
                    onPress={() => navigate('/profile/security')} 
                  /> */}
                  <MenuItem 
                    icon={<LogOut size={18} />} 
                    title="Logout" 
                    onPress={handleLogout} 
                    danger
                  />
                </div>
              </TabsContent>

              <TabsContent value="language" className="p-0 m-0">
                <div className="divide-y divide-gray-100">
                  <MenuItem 
                    icon={<Globe size={18} />} 
                    title="English" 
                    checked={language === 'en'}
                    onPress={() => handleLanguageChange('en')} 
                  />
                  <MenuItem 
                    icon={<Globe size={18} />} 
                    title="Українська" 
                    checked={language === 'uk'}
                    onPress={() => handleLanguageChange('uk')} 
                  />
                  <MenuItem 
                    icon={<Globe size={18} />} 
                    title="Русский" 
                    checked={language === 'ru'}
                    onPress={() => handleLanguageChange('ru')} 
                  />
                </div>
              </TabsContent>

              <TabsContent value="agreements" className="">
               {activeTab === 'agreements' && (
          <div className="mt-4 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Recent Orders</h3>
              <button className="text-pink-600 text-xs font-medium">View All</button>
            </div>
            
            <div className="space-y-6">
              <OrderCard 
                restaurant="Pizza Palace"
                items={["1 x Margherita", "2 x Garlic Bread"]}
                date="Today, 2:30 PM"
                total={32.98}
                status="Delivered"
              />
              <OrderCard 
                restaurant="Burger Corner"
                items={["1 x Cheeseburger", "1 x Fries", "1 x Soda"]}
                date="April 8, 6:45 PM"
                total={18.50}
                status="Delivered"
              />
            </div>
          </div>
        )}
              </TabsContent>

              <TabsContent value="gift-cards" className="p-6 m-0">
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
                    <Gift size={24} className="text-pink-500 mb-2" />
                    <h3 className="font-medium text-base">Gift Cards</h3>
                    <p className="text-xs text-gray-500 text-center mt-1">Purchase gift cards or redeem received ones</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-4 rounded-xl flex flex-col justify-between" style={{height: '120px'}}>
                      <div>
                        <h3 className="font-bold text-gray-800">$25</h3>
                        <p className="text-xs text-gray-600">For a quick meal</p>
                      </div>
                      <button className="bg-white text-pink-600 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                        Purchase
                      </button>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl flex flex-col justify-between" style={{height: '120px'}}>
                      <div>
                        <h3 className="font-bold text-gray-800">$50</h3>
                        <p className="text-xs text-gray-600">Share a meal</p>
                      </div>
                      <button className="bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                        Purchase
                      </button>
                    </div>
                    
                    <div className="col-span-2 border-2 border-dashed border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center" style={{height: '80px'}}>
                      <p className="text-gray-500 text-xs font-medium">Have a code?</p>
                      <button className="mt-2 bg-pink-50 text-pink-600 px-4 py-1 rounded-full text-xs font-medium">
                        Redeem Gift Card
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        
      </div>
      
      <BottomNavigation />
    </div>
  );
};

interface MenuItemProps {
  icon: JSX.Element;
  title: string;
  description?: string;
  onPress: () => void;
  danger?: boolean;
  checked?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  title, 
  description, 
  onPress,
  danger = false,
  checked = false
}) => (
  <button 
    className="flex items-center justify-between py-3 px-5 w-full hover:bg-pink-50/50"
    onClick={onPress}
  >
    <div className="flex items-center">
      <div className={`p-2 rounded-full mr-3 ${danger ? 'bg-red-50' : 'bg-pink-50'}`}>
        <span className={danger ? 'text-red-500' : 'text-pink-500'}>
          {icon}
        </span>
      </div>
      <div className="text-left">
        <h3 className={`font-medium text-sm ${danger ? 'text-red-600' : 'text-gray-700'}`}>{title}</h3>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
    </div>
    {checked ? (
      <span className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
        <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    ) : (
      <ChevronRight size={18} className="text-gray-400" />
    )}
  </button>
);

interface OrderCardProps {
  restaurant: string;
  items: string[];
  date: string;
  total: number;
  status: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  restaurant,
  items,
  date,
  total,
  status
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800">{restaurant}</h3>
          <p className="text-xs text-gray-500 mt-1">{items.join(" • ")}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-semibold text-gray-800">${total.toFixed(2)}</span>
          <span className={`text-xs px-2 py-0.5 mt-1 rounded-full ${
            status === 'Delivered' ? 'bg-green-100 text-green-700' : 
            status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {status}
          </span>
        </div>
      </div>
      
      <div className="mt-3 border-t border-gray-100 pt-3 flex justify-between items-center">
        <div className="flex items-center">
          <Star size={14} className="text-yellow-400" />
          <span className="text-xs ml-1 text-gray-600">Rate your order</span>
        </div>
        <button 
          className="text-xs text-pink-600 font-medium"
          onClick={() => navigate(`/order/123456`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
