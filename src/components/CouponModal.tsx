
import React, { useState } from 'react';
import { X, Gift, Copy, Check } from 'lucide-react';

interface CouponModalProps {
  onClose: () => void;
  onApply: (code: string) => void;
}

const CouponModal: React.FC<CouponModalProps> = ({ onClose, onApply }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const coupons = [
    { id: '1', code: 'WELCOME20', discount: '20% Off', description: 'For new users on their first order', validUntil: 'Jun 30' },
    { id: '2', code: 'FREESHIP', discount: 'Free Shipping', description: 'Free delivery on orders above $15', validUntil: 'Jul 15' },
    { id: '3', code: 'SUMMER10', discount: '$10 Off', description: 'On orders above $50', validUntil: 'Aug 31' }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApply = (code: string) => {
    navigator.clipboard.writeText(code); // Copy to clipboard
    onApply(code);
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content animate-slide-up">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Available Coupons</h2>
            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {coupons.map(coupon => (
              <div key={coupon.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-full mr-3">
                    <Gift size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{coupon.discount}</h3>
                      <span className="text-sm text-gray-500">Valid till {coupon.validUntil}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{coupon.description}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="bg-gray-100 py-1 px-3 rounded-lg border border-dashed border-gray-300">
                        <span className="font-mono font-medium">{coupon.code}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                          onClick={() => handleCopyCode(coupon.code)}
                        >
                          {copiedCode === coupon.code ? (
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
                        <button 
                          className="text-sm font-medium text-primary"
                          onClick={() => handleApply(coupon.code)}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponModal;
