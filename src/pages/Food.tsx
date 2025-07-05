import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, ShoppingCart, Star, Store, TrendingUp, Zap, Bot, Activity, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import VoiceAssistant from '@/components/VoiceAssistant';

const Food = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAI, setShowAI] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'pizza', name: 'Пицца' },
    { id: 'sushi', name: 'Суши' },
    { id: 'burgers', name: 'Бургеры' },
    { id: 'desserts', name: 'Десерты' }
  ];

  const restaurants = [
    {
      id: 1,
      name: 'Pizza King',
      cuisine: 'Пицца',
      rating: 4.5,
      deliveryTime: '25-35 мин',
      deliveryFee: 'Бесплатно',
      category: 'pizza'
    },
    {
      id: 2,
      name: 'Sushi Master',
      cuisine: 'Суши',
      rating: 4.8,
      deliveryTime: '30-40 мин',
      deliveryFee: '150₽',
      category: 'sushi'
    },
    {
      id: 3,
      name: 'Burger Heroes',
      cuisine: 'Бургеры',
      rating: 4.6,
      deliveryTime: '20-30 мин',
      deliveryFee: 'Бесплатно',
      category: 'burgers'
    },
    {
      id: 4,
      name: 'Sweet Joy',
      cuisine: 'Десерты',
      rating: 4.7,
      deliveryTime: '35-45 мин',
      deliveryFee: '100₽',
      category: 'desserts'
    },
    {
      id: 5,
      name: 'Pasta La Vista',
      cuisine: 'Паста',
      rating: 4.4,
      deliveryTime: '25-35 мин',
      deliveryFee: 'Бесплатно',
      category: 'pizza'
    },
    {
      id: 6,
      name: 'Wok & Roll',
      cuisine: 'Вок',
      rating: 4.9,
      deliveryTime: '30-40 мин',
      deliveryFee: '150₽',
      category: 'sushi'
    },
    {
      id: 7,
      name: 'Meat & Eat',
      cuisine: 'Мясо',
      rating: 4.5,
      deliveryTime: '20-30 мин',
      deliveryFee: 'Бесплатно',
      category: 'burgers'
    },
    {
      id: 8,
      name: 'Ice Cream Land',
      cuisine: 'Мороженое',
      rating: 4.8,
      deliveryTime: '35-45 мин',
      deliveryFee: '100₽',
      category: 'desserts'
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const searchMatch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'all' || restaurant.category === selectedCategory;
    return searchMatch && categoryMatch;
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleRestaurantClick = (restaurant: any) => {
    toast({
      title: `Вы выбрали ${restaurant.name}`,
      description: 'Переходим к оформлению заказа...'
    });
    navigate('/restaurant/' + restaurant.id);
  };

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command:', command);
    toast({
      title: "🎤 Голосовая команда",
      description: `Выполняю: ${command}`
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 2025 Aurora Background */}
      <div className="fixed inset-0 pointer-events-none aurora-2025">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-red-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-orange-500/8 to-red-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
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
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-foreground font-black text-lg gradient-text-2025">Доставка еды</h1>
                  <p className="text-muted-foreground text-xs font-medium">AI Food Delivery</p>
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
            prompt="Скажите что хотите заказать или выберите ресторан"
            context="food-delivery"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* AI Status Panel */}
        <div className="card-2025 p-5 holographic-2025">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base gradient-text-2025">ИИ-рекомендации</h3>
                <p className="text-xs text-muted-foreground">Персональные предложения</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-green-500">Активно</div>
              <div className="text-xs text-muted-foreground">Обучается</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Zap className="w-4 h-4 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-bold">15 мин</div>
              <div className="text-xs text-muted-foreground">Доставка</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Star className="w-4 h-4 text-purple-500 mx-auto mb-2" />
              <div className="text-sm font-bold">4.9★</div>
              <div className="text-xs text-muted-foreground">Качество</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <TrendingUp className="w-4 h-4 text-green-500 mx-auto mb-2" />
              <div className="text-sm font-bold">-20%</div>
              <div className="text-xs text-muted-foreground">Скидка</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Найти блюда и рестораны..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-2xl border-0 bg-card shadow-lg"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'ghost'}
              onClick={() => handleCategoryClick(category.id)}
              className="rounded-2xl whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Restaurants Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Store className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-black gradient-text-2025">Рестораны рядом</h2>
          </div>
          
          <div className="bento-grid">
            {filteredRestaurants.map((restaurant, index) => (
              <Card
                key={restaurant.id}
                className="bento-card magnetic-2025 cursor-pointer group p-0 overflow-hidden animate-scale-in-bounce-2025"
                style={{animationDelay: `${index * 100}ms`}}
                onClick={() => handleRestaurantClick(restaurant)}
              >
                <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    {restaurant.rating}★
                  </div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <h3 className="font-bold text-sm">{restaurant.name}</h3>
                    <p className="text-xs opacity-90">{restaurant.cuisine}</p>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">{restaurant.deliveryTime}</span>
                    <span className="text-xs font-bold text-primary">{restaurant.deliveryFee}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-500 font-medium">Доступен</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="card-2025 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Все рестораны работают</span>
            </div>
            <div className="text-xs text-green-600">
              {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
