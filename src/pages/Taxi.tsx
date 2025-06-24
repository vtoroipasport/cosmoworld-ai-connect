
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Mic, CarTaxiFront, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

const Taxi = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const nearbyDrivers = [
    { id: 1, name: 'Сергей', rating: 4.9, distance: '2 мин', car: 'Toyota Camry', lat: 55.7558, lng: 37.6176 },
    { id: 2, name: 'Алексей', rating: 4.8, distance: '4 мин', car: 'Hyundai Solaris', lat: 55.7608, lng: 37.6156 },
    { id: 3, name: 'Михаил', rating: 4.7, distance: '5 мин', car: 'Kia Rio', lat: 55.7528, lng: 37.6206 }
  ];

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
    console.log('Cosmo AI voice taxi order activated: "Закажи такси на девять вечера"');
    
    if (!isListening) {
      setTimeout(() => {
        setFromLocation('Мой текущий адрес');
        setToLocation('Аэропорт Домодедово');
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-gray-900 font-bold text-xl">CosmoRide</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:bg-gray-100"
          >
            <Navigation className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Voice Order */}
      <div className="max-w-md mx-auto px-4 py-6">
        <ModernCard className="p-6 text-center bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="mb-4">
            <NeonButton
              onClick={handleVoiceOrder}
              className={`w-16 h-16 rounded-full transition-all duration-300 ${
                isListening
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110'
              }`}
            >
              <Mic className="w-8 h-8 text-white" />
            </NeonButton>
          </div>
          <h2 className="text-gray-900 text-lg font-semibold mb-2">Голосовой заказ</h2>
          <p className="text-gray-600 text-sm">
            {isListening 
              ? 'Слушаю команду...' 
              : 'Скажите: "Закажи такси на девять вечера"'
            }
          </p>
        </ModernCard>
      </div>

      {/* Route Input */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <ModernCard className="p-4 space-y-3 bg-white">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
            <Input
              placeholder="Откуда"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-4 h-4" />
            <Input
              placeholder="Куда"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </ModernCard>
      </div>

      {/* Interactive Map with Drivers */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <ModernCard className="h-48 relative overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white animate-pulse"></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow">
                Вы здесь
              </div>
            </div>

            {nearbyDrivers.map((driver, index) => (
              <div
                key={driver.id}
                className={`absolute ${
                  index === 0 ? 'top-1/3 right-1/3' :
                  index === 1 ? 'bottom-1/3 left-1/4' : 'top-1/4 left-1/2'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  🚗
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 bg-white px-2 py-1 rounded shadow whitespace-nowrap">
                  {driver.name} • {driver.distance}
                </div>
              </div>
            ))}
          </div>
        </ModernCard>
      </div>

      {/* Nearby Drivers List */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <h3 className="text-gray-900 text-lg font-semibold mb-3">Водители рядом</h3>
        <div className="space-y-2">
          {nearbyDrivers.map((driver) => (
            <ModernCard
              key={driver.id}
              className="p-3 cursor-pointer hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <CarTaxiFront className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-gray-900 font-medium">{driver.name}</h4>
                    <span className="text-blue-600 font-semibold">{driver.distance}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{driver.car}</p>
                  <div className="flex items-center text-yellow-500 text-sm mt-1">
                    ⭐ {driver.rating}
                  </div>
                </div>
                <NeonButton
                  size="sm"
                  variant="primary"
                >
                  Вызвать
                </NeonButton>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Ride Types */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <h3 className="text-gray-900 text-lg font-semibold mb-3">Выберите тариф</h3>
        <div className="space-y-2">
          {rideTypes.map((ride, index) => (
            <ModernCard
              key={index}
              className="p-3 cursor-pointer hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{ride.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-gray-900 font-medium">{ride.type}</h4>
                    <span className="text-gray-900 font-bold">{ride.price} COSMO</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-sm">{ride.description}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {ride.time}
                    </div>
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
          className="w-full py-4"
          disabled={!fromLocation || !toLocation}
          variant="primary"
        >
          <CarTaxiFront className="w-5 h-5 mr-2" />
          Заказать такси
        </NeonButton>
      </div>
    </div>
  );
};

export default Taxi;
