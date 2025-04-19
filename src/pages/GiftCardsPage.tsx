
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Gift, Mail, Copy, Tag, Check } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import { toast } from 'sonner';

const GiftCardsPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'purchase' | 'redeem'>('purchase');
  const [selectedCard, setSelectedCard] = useState<number | null>(0);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [redeemCode, setRedeemCode] = useState('');

  const giftCards = [
    { id: 1, amount: 25, color: 'from-blue-400 to-blue-600', description: 'Perfect for a quick meal' },
    { id: 2, amount: 50, color: 'from-purple-400 to-purple-600', description: 'Great for sharing a meal' },
    { id: 3, amount: 100, color: 'from-green-400 to-green-600', description: 'Ideal for special occasions' }
  ];

  const myGiftCards = [
    { id: 'GC1234', amount: 50, balance: 50, validUntil: '31 Dec 2023', code: 'GIFT-1234-ABCD' },
    { id: 'GC5678', amount: 25, balance: 10, validUntil: '15 Jan 2024', code: 'GIFT-5678-EFGH' }
  ];

  const handlePurchase = () => {
    if (!selectedCard) {
      toast.error('Please select a gift card');
      return;
    }
    
    if (!recipientEmail) {
      toast.error('Please enter recipient email');
      return;
    }

    // Simulate purchase success
    toast.success(`Gift card purchased and sent to ${recipientEmail}`);
    setRecipientEmail('');
    setMessage('');
  };

  const handleRedeem = () => {
    if (!redeemCode) {
      toast.error('Please enter a gift card code');
      return;
    }

    // Simulate successful redemption
    toast.success('Gift card redeemed successfully!');
    setRedeemCode('');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="app-container page-container">
      <div className="sticky top-0 z-20 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button 
            className="mr-3"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Gift Cards</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Tabs */}
        <div className="flex border rounded-lg overflow-hidden mb-6">
          <button 
            className={`flex-1 py-2.5 ${selectedTab === 'purchase' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setSelectedTab('purchase')}
          >
            Purchase
          </button>
          <button 
            className={`flex-1 py-2.5 ${selectedTab === 'redeem' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setSelectedTab('redeem')}
          >
            Redeem / My Cards
          </button>
        </div>

        {selectedTab === 'purchase' ? (
          <>
            <h2 className="font-semibold mb-4">Select a Gift Card</h2>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {giftCards.map((card, index) => (
                <button 
                  key={card.id}
                  className={`bg-gradient-to-r ${card.color} text-white p-4 rounded-xl flex flex-col justify-between h-24 ${
                    selectedCard === index ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCard(index)}
                >
                  <div>
                    <h3 className="font-bold">${card.amount} Gift Card</h3>
                    <p className="text-sm text-white text-opacity-80">{card.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Recipient Email</label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-3">
                    <Mail size={20} className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter recipient email"
                    className="flex-1 py-3 px-4 outline-none"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message (Optional)</label>
                <textarea
                  placeholder="Add a personal message"
                  className="w-full border rounded-lg p-3 outline-none h-24"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>

            <button 
              className="bg-primary text-white w-full py-3 rounded-full font-medium"
              onClick={handlePurchase}
            >
              Purchase Gift Card
            </button>
          </>
        ) : (
          <>
            {/* Redeem Gift Card */}
            <div className="mb-6">
              <h2 className="font-semibold mb-3">Redeem a Gift Card</h2>
              <div className="flex items-center border rounded-lg overflow-hidden mb-4">
                <div className="bg-gray-100 p-3">
                  <Tag size={20} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Enter gift card code"
                  className="flex-1 py-3 px-4 outline-none"
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                />
              </div>
              <button 
                className="bg-primary text-white w-full py-3 rounded-full font-medium"
                onClick={handleRedeem}
              >
                Redeem Card
              </button>
            </div>

            {/* My Gift Cards */}
            <div>
              <h2 className="font-semibold mb-3">My Gift Cards</h2>
              {myGiftCards.length > 0 ? (
                <div className="space-y-4">
                  {myGiftCards.map((card) => (
                    <div key={card.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <Gift size={18} className="text-primary mr-2" />
                            <h3 className="font-medium">${card.amount} Gift Card</h3>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Balance: ${card.balance} • Valid until {card.validUntil}
                          </p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 bg-gray-50 p-2 rounded">
                        <span className="font-mono text-sm">{card.code}</span>
                        <button 
                          className="flex items-center text-primary text-sm"
                          onClick={() => handleCopyCode(card.code)}
                        >
                          {copiedCode === card.code ? (
                            <>
                              <Check size={16} className="mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={16} className="mr-1" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <div className="bg-gray-100 rounded-full p-3 inline-flex mb-3">
                    <Gift size={24} className="text-gray-500" />
                  </div>
                  <p>You don't have any gift cards yet</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default GiftCardsPage;
