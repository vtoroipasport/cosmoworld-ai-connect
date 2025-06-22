
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Clock, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
            <h1 className="text-white font-bold text-xl">CosmoFood</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск ресторанов и блюд..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Cosmo AI Recommendations */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm">
          <div className="p-4">
            <h3 className="text-white font-semibold mb-2">🤖 Рекомендации Cosmo AI</h3>
            <p className="text-purple-300 text-sm mb-3">
              На основе ваших предпочтений и времени дня
            </p>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-white text-sm">
                💡 Сейчас обеденное время! Рекомендую Суши Мастер - у них сегодня скидка 15% на сеты
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Categories */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-white text-lg font-semibold mb-4">Категории</h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="p-4 text-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <p className="text-white text-sm font-medium">{category.name}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Restaurants */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-white text-lg font-semibold mb-4">Рестораны рядом</h3>
        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl">
                    {restaurant.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-white font-semibold">{restaurant.name}</h3>
                      {restaurant.cosmoRecommended && (
                        <span className="text-purple-400 text-xs bg-purple-500/20 px-2 py-1 rounded">
                          🤖 AI
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{restaurant.cuisine}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-3 h-3 mr-1" />
                        {restaurant.rating}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {restaurant.deliveryTime} мин
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">
                    Доставка: {restaurant.deliveryFee} COSMO
                  </span>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
                  >
                    Заказать
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Orders */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-white text-lg font-semibold mb-4">Активные заказы</h3>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Заказ #1234</h4>
                <p className="text-gray-300 text-sm">Суши Мастер</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 text-sm font-medium">В пути</p>
                <p className="text-gray-400 text-xs">~15 мин</p>
              </div>
            </div>
            <div className="bg-green-500/20 rounded-lg p-2">
              <p className="text-green-300 text-xs">
                🚗 Курьер Алексей забрал ваш заказ
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Food;
