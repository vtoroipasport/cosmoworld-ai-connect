
import React, { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';

const TelegramAdapter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setTheme } = useTheme();
  const { WebApp, isReady } = useTelegramWebApp();

  useEffect(() => {
    if (isReady && WebApp) {
      // Синхронизируем тему с Telegram
      const telegramTheme = WebApp.colorScheme;
      if (telegramTheme) {
        setTheme(telegramTheme === 'dark' ? 'dark' : 'light');
      }

      // Обновляем цвета для Telegram WebApp
      const updateTelegramColors = () => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          WebApp.setHeaderColor('#1f2937');
          WebApp.setBackgroundColor('#111827');
        } else {
          WebApp.setHeaderColor('#ffffff');
          WebApp.setBackgroundColor('#f9fafb');
        }
      };

      updateTelegramColors();

      // Слушаем изменения темы в Telegram
      WebApp.onEvent('themeChanged', () => {
        const newTheme = WebApp.colorScheme;
        if (newTheme) {
          setTheme(newTheme === 'dark' ? 'dark' : 'light');
        }
      });
    }
  }, [isReady, WebApp, setTheme]);

  return <>{children}</>;
};

export default TelegramAdapter;
