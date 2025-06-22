
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Mic, TaxiFront } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Taxi = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const rideTypes = [
    {
      type: 'Эконом',
      price: 15,
      time: '5-7 мин',
      description: 'Доступные поездки',
      icon: '🚗'
    },
    {
      type: 'Комфорт',
      price: 25,
      time: '3-5 мин',
      description: 'Больше места и удобства',
      icon: '🚙'
    },
    {
      type: 'Премиум',
      price: 45,
      time: '2-4 мин',
      description: 'Автомобили бизнес-класса',
      icon: '🚘'
    }
  ];

  const handleVoiceOrder = () => {
    setIsListening(!isListening);
    // Здесь будет интеграция с Cosmo AI для голосового заказа
    console.log('Voice order activated: "Закажи такси на девять вечера"');
    
    if (!isListening) {
      // Симуляция голосового распознавания
      setTimeout(() => {
        setFromLocation('Мой текущий адрес');
        setToLocation('Аэропорт Домодедово');
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white font-bold text-xl">CosmoRide</h1>
          </div>
        </div>
      </div>

      {/* Voice Order */}
      <div className="max-w-md mx-auto px-4 py-6">
        <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm">
          <div className="p-6 text-center">
            <div className="mb-4">
              <Button
                onClick={handleVoiceOrder}
                className={`w-16 h-16 rounded-full transition-all duration-300 ${
                  isListening
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110'
                }`}
              >
                <Mic className="w-8 h-8 text-white" />
              </Button>
            </div>
            <h2 className="text-white text-lg font-semibold mb-2">Голосовой заказ</h2>
            <p className="text-purple-300 text-sm">
              {isListening 
                ? 'Слушаю команду...' 
                : 'Скажите: "Закажи такси на девять вечера"'
              }
            </p>
          </div>
        </Card>
      </div>

      {/* Route Input */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <div className="p-4 space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
              <Input
                placeholder="Откуда"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
              <Input
                placeholder="Куда"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Ride Types */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-white text-lg font-semibold mb-4">Выберите тариф</h3>
        <div className="space-y-3">
          {rideTypes.map((ride, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="p-4 flex items-center space-x-4">
                <div className="text-2xl">{ride.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-medium">{ride.type}</h4>
                    <span className="text-white font-bold">{ride.price} COSMO</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-300 text-sm">{ride.description}</p>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {ride.time}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Order Button */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <Button
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-4"
          disabled={!fromLocation || !toLocation}
        >
          <TaxiFront className="w-5 h-5 mr-2" />
          Заказать такси
        </Button>
      </div>

      {/* Recent Rides */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-white text-lg font-semibold mb-4">Недавние поездки</h3>
        <div className="space-y-2">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <div className="p-3 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <TaxiFront className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">Дом → Офис</p>
                <p className="text-gray-400 text-xs">Вчера, 25 COSMO</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Taxi;
