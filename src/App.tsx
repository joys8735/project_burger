import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import { UserProvider } from "./context/UserContext";

// 🆕 Додаємо ScrollToTop
import ScrollToTop from "./components/ScrollToTop";

// Pages
import IntroPage from "./pages/IntroPage";
import Intro2Page from "./pages/Intro2Page";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import MenuPage from "./pages/MenuPage";
import RestaurantPage from "./pages/RestaurantPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import TrackingPage from "./pages/TrackingPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import GiftCardsPage from "./pages/GiftCardsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <UserProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop /> {/* 🆕 Ось ця вставка */}
              <Routes>
                <Route path="/" element={<IntroPage />} />
                <Route path="/intro1" element={<IntroPage />} />
                <Route path="/intro2" element={<Intro2Page />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/restaurant/:id" element={<RestaurantPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/tracking" element={<TrackingPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/gift-cards" element={<GiftCardsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </UserProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
