
import React, { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';

const TelegramAdapter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setTheme } = useTheme();
  const { WebApp, isReady } = useTelegramWebApp();

  useEffect(() => {
    if (isReady && WebApp) {
      console.log('Telegram WebApp ready, version:', WebApp.version);
      
      // Получаем тему из Telegram только если доступно
      if (WebApp.colorScheme) {
        console.log('Telegram theme:', WebApp.colorScheme);
        setTheme(WebApp.colorScheme === 'dark' ? 'dark' : 'light');
      }

      // Устанавливаем цвета только если поддерживается
      const updateTelegramColors = () => {
        const isDark = document.documentElement.classList.contains('dark');
        console.log('Updating Telegram colors for theme:', isDark ? 'dark' : 'light');
        
        try {
          // Проверяем поддержку функций перед использованием
          if (WebApp.setHeaderColor && parseFloat(WebApp.version) >= 6.1) {
            WebApp.setHeaderColor(isDark ? '#1f2937' : '#ffffff');
          }
          if (WebApp.setBackgroundColor && parseFloat(WebApp.version) >= 6.1) {
            WebApp.setBackgroundColor(isDark ? '#111827' : '#f9fafb');
          }
        } catch (error) {
          console.log('Telegram color setting not supported:', error);
        }
      };

      updateTelegramColors();

      // Слушаем изменения темы в Telegram только если поддерживается
      if (WebApp.onEvent) {
        WebApp.onEvent('themeChanged', () => {
          console.log('Telegram theme changed');
          const newTheme = WebApp.colorScheme;
          if (newTheme) {
            setTheme(newTheme === 'dark' ? 'dark' : 'light');
          }
        });
      }
    }
  }, [isReady, WebApp, setTheme]);

  return <>{children}</>;
};

export default TelegramAdapter;
