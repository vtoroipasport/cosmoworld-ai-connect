
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="glass-card border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-gray-900 font-bold text-xl">Аренда жилья</h1>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-6 py-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск по городу или району..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Cosmo AI Booking Info */}
      <div className="max-w-md mx-auto px-6 pb-6">
        <ModernCard className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="p-6">
            <h3 className="text-gray-900 font-semibold mb-2">🤖 Умное бронирование с Cosmo AI</h3>
            <p className="text-gray-700 text-sm">
              После оплаты токенами Cosmo, ИИ автоматически сгенерирует код для электронного замка и отправит его за 3 часа до заезда.
            </p>
          </div>
        </ModernCard>
      </div>

      {/* Properties List */}
      <div className="max-w-md mx-auto px-6 pb-6">
        <div className="space-y-4">
          {properties.map((property, index) => (
            <ModernCard
              key={property.id}
              className="animate-fade-in"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl">
                    {property.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 font-semibold mb-1">{property.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {property.location}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500">⭐ {property.rating}</span>
                      {property.smartLock && (
                        <span className="text-purple-600 text-xs bg-purple-100 px-2 py-1 rounded-full">
                          🔒 Умный замок
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-900 text-lg font-bold">{property.price} COSMO</span>
                    <span className="text-gray-500 text-sm ml-1">/ сутки</span>
                  </div>
                  <NeonButton
                    variant={property.available ? "primary" : "secondary"}
                    disabled={!property.available}
                  >
                    {property.available ? 'Забронировать' : 'Занято'}
                  </NeonButton>
                </div>

                {property.available && (
                  <div className="mt-3 flex items-center text-green-600 text-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    Мгновенное подтверждение через Cosmo AI
                  </div>
                )}
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Host Registration CTA */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <ModernCard className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="p-6 text-center">
            <h3 className="text-gray-900 font-semibold mb-2">Стать хозяином</h3>
            <p className="text-gray-700 text-sm mb-4">
              Зарабатывайте Cosmo токены, сдавая свою недвижимость
            </p>
            <NeonButton variant="primary">
              Добавить объект
            </NeonButton>
          </div>
        </ModernCard>
      </div>
    </div>
  );
};

export default Housing;
