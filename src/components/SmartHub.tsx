
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Globe2, Activity, Thermometer, Cloud, Wind, Sun, Moon, Users, TrendingUp, MessageSquare, CreditCard, Car, UtensilsCrossed } from 'lucide-react';

const SmartHub = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData] = useState({
    temperature: 22,
    condition: 'Солнечно',
    humidity: 65,
    windSpeed: 12,
    icon: Sun
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const aiMetrics = [
    { label: 'Отклик', value: '0.2с', icon: Zap, color: 'text-yellow-500' },
    { label: 'Сервисов', value: '7', icon: Globe2, color: 'text-blue-500' },
    { label: 'Время работы', value: '99.9%', icon: Activity, color: 'text-green-500' }
  ];

  const quickStats = [
    { label: 'Пользователи', value: '1M+', icon: Users, color: 'text-purple-500' },
    { label: 'Транзакции', value: '5.2K', icon: TrendingUp, color: 'text-emerald-500' }
  ];

  return (
    <div className="space-y-4">
      {/* Smart Hub Header */}
      <Card className="p-5 holographic-2025 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg gradient-text-2025">Smart Hub</h3>
                <p className="text-sm text-muted-foreground">Your AI-Powered Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-green-500">Активен</div>
              <div className="text-xs text-muted-foreground">100%</div>
            </div>
          </div>

          {/* AI Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {aiMetrics.map((metric, index) => (
              <div key={index} className="neomorphism-2025 p-3 rounded-xl text-center">
                <metric.icon className={`w-4 h-4 ${metric.color} mx-auto mb-2`} />
                <div className="text-sm font-bold">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            {quickStats.map((stat, index) => (
              <div key={index} className="neomorphism-2025 p-3 rounded-xl text-center">
                <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-2`} />
                <div className="text-sm font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Weather Intelligence */}
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <weatherData.icon className="w-5 h-5 text-orange-500" />
            <h4 className="font-semibold text-base">Weather Intelligence</h4>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{weatherData.temperature}°C</div>
            <div className="text-xs text-muted-foreground">{weatherData.condition}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg">
            <Cloud className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <div className="text-xs font-medium">{weatherData.humidity}%</div>
            <div className="text-xs text-muted-foreground">Влажность</div>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg">
            <Wind className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <div className="text-xs font-medium">{weatherData.windSpeed} км/ч</div>
            <div className="text-xs text-muted-foreground">Ветер</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SmartHub;
