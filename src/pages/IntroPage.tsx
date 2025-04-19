
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';

const IntroPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4">
        <Button 
          variant="ghost"
          onClick={() => navigate('/intro2')}
          className="text-primary"
        >
          {t("app.skip")}
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-primary rounded-full p-6 mb-8">
          <img 
            src="/lovable-uploads/ed909d26-abd7-4ce3-a8bd-9c2fe7ff0668.png" 
            alt="App Logo" 
            className="w-16 h-16 object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4">{t("app.welcome")}</h1>
        <p className="text-gray-600 mb-8">
          Your favorite food delivered fast!
        </p>

        <div className="bg-gray-100 p-6 rounded-xl w-full max-w-md">
          <h2 className="text-lg font-semibold mb-3">Terms and Conditions</h2>
          <div className="text-sm text-gray-600 text-left h-40 overflow-y-auto mb-4 p-2 border border-gray-200 rounded bg-white">
            <p className="mb-2">
              Welcome to QuickGrub! These Terms and Conditions govern your use of the QuickGrub application and services.
            </p>
            <p className="mb-2">
              By using our services, you agree to these terms. Please read them carefully.
            </p>
            <h3 className="font-semibold my-2">1. Acceptance of Terms</h3>
            <p className="mb-2">
              By accessing or using the QuickGrub app, you agree to be bound by these Terms and Conditions.
            </p>
            <h3 className="font-semibold my-2">2. User Accounts</h3>
            <p className="mb-2">
              To use certain features of the Service, you may need to create an account. You are responsible for maintaining the confidentiality of your account information.
            </p>
            <h3 className="font-semibold my-2">3. Order and Delivery</h3>
            <p className="mb-2">
              QuickGrub is a platform connecting you with restaurants and delivery services. Delivery times are estimates and may vary due to factors outside our control.
            </p>
            <h3 className="font-semibold my-2">4. Payments</h3>
            <p className="mb-2">
              We use secure payment methods but are not responsible for any issues between you and payment providers.
            </p>
          </div>

          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="agree-terms" 
              className="mr-2"
            />
            <label htmlFor="agree-terms" className="text-sm">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white py-3"
          onClick={() => navigate('/intro2')}
        >
          {t("app.continue")}
        </Button>
      </div>
    </div>
  );
};

export default IntroPage;
