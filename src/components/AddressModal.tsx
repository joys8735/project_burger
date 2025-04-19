
import React, { useState } from 'react';
import { X, MapPin, CheckCircle } from 'lucide-react';

interface AddressModalProps {
  onClose: () => void;
  onSelectAddress: (address: string) => void;
  currentAddress: string;
}

const AddressModal: React.FC<AddressModalProps> = ({ onClose, onSelectAddress, currentAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState<string>(currentAddress);
  
  // Sample addresses - in a real app these would come from an API or user data
  const savedAddresses = [
    "123 Main Street, Apt 4B, New York",
    "456 Park Avenue, Suite 203, New York",
    "789 Broadway, Floor 5, New York",
    "101 Fifth Avenue, Penthouse, New York"
  ];
  
  const handleConfirm = () => {
    onSelectAddress(selectedAddress);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal-overlay bg-black/50" onClick={onClose}></div>
      <div className="modal-content w-11/12 max-w-lg bg-white rounded-2xl shadow-xl soft-glass-effect animate-slide-up max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-pink-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-sm z-10">
          <h3 className="text-lg font-bold flex items-center">
            <MapPin className="mr-2 text-primary" size={18} strokeWidth={1.5} />
            Select Delivery Address
          </h3>
          <button 
            className="rounded-full p-2 hover:bg-pink-50 transition-colors"
            onClick={onClose}
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {savedAddresses.map((address, index) => (
            <div 
              key={index}
              className={`mb-3 p-4 rounded-xl border transition-all cursor-pointer flex items-center ${
                selectedAddress === address 
                  ? 'border-primary bg-primary/10' 
                  : 'border-pink-100 hover:border-primary/30'
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              <div className="flex-1">
                <p className="font-medium">{address}</p>
              </div>
              {selectedAddress === address && (
                <CheckCircle className="text-primary ml-2" size={18} strokeWidth={1.5} />
              )}
            </div>
          ))}
          
          <div className="mt-4 bg-pink-50/50 rounded-xl p-4">
            <h4 className="font-medium mb-2 text-sm">Add New Address</h4>
            <textarea 
              className="w-full p-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white/70"
              placeholder="Enter your full address here..."
              rows={3}
              value={selectedAddress === savedAddresses.find(a => a === selectedAddress) ? '' : selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            />
          </div>
        </div>
        
        <div className="p-4 border-t border-pink-100 sticky bottom-0 bg-white/90 backdrop-blur-sm">
          <div className="flex gap-3">
            <button 
              className="flex-1 py-3 px-4 rounded-full border border-pink-200 font-medium"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="flex-1 py-3 px-4 rounded-full bg-primary text-white font-medium shadow-md"
              onClick={handleConfirm}
            >
              Confirm Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
