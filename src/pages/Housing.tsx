import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Home, MapPin, Calendar, Users, Star, Heart, Filter, Search, Wifi, Car, Coffee, Dumbbell, Waves, Shield, Zap, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ServicePageLayout from '@/components/ServicePageLayout';

const Housing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAI, setShowAI] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
        title: "❤️ Удалено из избранного",
        description: "Объект убран из избранного",
      });
    } else {
      setFavorites([...favorites, propertyId]);
      toast({
        title: "💖 Добавлено в избранное",
        description: "Объект добавлен в избранное",
      });
    }
  };

  const handleBooking = (property: any) => {
    toast({
      title: "🎉 Бронирование отправлено!",
      description: `Запрос на "${property.title}" отправлен хозяину`,
    });
  };

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command:', command);
    toast({
      title: "🎤 Голосовая команда",
      description: `Выполняю: ${command}`
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
    <ServicePageLayout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-pink-900 dark:to-rose-900">
        {/* 2025 Aurora Background */}
        <div className="fixed inset-0 pointer-events-none aurora-2025">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-rose-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-rose-500/8 to-pink-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>

        {/* Modern Header */}
        <div className="sticky top-0 z-50 glass-morphism-2025 border-b border-border/10">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="text-muted-foreground hover:text-foreground rounded-xl w-10 h-10 p-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-foreground font-black text-lg gradient-text-2025">CosmoStay</h1>
                    <p className="text-muted-foreground text-xs font-medium">Neural Accommodation</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAI(!showAI)}
                className="text-muted-foreground hover:text-primary rounded-xl w-10 h-10 p-0"
              >
                <Brain className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Voice Assistant */}
        {showAI && (
          <div className="max-w-md mx-auto px-4 py-4 animate-slide-up-bounce-2025">
            <VoiceAssistant
              onCommand={handleVoiceCommand}
              prompt="Скажите куда хотите поехать и на какие даты"
              context="housing"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
          {/* AI Travel Assistant */}
          <div className="card-2025 p-5 holographic-2025">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base gradient-text-2025">ИИ-Помощник</h3>
                  <p className="text-xs text-muted-foreground">Умный подбор жилья</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-500">Активен</div>
                <div className="text-xs text-muted-foreground">24/7</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="neomorphism-2025 p-3 rounded-xl">
                <Zap className="w-4 h-4 text-yellow-500 mx-auto mb-2" />
                <div className="text-sm font-bold">3 сек</div>
                <div className="text-xs text-muted-foreground">Поиск</div>
              </div>
              <div className="neomorphism-2025 p-3 rounded-xl">
                <Globe2 className="w-4 h-4 text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-bold">200+</div>
                <div className="text-xs text-muted-foreground">Городов</div>
              </div>
              <div className="neomorphism-2025 p-3 rounded-xl">
                <TrendingUp className="w-4 h-4 text-green-500 mx-auto mb-2" />
                <div className="text-sm font-bold">4.9★</div>
                <div className="text-xs text-muted-foreground">Рейтинг</div>
              </div>
            </div>
          </div>

          {/* Search & Booking Form */}
          <div className="card-2025 p-5">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-base gradient-text-2025">Поиск жилья</h3>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Куда едем?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-2xl border-0 bg-secondary"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground font-medium">Заезд</label>
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="h-12 rounded-2xl border-0 bg-secondary"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-medium">Выезд</label>
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="h-12 rounded-2xl border-0 bg-secondary"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground font-medium">Гости</label>
                <Input
                  type="number"
                  min="1"
                  max="16"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  className="h-12 rounded-2xl border-0 bg-secondary"
                />
              </div>
              
              <Button className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-2xl">
                <Search className="w-4 h-4 mr-2" />
                Найти жилье
              </Button>
            </div>
          </div>

          {/* Property Types */}
          <div className="card-2025 p-5">
            <div className="flex items-center gap-3 mb-4">
              <Home className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-base gradient-text-2025">Тип жилья</h3>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {propertyTypes.map((type) => (
                <Button
                  key={type.id}
                  onClick={() => setPropertyType(type.id)}
                  variant={propertyType === type.id ? 'default' : 'secondary'}
                  size="sm"
                  className={`whitespace-nowrap rounded-2xl ${
                    propertyType === type.id 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  <span className="mr-1">{type.icon}</span>
                  {type.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Properties List */}
          <div className="card-2025 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base gradient-text-2025">
                {filteredProperties.length} вариантов найдено
              </h3>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="card-2025 p-4 cursor-pointer hover:shadow-lg transition-all duration-300 magnetic-2025"
                >
                  <div className="flex space-x-3">
                    <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-2xl flex items-center justify-center text-3xl shadow-md">
                      {property.images[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-bold text-foreground truncate">{property.title}</h3>
                            {property.superhost && (
                              <span className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-1 rounded-full">
                                Суперхозяин
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm mb-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {property.location}
                          </div>
                          <div className="flex items-center space-x-1 mb-2">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">{property.rating}</span>
                            <span className="text-muted-foreground text-sm">({property.reviewCount})</span>
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
                                : 'text-muted-foreground'
                            }`} 
                          />
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-2">
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

                      <div className="flex flex-wrap gap-1 mb-3">
                        {property.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="bg-secondary text-muted-foreground text-xs px-2 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="text-muted-foreground text-xs">+{property.amenities.length - 3}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-foreground">
                            {property.pricePerNight.toLocaleString()} ₽
                          </span>
                          <span className="text-sm text-muted-foreground ml-1">/ночь</span>
                          {property.instantBook && (
                            <span className="block text-xs text-green-600 dark:text-green-400">Мгновенное бронирование</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 text-muted-foreground hover:text-blue-500"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleBooking(property)}
                            className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl"
                          >
                            Забронировать
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="card-2025 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Все системы работают</span>
              </div>
              <div className="text-xs text-green-600">
                {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default Housing;
