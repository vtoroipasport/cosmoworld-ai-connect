
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Wallet, Home, Car, ShoppingBag, Users, Briefcase, 
  UtensilsCrossed, Star, TrendingUp, Zap, Brain, Sparkles, Send, 
  User, Settings, Bell, Search, MapPin, Clock, DollarSign, 
  CreditCard, Battery, Wifi, Sun, CloudRain, ThermometerSun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
import VoiceAssistant from '@/components/VoiceAssistant';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    { 
      id: 'messenger', 
      name: 'Мессенджер', 
      icon: MessageSquare, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Общение с друзьями'
    },
    { 
      id: 'payments', 
      name: 'Платежи', 
      icon: Wallet, 
      color: 'from-green-500 to-emerald-500',
      description: 'Переводы и оплата'
    },
    { 
      id: 'housing', 
      name: 'Жилье', 
      icon: Home, 
      color: 'from-orange-500 to-red-500',
      description: 'Аренда и продажа'
    },
    { 
      id: 'taxi', 
      name: 'Такси', 
      icon: Car, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Быстрые поездки'
    },
    { 
      id: 'marketplace', 
      name: 'Маркетплейс', 
      icon: ShoppingBag, 
      color: 'from-purple-500 to-pink-500',
      description: 'Покупки онлайн'
    },
    { 
      id: 'groups', 
      name: 'Группы', 
      icon: Users, 
      color: 'from-indigo-500 to-purple-500',
      description: 'Сообщества'
    },
    { 
      id: 'jobs', 
      name: 'Работа', 
      icon: Briefcase, 
      color: 'from-teal-500 to-green-500',
      description: 'Поиск заработка'
    },
    { 
      id: 'food', 
      name: 'Еда', 
      icon: UtensilsCrossed, 
      color: 'from-red-500 to-pink-500',
      description: 'Доставка еды'
    }
  ];

  const quickActions = [
    { id: 'pay', name: 'Платеж', icon: CreditCard, action: () => navigate('/payments') },
    { id: 'taxi', name: 'Такси', icon: Car, action: () => navigate('/taxi') },
    { id: 'food', name: 'Еда', icon: UtensilsCrossed, action: () => navigate('/food') },
    { id: 'wallet', name: 'Кошелек', icon: Wallet, action: () => navigate('/payments') }
  ];

  const weatherData = {
    temp: 22,
    condition: 'sunny',
    location: 'Москва'
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Поиск",
      description: `Ищем: ${searchQuery}`,
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Quantum Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-pulse animation-delay-500" />
        <div className="absolute bottom-40 left-32 w-48 h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      </div>

      <div className="max-w-md mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-foreground mb-1">CosmoWorld</h1>
            <p className="text-muted-foreground">Ваша цифровая вселенная</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="rounded-2xl">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-2xl">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Quick Search */}
        <ModernCard variant="glass" className="mb-6 p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Найти услуги, людей, места..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 glass-morphism border-primary/30 focus:border-primary"
            />
            <NeonButton
              onClick={handleSearch}
              size="sm"
              className="px-4"
            >
              <Search className="w-4 h-4" />
            </NeonButton>
          </div>
        </ModernCard>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {quickActions.map((action) => (
            <ModernCard
              key={action.id}
              onClick={action.action}
              variant="glass"
              className="p-3 cursor-pointer group text-center"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-foreground font-medium">{action.name}</span>
            </ModernCard>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {services.map((service, index) => (
            <ModernCard
              key={service.id}
              onClick={() => navigate(`/${service.id}`)}
              variant="glass"
              className="p-4 cursor-pointer group animate-scale-in-bounce magnetic-element"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-foreground font-semibold mb-1 text-base">{service.name}</h3>
              <p className="text-muted-foreground text-xs leading-tight">{service.description}</p>
            </ModernCard>
          ))}
        </div>

        {/* Smart Hub */}
        <ModernCard variant="holographic" className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-foreground font-bold text-lg">Smart Hub</h3>
              <p className="text-muted-foreground text-sm">Ваш персональный центр</p>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="glass-morphism rounded-2xl p-4 mb-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  {weatherData.condition === 'sunny' ? <Sun className="w-6 h-6 text-white" /> : <CloudRain className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <div className="text-foreground font-bold text-xl">{weatherData.temp}°C</div>
                  <div className="text-muted-foreground text-sm">{weatherData.location}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-muted-foreground text-sm">Сегодня</div>
                <div className="text-foreground font-medium">Солнечно</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center glass-morphism rounded-xl p-3">
              <div className="text-2xl font-bold text-foreground">₽2,450</div>
              <div className="text-xs text-muted-foreground">Заработано</div>
            </div>
            <div className="text-center glass-morphism rounded-xl p-3">
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-xs text-muted-foreground">Заказов</div>
            </div>
            <div className="text-center glass-morphism rounded-xl p-3">
              <div className="text-2xl font-bold text-foreground flex items-center justify-center gap-1">
                4.9 <Star className="w-3 h-3 text-yellow-500 fill-current" />
              </div>
              <div className="text-xs text-muted-foreground">Рейтинг</div>
            </div>
          </div>

          {/* System Status */}
          <div className="glass-morphism rounded-2xl p-4 border border-green-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground font-semibold text-sm">Статус системы</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Wifi className="w-3 h-3 text-green-500" />
                <span className="text-muted-foreground">Сеть</span>
              </div>
              <div className="flex items-center gap-2">
                <Battery className="w-3 h-3 text-green-500" />
                <span className="text-muted-foreground">Энергия</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-green-500" />
                <span className="text-muted-foreground">ИИ</span>
              </div>
            </div>
          </div>
        </ModernCard>
      </div>
    </div>
  );
};

export default Index;
