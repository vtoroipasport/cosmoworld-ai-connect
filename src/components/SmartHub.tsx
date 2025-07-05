
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
  Car,
  Zap,
  Brain,
  Heart,
  Target,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
    wind: 12,
    feels_like: 24
  });
  const [stats, setStats] = useState({
    todayOrders: 3,
    totalSavings: 2340,
    activeChats: 5,
    todayDistance: 12.5,
    aiInteractions: 47,
    healthScore: 85,
    productivity: 92,
    mood: 'excellent'
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
      color: 'from-amber-500 to-orange-600',
      action: () => {
        toast({ title: "☕ AI заказывает капучино", description: "Готов через 6 минут • Ваш обычный заказ" });
        navigate('/food');
      }
    },
    {
      icon: Car,
      label: 'Такси',
      color: 'from-green-500 to-emerald-600',
      action: () => {
        toast({ title: "🚗 Автономное такси найдено", description: "Tesla Model S • 2 минуты до подачи" });
        navigate('/taxi');
      }
    },
    {
      icon: MessageSquare,
      label: 'AI Чат',
      color: 'from-blue-500 to-purple-600',
      action: () => navigate('/messenger')
    },
    {
      icon: DollarSign,
      label: 'Крипто',
      color: 'from-purple-500 to-pink-600',
      action: () => navigate('/payments')
    },
  ];

  const aiInsights = [
    { icon: Brain, label: 'AI Insights', value: stats.aiInteractions, unit: 'today', color: 'text-purple-600' },
    { icon: Heart, label: 'Health Score', value: stats.healthScore, unit: '%', color: 'text-red-500' },
    { icon: Target, label: 'Productivity', value: stats.productivity, unit: '%', color: 'text-green-600' },
    { icon: Sparkles, label: 'Mood', value: stats.mood, unit: '', color: 'text-yellow-600' }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Smart Hub Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-3xl flex items-center justify-center shadow-lg">
          <Activity className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black gradient-text-2025">
            Smart Hub 2025
          </h2>
          <p className="text-sm text-muted-foreground">Your AI-Powered Dashboard</p>
        </div>
      </div>

      {/* AI Status & Time */}
      <div className="card-2025 p-6 holographic-2025">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground font-medium">Neural Time</span>
            </div>
            <p className="text-2xl font-black text-primary gradient-text-2025">{formatTime(currentTime)}</p>
            <p className="text-xs text-muted-foreground">Moscow • GMT+3</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {getWeatherIcon()}
              <span className="text-sm text-muted-foreground font-medium">Weather AI</span>
            </div>
            <p className="text-2xl font-black text-primary">{weather.temp}°C</p>
            <p className="text-xs text-muted-foreground">Feels like {weather.feels_like}°C</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border/20">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-green-500">
              <Wifi className="w-4 h-4" />
              <span className="font-medium">5G Ultra</span>
            </div>
            <div className="flex items-center gap-2 text-blue-500">
              <Battery className="w-4 h-4" />
              <span className="font-medium">89%</span>
            </div>
            <div className="flex items-center gap-2 text-purple-500">
              <Eye className="w-4 h-4" />
              <span className="font-medium">AI Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="bento-grid">
        {aiInsights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="bento-card neomorphism-2025 p-4 text-center magnetic-2025">
              <Icon className={`w-6 h-6 ${insight.color} mx-auto mb-3`} />
              <p className="text-xl font-bold text-foreground">
                {typeof insight.value === 'string' ? insight.value : insight.value}
                {insight.unit && <span className="text-sm text-muted-foreground ml-1">{insight.unit}</span>}
              </p>
              <p className="text-xs text-muted-foreground font-medium mt-1">{insight.label}</p>
            </div>
          );
        })}
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card-2025 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600 font-bold">AI Savings</span>
          </div>
          <p className="text-2xl font-black text-green-700 dark:text-green-300">{stats.totalSavings}₽</p>
          <p className="text-xs text-green-600 mt-1">+{Math.round(stats.totalSavings * 0.15)}₽ this week</p>
        </div>

        <div className="card-2025 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-600 font-bold">Orders</span>
          </div>
          <p className="text-2xl font-black text-blue-700 dark:text-blue-300">{stats.todayOrders}</p>
          <p className="text-xs text-blue-600 mt-1">Smart automation</p>
        </div>

        <div className="card-2025 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-purple-600 font-bold">Chats</span>
          </div>
          <p className="text-2xl font-black text-purple-700 dark:text-purple-300">{stats.activeChats}</p>
          <p className="text-xs text-purple-600 mt-1">AI-Enhanced</p>
        </div>

        <div className="card-2025 p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-orange-600 font-bold">Distance</span>
          </div>
          <p className="text-2xl font-black text-orange-700 dark:text-orange-300">{stats.todayDistance} km</p>
          <p className="text-xs text-orange-600 mt-1">Green routes</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-2025 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-accent" />
          <span className="text-lg font-bold text-accent">AI Quick Actions</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="button-2025 h-16 flex-col gap-2 group relative overflow-hidden magnetic-2025"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-90 rounded-2xl`} />
                <div className="relative z-10 flex flex-col items-center gap-1 text-white">
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{action.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Weather */}
      <div className="card-2025 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-4">
          <Thermometer className="w-5 h-5 text-blue-600" />
          <span className="text-lg font-bold text-blue-600">Weather Intelligence</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="neomorphism-2025 p-4 rounded-2xl">
            <p className="text-xl font-black text-blue-700 dark:text-blue-300">{weather.temp}°</p>
            <p className="text-xs text-blue-600 mt-1">Temperature</p>
          </div>
          <div className="neomorphism-2025 p-4 rounded-2xl">
            <p className="text-xl font-black text-blue-700 dark:text-blue-300">{weather.humidity}%</p>
            <p className="text-xs text-blue-600 mt-1">Humidity</p>
          </div>
          <div className="neomorphism-2025 p-4 rounded-2xl">
            <p className="text-xl font-black text-blue-700 dark:text-blue-300">{weather.wind}</p>
            <p className="text-xs text-blue-600 mt-1">Wind m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHub;
