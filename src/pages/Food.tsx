
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Clock, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

const Food = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const restaurants = [
    {
      id: 1,
      name: 'Суши Мастер',
      cuisine: 'Японская кухня',
      rating: 4.8,
      deliveryTime: '25-35',
      deliveryFee: 5,
      image: '🍣',
      featured: true,
      cosmoRecommended: true
    },
    {
      id: 2,
      name: 'Пицца Экспресс',
      cuisine: 'Итальянская кухня',
      rating: 4.6,
      deliveryTime: '20-30',
      deliveryFee: 3,
      image: '🍕',
      featured: false,
      cosmoRecommended: false
    },
    {
      id: 3,
      name: 'Burger House',
      cuisine: 'Американская кухня',
      rating: 4.7,
      deliveryTime: '15-25',
      deliveryFee: 4,
      image: '🍔',
      featured: true,
      cosmoRecommended: true
    }
  ];

  const categories = [
    { name: 'Быстрая еда', icon: '🍟', color: 'from-red-500 to-orange-500' },
    { name: 'Азиатская', icon: '🥢', color: 'from-green-500 to-teal-500' },
    { name: 'Десерты', icon: '🍰', color: 'from-pink-500 to-purple-500' },
    { name: 'Здоровая', icon: '🥗', color: 'from-green-400 to-lime-500' },
  ];

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
            <h1 className="text-gray-900 font-bold text-xl">CosmoFood</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:bg-gray-100"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Поиск ресторанов и блюд..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Cosmo AI Recommendations */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <ModernCard className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <h3 className="text-gray-900 font-semibold mb-2">🤖 Рекомендации Cosmo AI</h3>
          <p className="text-purple-600 text-sm mb-3">
            На основе ваших предпочтений и времени дня
          </p>
          <div className="bg-white rounded-lg p-3 border border-purple-100">
            <p className="text-gray-700 text-sm">
              💡 Сейчас обеденное время! Рекомендую Суши Мастер - у них сегодня скидка 15% на сеты
            </p>
          </div>
        </ModernCard>
      </div>

      {/* Categories */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 text-lg font-semibold mb-4">Категории</h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category, index) => (
            <ModernCard
              key={index}
              className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow bg-white"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <p className="text-gray-900 text-sm font-medium">{category.name}</p>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Restaurants */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 text-lg font-semibold mb-4">Рестораны рядом</h3>
        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <ModernCard
              key={restaurant.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl">
                  {restaurant.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-gray-900 font-semibold">{restaurant.name}</h3>
                    {restaurant.cosmoRecommended && (
                      <span className="text-purple-600 text-xs bg-purple-100 px-2 py-1 rounded">
                        🤖 AI
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-3 h-3 mr-1" />
                      {restaurant.rating}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {restaurant.deliveryTime} мин
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">
                  Доставка: {restaurant.deliveryFee} COSMO
                </span>
                <NeonButton size="sm" variant="primary">
                  Заказать
                </NeonButton>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Active Orders */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 text-lg font-semibold mb-4">Активные заказы</h3>
        <ModernCard className="p-4 bg-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900 font-medium">Заказ #1234</h4>
              <p className="text-gray-600 text-sm">Суши Мастер</p>
            </div>
            <div className="text-right">
              <p className="text-green-600 text-sm font-medium">В пути</p>
              <p className="text-gray-500 text-xs">~15 мин</p>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-2 border border-green-200">
            <p className="text-green-700 text-xs">
              🚗 Курьер Алексей забрал ваш заказ
            </p>
          </div>
        </ModernCard>
      </div>
    </div>
  );
};

export default Food;
