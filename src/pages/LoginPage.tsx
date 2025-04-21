import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useUser } from '../context/UserContext';
import { toast } from 'sonner';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [step, setStep] = useState<'methods' | 'phone-input' | 'otp'>('methods');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    console.log('Loading Telegram Login Widget');
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', '@meanger_stuabot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', 'https://food-app-backend-production-c1bf.up.railway.app/api/auth/telegram');
    script.setAttribute('data-request-access', 'write');
    document.getElementById('telegram-login')?.appendChild(script);

    window.onTelegramAuth = (user: any) => {
      console.log('Telegram auth data:', user);
      axios.post('https://food-app-backend-production-c1bf.up.railway.app/api/auth/telegram', user)
        .then(response => {
          console.log('Telegram auth success:', response.data);
          login(response.data.user, response.data.token);
          toast.success('Logged in successfully via Telegram!');
          navigate('/home');
        })
        .catch(error => {
          console.error('Telegram login error:', error.response?.data || error.message);
          const errorMessage = error.response?.data?.error || error.message;
          toast.error(`Telegram login failed: ${errorMessage}`);
        });
    };

    return () => {
      console.log('Cleaning up Telegram Login Widget');
      const telegramLogin = document.getElementById('telegram-login');
      if (telegramLogin && script.parentNode) {
        telegramLogin.removeChild(script);
      }
    };
  }, [login, navigate]);

  const handleGoogleLogin = () => {
    toast.info('Google login not implemented yet');
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    setStep('otp');
    toast.success('OTP sent to your phone');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      toast.error('Please enter a valid OTP');
      return;
    }
    toast.info('Phone login not implemented yet');
  };

  return (
    <div className="app-container page-container">
      <div className="sticky top-0 z-20 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button 
            className="mr-3"
            onClick={() => step === 'methods' ? navigate(-1) : setStep('methods')}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">
            {step === 'methods' ? 'Login' : step === 'phone-input' ? 'Phone Login' : 'Enter OTP'}
          </h1>
        </div>
      </div>

      <div className="p-6">
        {step === 'methods' && (
          <div className="space-y-6">
            <p className="text-center text-gray-600 mb-8">
              Choose your preferred login method
            </p>

            <div id="telegram-login" className="w-full flex justify-center"></div>

            <button 
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-xl flex items-center justify-center font-medium shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            <button 
              onClick={() => setStep('phone-input')}
              className="w-full py-3 px-4 bg-primary text-white rounded-xl flex items-center justify-center font-medium"
            >
              <Phone size={20} className="mr-2" />
              Continue with Phone
            </button>
          </div>
        )}

        {step === 'phone-input' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <p className="text-center text-gray-600 mb-4">
              Enter your phone number to receive a verification code
            </p>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 234 567 8900"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 px-4 bg-primary text-white rounded-xl font-medium"
            >
              Send Code
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <p className="text-center text-gray-600 mb-4">
              Enter the 4-digit code sent to {phoneNumber}
            </p>

            <div className="flex justify-center">
              <InputOTP 
                maxLength={4}
                value={otp}
                onChange={(value) => setOtp(value)}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots && slots.length > 0 ? slots.map((slot, index) => (
                      <InputOTPSlot key={index} index={index} className="w-12 h-14 text-xl" />
                    )) : (
                      Array(4).fill(0).map((_, index) => (
                        <InputOTPSlot key={index} index={index} className="w-12 h-14 text-xl" />
                      ))
                    )}
                  </InputOTPGroup>
                )}
              />
            </div>

            <p className="text-center text-sm">
              Didn't receive code? <button type="button" className="text-primary font-medium">Resend</button>
            </p>

            <button 
              type="submit"
              className="w-full py-3 px-4 bg-primary text-white rounded-xl font-medium"
            >
              Verify & Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;