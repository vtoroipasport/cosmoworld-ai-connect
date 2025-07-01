
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

export const useTelegramWebApp = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && WebApp) {
      WebApp.ready();
      WebApp.expand();
      
      // Настройка темы
      WebApp.setHeaderColor('#1f2937');
      WebApp.setBackgroundColor('#f9fafb');
      
      // Включение кнопки "Назад"
      WebApp.BackButton.show();
      
      // Получение данных пользователя
      if (WebApp.initDataUnsafe?.user) {
        setUser(WebApp.initDataUnsafe.user as TelegramUser);
      }
      
      setIsReady(true);
    }
  }, []);

  const showMainButton = (text: string, onClick: () => void) => {
    WebApp.MainButton.setText(text);
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(onClick);
  };

  const hideMainButton = () => {
    WebApp.MainButton.hide();
  };

  const showAlert = (message: string) => {
    WebApp.showAlert(message);
  };

  const showConfirm = (message: string, callback: (confirmed: boolean) => void) => {
    WebApp.showConfirm(message, callback);
  };

  const hapticFeedback = (type: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') => {
    if (WebApp.HapticFeedback) {
      WebApp.HapticFeedback.impactOccurred(type);
    }
  };

  const close = () => {
    WebApp.close();
  };

  return {
    user,
    isReady,
    WebApp,
    showMainButton,
    hideMainButton,
    showAlert,
    showConfirm,
    hapticFeedback,
    close
  };
};
