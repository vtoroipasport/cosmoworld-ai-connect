
import React, { useEffect } from 'react';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';
import { useTheme } from '@/contexts/ThemeContext';

interface TelegramAdapterProps {
  children: React.ReactNode;
}

const TelegramAdapter: React.FC<TelegramAdapterProps> = ({ children }) => {
  const { isReady, WebApp, user } = useTelegramWebApp();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (isReady && WebApp) {
      // Автоматическая настройка темы на основе Telegram
      const colorScheme = WebApp.colorScheme;
      setTheme(colorScheme === 'dark' ? 'dark' : 'light');

      // Обработка изменения темы в Telegram
      const handleThemeChange = () => {
        setTheme(WebApp.colorScheme === 'dark' ? 'dark' : 'light');
      };

      WebApp.onEvent('themeChanged', handleThemeChange);

      return () => {
        WebApp.offEvent('themeChanged', handleThemeChange);
      };
    }
  }, [isReady, WebApp, setTheme]);

  // Показываем загрузку пока Telegram WebApp не готов
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Загрузка Cosmo...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default TelegramAdapter;
