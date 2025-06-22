
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, DollarSign, MapPin, CarTaxiFront, ShoppingCart, Mic, Bell, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  const features = [
    {
      icon: MessageSquare,
      title: 'Мессенджер',
      description: 'Чаты, голос, видео',
      gradient: 'from-blue-500 to-purple-600',
      path: '/messenger'
    },
    {
      icon: DollarSign,
      title: 'Cosmo Pay',
      description: 'Голосовые платежи',
      gradient: 'from-yellow-400 to-orange-500',
      path: '/payments'
    },
    {
      icon: MapPin,
      title: 'Аренда жилья',
      description: 'Умное бронирование',
      gradient: 'from-green-400 to-blue-500',
      path: '/housing'
    },
    {
      icon: CarTaxiFront,
      title: 'Такси',
      description: 'С картой водителей',
      gradient: 'from-purple-500 to-pink-500',
      path: '/taxi'
    },
    {
      icon: ShoppingCart,
      title: 'Доставка еды',
      description: 'ИИ рекомендации',
      gradient: 'from-red-400 to-pink-500',
      path: '/food'
    },
    {
      icon: Briefcase,
      title: 'Работа',
      description: 'Поиск вакансий',
      gradient: 'from-emerald-500 to-teal-500',
      path: '/jobs'
    },
    {
      icon: Users,
      title: 'Группы',
      description: 'До 10М участников',
      gradient: 'from-indigo-500 to-purple-600',
      path: '/groups'
    }
  ];

  const handleVoiceCommand = () => {
    setIsListening(!isListening);
    console.log('Cosmo AI voice command activated (powered by Grok AI)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">CosmoLife</h1>
              <p className="text-purple-300 text-sm">Powered by Cosmo AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Voice Assistant */}
      <div className="max-w-md mx-auto px-4 py-6">
        <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm">
          <div className="p-6 text-center">
            <div className="mb-4">
              <Button
                onClick={handleVoiceCommand}
                className={`w-16 h-16 rounded-full transition-all duration-300 ${
                  isListening
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110'
                }`}
              >
                <Mic className="w-8 h-8 text-white" />
              </Button>
            </div>
            <h2 className="text-white text-lg font-semibold mb-2">Cosmo AI</h2>
            <p className="text-purple-300 text-sm">
              {isListening ? 'Слушаю вас...' : 'Нажмите для голосовой команды'}
            </p>
          </div>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-white text-lg font-semibold mb-4">Сервисы</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => navigate(feature.path)}
              >
                <div className="p-4 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium text-sm mb-1">{feature.title}</h4>
                  <p className="text-purple-300 text-xs">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-white text-lg font-semibold mb-4">Быстрые действия</h3>
        <div className="space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={() => navigate('/messenger')}
          >
            Новое сообщение
          </Button>
          <Button
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            onClick={() => navigate('/payments')}
          >
            Отправить Cosmo токены
          </Button>
          <Button
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            onClick={() => navigate('/jobs')}
          >
            Найти работу рядом
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
