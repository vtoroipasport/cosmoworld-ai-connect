
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
      console.log('Initializing Telegram WebApp, version:', WebApp.version);
      
      try {
        WebApp.ready();
        WebApp.expand();
        
        // Проверяем поддержку функций перед использованием
        if (WebApp.setHeaderColor && parseFloat(WebApp.version) >= 6.1) {
          WebApp.setHeaderColor('#1f2937');
        }
        if (WebApp.setBackgroundColor && parseFloat(WebApp.version) >= 6.1) {
          WebApp.setBackgroundColor('#f9fafb');
        }
        
        // Показываем кнопку "Назад" если поддерживается
        if (WebApp.BackButton && WebApp.BackButton.show) {
          WebApp.BackButton.show();
        }
        
        // Получение данных пользователя
        if (WebApp.initDataUnsafe?.user) {
          setUser(WebApp.initDataUnsafe.user as TelegramUser);
          console.log('Telegram user:', WebApp.initDataUnsafe.user);
        }
        
        setIsReady(true);
      } catch (error) {
        console.log('Telegram WebApp initialization error:', error);
        setIsReady(true); // Все равно помечаем как готовое для работы в браузере
      }
    }
  }, []);

  const showMainButton = (text: string, onClick: () => void) => {
    if (WebApp && WebApp.MainButton) {
      WebApp.MainButton.setText(text);
      WebApp.MainButton.show();
      WebApp.MainButton.onClick(onClick);
    }
  };

  const hideMainButton = () => {
    if (WebApp && WebApp.MainButton) {
      WebApp.MainButton.hide();
    }
  };

  const showAlert = (message: string) => {
    if (WebApp && WebApp.showAlert) {
      WebApp.showAlert(message);
    } else {
      alert(message);
    }
  };

  const showConfirm = (message: string, callback: (confirmed: boolean) => void) => {
    if (WebApp && WebApp.showConfirm) {
      WebApp.showConfirm(message, callback);
    } else {
      const result = confirm(message);
      callback(result);
    }
  };

  const hapticFeedback = (type: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') => {
    // Проверяем поддержку HapticFeedback
    if (WebApp && WebApp.HapticFeedback && parseFloat(WebApp.version) >= 6.1) {
      try {
        WebApp.HapticFeedback.impactOccurred(type);
      } catch (error) {
        console.log('Haptic feedback not supported:', error);
      }
    }
  };

  const close = () => {
    if (WebApp && WebApp.close) {
      WebApp.close();
    }
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
