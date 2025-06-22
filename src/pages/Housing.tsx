
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Housing = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const properties = [
    {
      id: 1,
      title: 'Современная студия в центре',
      location: 'Москва, Арбат',
      price: 150,
      rating: 4.8,
      image: '🏢',
      features: ['WiFi', 'Кухня', 'Кондиционер'],
      available: true,
      smartLock: true
    },
    {
      id: 2,
      title: 'Уютная квартира рядом с парком',
      location: 'СПб, Центральный район',
      price: 120,
      rating: 4.9,
      image: '🏠',
      features: ['Балкон', 'Парковка', 'Лифт'],
      available: true,
      smartLock: true
    },
    {
      id: 3,
      title: 'Пентхаус с видом на город',
      location: 'Москва, Сити',
      price: 300,
      rating: 5.0,
      image: '🏙️',
      features: ['Терраса', 'Спортзал', 'Консьерж'],
      available: false,
      smartLock: true
    }
  ];

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
            <h1 className="text-white font-bold text-xl">Аренда жилья</h1>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск по городу или району..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Cosmo AI Booking Info */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm">
          <div className="p-4">
            <h3 className="text-white font-semibold mb-2">🤖 Умное бронирование с Cosmo AI</h3>
            <p className="text-purple-300 text-sm">
              После оплаты токенами Cosmo, ИИ автоматически сгенерирует код для электронного замка и отправит его за 3 часа до заезда.
            </p>
          </div>
        </Card>
      </div>

      {/* Properties List */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="space-y-4">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl">
                    {property.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold mb-1">{property.title}</h3>
                    <div className="flex items-center text-gray-300 text-sm mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {property.location}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">⭐ {property.rating}</span>
                      {property.smartLock && (
                        <span className="text-purple-400 text-xs bg-purple-500/20 px-2 py-1 rounded">
                          🔒 Умный замок
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white text-lg font-bold">{property.price} COSMO</span>
                    <span className="text-gray-400 text-sm ml-1">/ сутки</span>
                  </div>
                  <Button
                    className={`${
                      property.available
                        ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
                        : 'bg-gray-600 cursor-not-allowed'
                    } text-white`}
                    disabled={!property.available}
                  >
                    {property.available ? 'Забронировать' : 'Занято'}
                  </Button>
                </div>

                {property.available && (
                  <div className="mt-3 flex items-center text-green-400 text-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    Мгновенное подтверждение через Cosmo AI
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Host Registration CTA */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30 backdrop-blur-sm">
          <div className="p-4 text-center">
            <h3 className="text-white font-semibold mb-2">Стать хозяином</h3>
            <p className="text-green-300 text-sm mb-4">
              Зарабатывайте Cosmo токены, сдавая свою недвижимость
            </p>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
              Добавить объект
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Housing;
