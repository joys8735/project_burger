
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'uk' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Simplified translation dictionary
const translations: Record<string, Record<Language, string>> = {
  "app.title": {
    en: "QuickGrub",
    uk: "ШвидкаЇжа",
    ru: "БыстраяЕда"
  },
  "featured.products" : {
    en: "Featured Products",
    uk: "Рекомендовані продукти",
    ru: "Рекомендуемые продукты"
  },
  "exclusive.deals": {  
    en: "Exclusive Deals",
    uk: "Ексклюзивні знижки",
    ru: "Эксклюзивные скидки"
  },
  "app.suggestions": {
    en: "Suggestions for you",
    uk: "Пропозиції для вас",
    ru: "Предложения для вас"
  },
  "deal.discount": {
    en: "Get 20% off on your first order",
    uk: "Отримайте 20% знижки на перше замовлення",
    ru: "Получите 20% скидку на первый заказ"  
  },
  "Proceed.Checkout": {
    en: "Proceed to Checkout",
    uk: "Перейти до оформлення замовлення",
    ru: "Перейти к оформлению заказа"
  },
  "order.now": {
    en: "Order Now",
    uk: "Замовити зараз",
    ru: "Заказать сейчас"
  },
  "deal.code": {
    en: "Use code",
    uk: "Використайте код",
    ru: "Используйте код"
  },
  "app.welcome": {
    en: "Welcome to Foodie",
    uk: "Ласкаво просимо до Фуді",
    ru: "Добро пожаловать в Фуди"
  },
  "app.skip": {
    en: "Skip",
    uk: "Пропустити",
    ru: "Пропустить"
  },
  "app.continue": {
    en: "Continue",
    uk: "Продовжити",
    ru: "Продолжить"
  },
  "nav.home": {
    en: "Home",
    uk: "Головна",
    ru: "Главная"
  },
  "nav.menu": {
    en: "Menu",
    uk: "Меню",
    ru: "Меню"
  },
  "nav.cart": {
    en: "Cart",
    uk: "Кошик",
    ru: "Корзина"
  },
  "nav.notifications": {
    en: "Notifications",
    uk: "Сповіщення",
    ru: "Уведомления"
  },
  "nav.profile": {
    en: "Profile",
    uk: "Профіль",
    ru: "Профиль"
  },
  "category.burger": {
    en: "Burger",
    uk: "Бургер",
    ru: "Бургер"
  },
  "category.mexican": {
    en: "Mexican",
    uk: "Мексиканська",
    ru: "Мексиканская"
  },
  "category.pizza": {
    en: "Pizza",
    uk: "Піца",
    ru: "Пицца"
  },
  "category.candy": {
    en: "Candy",
    uk: "Солодощі",
    ru: "Сладости"
  },
  "explore.categories": {
    en: "Explore the Categories",
    uk: "Перегляньте категорії",
    ru: "Исследуйте категории"
  },
  "view.all": {
    en: "View all",
    uk: "Переглянути все",
    ru: "Посмотреть все"
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
