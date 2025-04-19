
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../context/LanguageContext';

const Intro2Page = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-xs mb-8">
          <img 
            src="/lovable-uploads/ed909d26-abd7-4ce3-a8bd-9c2fe7ff0668.png"
            alt="Food ordering" 
            className="w-full"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4">Ready to Order?</h1>
        <p className="text-gray-600 mb-10 max-w-md">
          Find your favorite meals from the best restaurants and get them delivered right to your doorstep.
        </p>

        <div className="w-full max-w-md flex space-x-4">
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
            onClick={() => navigate('/home')}
          >
            {t("app.continue")}
          </Button>
        </div>
      </div>

      <div className="pb-10 pt-4 flex justify-center">
        <button 
          className="text-gray-400 text-sm hover:text-gray-600"
          onClick={() => navigate('/home')}
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
};

export default Intro2Page;
