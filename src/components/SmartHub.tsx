
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Battery, 
  Wifi, 
  CloudRain,
  Sun,
  Thermometer,
  Wind,
  Eye,
  Bell,
  Calendar,
  Users,
  MessageSquare,
  Coffee,
  Car
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';

interface SmartHubProps {
  className?: string;
}

const SmartHub = ({ className = "" }: SmartHubProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: 22,
    condition: 'sunny',
    humidity: 65,
    wind: 12
  });
  const [stats, setStats] = useState({
    todayOrders: 3,
    totalSavings: 2340,
    activeChats: 5,
    todayDistance: 12.5
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'rainy': return <CloudRain className="w-5 h-5 text-blue-500" />;
      default: return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  const quickActions = [
    {
      icon: Coffee,
      label: 'Кофе',
      action: () => {
        toast({ title: "☕ Заказываю ваш обычный капучино", description: "Готов через 6 минут" });
        navigate('/food');
      }
    },
    {
      icon: Car,
      label: 'Такси',
      action: () => {
        toast({ title: "🚗 Ищу ближайшую машину", description: "Водитель в 2 минутах от вас" });
        navigate('/taxi');
      }
    },
    {
      icon: MessageSquare,
      label: 'Чат',
      action: () => navigate('/messenger')
    },
    {
      icon: DollarSign,
      label: 'Оплата',
      action: () => navigate('/payments')
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Заголовок Smart Hub */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Smart Hub
          </h2>
          <p className="text-sm text-muted-foreground">Ваша персональная панель</p>
        </div>
      </div>

      {/* Время и системная информация */}
      <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Время</span>
            </div>
            <p className="text-lg font-bold text-primary">{formatTime(currentTime)}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getWeatherIcon()}
              <span className="text-xs text-muted-foreground">Погода</span>
            </div>
            <p className="text-lg font-bold text-primary">{weather.temp}°C</p>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-primary/20">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              <span>5G</span>
            </div>
            <div className="flex items-center gap-1">
              <Battery className="w-3 h-3" />
              <span>89%</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>Активен</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Статистика активности */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-600 font-medium">Экономия</span>
          </div>
          <p className="text-lg font-bold text-green-700 dark:text-green-300">{stats.totalSavings}₽</p>
          <p className="text-xs text-green-600">За месяц</p>
        </Card>

        <Card className="p-3 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">Заказы</span>
          </div>
          <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{stats.todayOrders}</p>
          <p className="text-xs text-blue-600">Сегодня</p>
        </Card>

        <Card className="p-3 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-xs text-purple-600 font-medium">Чаты</span>
          </div>
          <p className="text-lg font-bold text-purple-700 dark:text-purple-300">{stats.activeChats}</p>
          <p className="text-xs text-purple-600">Активных</p>
        </Card>

        <Card className="p-3 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span className="text-xs text-orange-600 font-medium">Путь</span>
          </div>
          <p className="text-lg font-bold text-orange-700 dark:text-orange-300">{stats.todayDistance} км</p>
          <p className="text-xs text-orange-600">Сегодня</p>
        </Card>
      </div>

      {/* Быстрые действия */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent">Быстрые действия</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <NeonButton
                key={index}
                variant="outline"
                size="sm"
                onClick={action.action}
                className="h-12 flex-col gap-1"
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{action.label}</span>
              </NeonButton>
            );
          })}
        </div>
      </Card>

      {/* Детальная погодная информация */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-3">
          <Thermometer className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">Подробная погода</span>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{weather.temp}°</p>
            <p className="text-xs text-blue-600">Температура</p>
          </div>
          <div>
            <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{weather.humidity}%</p>
            <p className="text-xs text-blue-600">Влажность</p>
          </div>
          <div>
            <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{weather.wind}</p>
            <p className="text-xs text-blue-600">Ветер м/с</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SmartHub;
