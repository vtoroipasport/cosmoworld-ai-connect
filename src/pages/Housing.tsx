
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, Home, Heart, Share2, Bed, Bath, Square, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

const Housing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const propertyTypes = [
    { id: 'all', name: 'Все', icon: '🏠' },
    { id: 'apartment', name: 'Квартиры', icon: '🏢' },
    { id: 'house', name: 'Дома', icon: '🏡' },
    { id: 'room', name: 'Комнаты', icon: '🛏️' },
    { id: 'commercial', name: 'Коммерция', icon: '🏪' }
  ];

  const properties = [
    {
      id: 1,
      title: '3-комнатная квартира в центре',
      price: 150000,
      priceType: 'month',
      location: 'Центральный район, Москва',
      type: 'apartment',
      bedrooms: 3,
      bathrooms: 2,
      area: 85,
      parking: true,
      images: ['🏠'],
      description: 'Просторная квартира с евроремонтом',
      amenities: ['WiFi', 'Кондиционер', 'Балкон'],
      verified: true,
      featured: true
    },
    {
      id: 2,
      title: 'Уютная студия рядом с метро',
      price: 80000,
      priceType: 'month',
      location: 'Сокольники, Москва',
      type: 'apartment',
      bedrooms: 1,
      bathrooms: 1,
      area: 35,
      parking: false,
      images: ['🏠'],
      description: 'Идеально для молодой пары или студента',
      amenities: ['WiFi', 'Кухня'],
      verified: false,
      featured: false
    },
    {
      id: 3,
      title: 'Коттедж с участком',
      price: 12000000,
      priceType: 'sale',
      location: 'Подмосковье',
      type: 'house',
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      parking: true,
      images: ['🏠'],
      description: 'Загородный дом для семьи',
      amenities: ['Гараж', 'Сад', 'Барбекю'],
      verified: true,
      featured: true
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

  const handleContact = (property: any) => {
    toast({
      title: "Контакт отправлен!",
      description: `Запрос по объекту "${property.title}" отправлен`,
    });
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = propertyType === 'all' || property.type === propertyType;
    return matchesSearch && matchesType;
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
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">Недвижимость</h1>
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

      {/* Search */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск недвижимости..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
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

      {/* AI Assistant */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <ModernCard className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 dark:text-white font-semibold">Помощник по недвижимости</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Найдем идеальный вариант по вашим критериям</p>
            </div>
            <NeonButton variant="primary" size="sm">
              Настроить
            </NeonButton>
          </div>
        </ModernCard>
      </div>

      {/* Properties List */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
            {propertyType === 'all' ? 'Все объекты' : propertyTypes.find(t => t.id === propertyType)?.name}
          </h3>
          <span className="text-gray-600 dark:text-gray-300 text-sm">{filteredProperties.length} объектов</span>
        </div>
        
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <ModernCard
              key={property.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="flex space-x-3">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-green-100 dark: from-blue-900/30 dark:to-green-900/30 rounded-lg flex items-center justify-center text-2xl">
                  {property.images[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-gray-900 dark:text-white font-semibold truncate">{property.title}</h3>
                      {property.verified && (
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded">
                          ✓
                        </span>
                      )}
                      {property.featured && (
                        <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-1 rounded">
                          Топ
                        </span>
                      )}
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
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {property.location}
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
                      <Square className="w-3 h-3 mr-1" />
                      {property.area}м²
                    </div>
                    {property.parking && (
                      <div className="flex items-center">
                        <Car className="w-3 h-3 mr-1" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {property.price.toLocaleString()} ₽
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                        /{property.priceType === 'month' ? 'мес' : 'продажа'}
                      </span>
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
                        onClick={() => handleContact(property)}
                      >
                        Связаться
                      </NeonButton>
                    </div>
                  </div>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">Быстрые фильтры</h3>
        <div className="grid grid-cols-2 gap-3">
          {['До 100к/мес', 'Новостройки', 'С ремонтом', 'Рядом с метро'].map((filter, index) => (
            <ModernCard
              key={index}
              className="p-3 text-center cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <p className="text-gray-900 dark:text-white text-sm font-medium">{filter}</p>
            </ModernCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Housing;
