
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Clock, Car, Star, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

const Taxi = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedTariff, setSelectedTariff] = useState('comfort');

  const tariffs = [
    {
      id: 'economy',
      name: 'Эконом',
      price: 8,
      time: '3-5',
      icon: '🚗',
      description: 'Базовый тариф'
    },
    {
      id: 'comfort',
      name: 'Комфорт',
      price: 12,
      time: '2-4',
      icon: '🚙',
      description: 'Улучшенные авто'
    },
    {
      id: 'business',
      name: 'Бизнес',
      price: 20,
      time: '1-3',
      icon: '🚗',
      description: 'Премиум класс'
    }
  ];

  const activeRides = [
    {
      id: 1,
      driver: 'Алексей К.',
      rating: 4.9,
      car: 'Toyota Camry',
      license: 'А123БВ',
      status: 'В пути к вам',
      eta: '3 мин',
      phone: '+7 (999) 123-45-67'
    }
  ];

  const handleOrderTaxi = () => {
    if (from && to) {
      toast({
        title: "Заказ оформлен!",
        description: `Такси ${tariffs.find(t => t.id === selectedTariff)?.name} будет через ${tariffs.find(t => t.id === selectedTariff)?.time} мин`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="glass-card border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">CosmoTaxi</h1>
          </div>
        </div>
      </div>

      {/* Route Input */}
      <div className="max-w-md mx-auto px-4 py-6">
        <ModernCard className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
              <Input
                placeholder="Откуда"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-4 h-4" />
              <Input
                placeholder="Куда"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Tariffs */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">Выберите тариф</h3>
        <div className="space-y-3">
          {tariffs.map((tariff) => (
            <ModernCard
              key={tariff.id}
              onClick={() => setSelectedTariff(tariff.id)}
              className={`p-4 cursor-pointer transition-all ${
                selectedTariff === tariff.id
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{tariff.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-gray-900 dark:text-white font-semibold">{tariff.name}</h4>
                    <span className="text-gray-900 dark:text-white font-bold">{tariff.price} COSMO</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {tariff.time} мин
                    </div>
                    <span>{tariff.description}</span>
                  </div>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Order Button */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <NeonButton 
          onClick={handleOrderTaxi}
          className="w-full"
          disabled={!from || !to}
        >
          <Car className="w-4 h-4 mr-2" />
          Заказать такси
        </NeonButton>
      </div>

      {/* Active Rides */}
      {activeRides.length > 0 && (
        <div className="max-w-md mx-auto px-4 pb-6">
          <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">Активные поездки</h3>
          {activeRides.map((ride) => (
            <ModernCard key={ride.id} className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-gray-900 dark:text-white font-semibold">{ride.driver}</h4>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-3 h-3 mr-1" />
                      {ride.rating}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{ride.car} • {ride.license}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <span className="text-green-700 dark:text-green-300 font-medium">{ride.status}</span>
                  <span className="text-green-600 dark:text-green-400 text-sm">{ride.eta}</span>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      )}

      {/* Recent Destinations */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">Частые поездки</h3>
        <div className="space-y-2">
          {['Дом • ул. Ленина, 10', 'Работа • БЦ Сити', 'Аэропорт • Шереметьево'].map((destination, index) => (
            <ModernCard
              key={index}
              className="p-3 cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <span className="text-gray-900 dark:text-white text-sm">{destination}</span>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Taxi;
