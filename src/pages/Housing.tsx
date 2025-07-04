import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, Home, Heart, Share2, Bed, Bath, Square, Car, Calendar, Users, Star, Wifi, Coffee, Car as ParkingIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
import CosmoAI from '@/components/CosmoAI';

const Housing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [activeTab, setActiveTab] = useState('rent');

  const propertyTypes = [
    { id: 'all', name: 'Все', icon: '🏠' },
    { id: 'apartment', name: 'Квартиры', icon: '🏢' },
    { id: 'house', name: 'Дома', icon: '🏡' },
    { id: 'room', name: 'Комнаты', icon: '🛏️' },
    { id: 'villa', name: 'Виллы', icon: '🏖️' }
  ];

  const properties = [
    {
      id: 1,
      title: 'Уютная квартира в центре',
      pricePerNight: 3500,
      location: 'Центральный район, Москва',
      type: 'apartment',
      bedrooms: 2,
      bathrooms: 1,
      area: 65,
      maxGuests: 4,
      rating: 4.8,
      reviewCount: 127,
      images: ['🏠'],
      host: 'Анна',
      superhost: true,
      amenities: ['WiFi', 'Кухня', 'Стиральная машина', 'Кондиционер'],
      instantBook: true,
      description: 'Прекрасная квартира в самом сердце города'
    },
    {
      id: 2,
      title: 'Стильная студия у метро',
      pricePerNight: 2800,
      location: 'Сокольники, Москва',
      type: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      area: 35,
      maxGuests: 2,
      rating: 4.9,
      reviewCount: 89,
      images: ['🏠'],
      host: 'Дмитрий',
      superhost: false,
      amenities: ['WiFi', 'Кухня', 'Балкон'],
      instantBook: false,
      description: 'Современная студия рядом с метро'
    },
    {
      id: 3,
      title: 'Загородная вилла с бассейном',
      pricePerNight: 15000,
      location: 'Подмосковье',
      type: 'villa',
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      maxGuests: 8,
      rating: 4.7,
      reviewCount: 45,
      images: ['🏠'],
      host: 'Елена',
      superhost: true,
      amenities: ['WiFi', 'Бассейн', 'Сад', 'Барбекю', 'Парковка'],
      instantBook: true,
      description: 'Роскошная вилла для большой компании'
    }
  ];

  const handleAddToFavorites = (propertyId: number) => {
    if (favorites.includes(propertyId)) {
      setFavorites(favorites.filter(id => id !== propertyId));
      toast({
        title: "Удалено из избранного",
        description: "Объект убран из избранного",
      });
    } else {
      setFavorites([...favorites, propertyId]);
      toast({
        title: "Добавлено в избранное",
        description: "Объект добавлен в избранное",
      });
    }
  };

  const handleBooking = (property: any) => {
    toast({
      title: "Бронирование отправлено!",
      description: `Запрос на "${property.title}" отправлен хозяину`,
    });
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = propertyType === 'all' || property.type === propertyType;
    const matchesGuests = property.maxGuests >= guests;
    return matchesSearch && matchesType && matchesGuests;
  });

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
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">CosmoStay</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex space-x-2">
          <NeonButton
            onClick={() => setActiveTab('rent')}
            variant={activeTab === 'rent' ? 'primary' : 'secondary'}
            className="flex-1 rounded-2xl text-foreground font-bold"
          >
            🏠 Аренда
          </NeonButton>
          <NeonButton
            onClick={() => setActiveTab('sale')}
            variant={activeTab === 'sale' ? 'primary' : 'secondary'}
            className="flex-1 rounded-2xl text-foreground font-bold"
          >
            💰 Продажа
          </NeonButton>
        </div>
      </div>

      {/* Search & Booking Form */}
      <div className="max-w-md mx-auto px-4 py-4">
        <ModernCard className="p-4 bg-white dark:bg-gray-800">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
              <Input
                placeholder="Куда едем?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-600 dark:text-gray-400">Заезд</label>
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 dark:text-gray-400">Выезд</label>
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">Гости</label>
              <Input
                type="number"
                min="1"
                max="16"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="text-sm"
              />
            </div>
            
            <NeonButton className="w-full" variant="primary">
              <Search className="w-4 h-4 mr-2" />
              Найти жилье
            </NeonButton>
          </div>
        </ModernCard>
      </div>

      {/* Property Types */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {propertyTypes.map((type) => (
            <NeonButton
              key={type.id}
              onClick={() => setPropertyType(type.id)}
              variant={propertyType === type.id ? 'primary' : 'secondary'}
              size="sm"
              className="whitespace-nowrap"
            >
              <span className="mr-1">{type.icon}</span>
              {type.name}
            </NeonButton>
          ))}
        </div>
      </div>

      {/* Properties List */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
            {filteredProperties.length} вариантов найдено
          </h3>
        </div>
        
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <ModernCard
              key={property.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="flex space-x-3">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-lg flex items-center justify-center text-3xl">
                  {property.images[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-gray-900 dark:text-white font-semibold truncate">{property.title}</h3>
                        {property.superhost && (
                          <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs px-2 py-1 rounded">
                            Суперхозяин
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {property.location}
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="text-yellow-600 dark:text-yellow-400 text-sm">{property.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">({property.reviewCount})</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToFavorites(property.id);
                      }}
                      className="p-1"
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          favorites.includes(property.id) 
                            ? 'text-red-500 fill-red-500' 
                            : 'text-gray-400 dark:text-gray-500'
                        }`} 
                      />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <div className="flex items-center">
                      <Bed className="w-3 h-3 mr-1" />
                      {property.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-3 h-3 mr-1" />
                      {property.bathrooms}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {property.maxGuests}
                    </div>
                    <div className="flex items-center">
                      <Square className="w-3 h-3 mr-1" />
                      {property.area}м²
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="text-gray-500 dark:text-gray-400 text-xs">+{property.amenities.length - 3}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {property.pricePerNight.toLocaleString()} ₽
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">/ночь</span>
                      {property.instantBook && (
                        <span className="block text-xs text-green-600 dark:text-green-400">Мгновенное бронирование</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-500"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <NeonButton 
                        size="sm" 
                        variant="primary"
                        onClick={() => handleBooking(property)}
                      >
                        Забронировать
                      </NeonButton>
                    </div>
                  </div>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      <CosmoAI service="housing" />
    </div>
  );
};

export default Housing;
