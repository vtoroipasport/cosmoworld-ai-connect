
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, Clock, Star, ShoppingCart, Plus, Minus, Heart, Truck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
import CosmoAI from '@/components/CosmoAI';

const Food = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState('ул. Ленина, 15');

  const categories = [
    { id: 'all', name: 'Все', icon: '🍽️' },
    { id: 'pizza', name: 'Пицца', icon: '🍕' },
    { id: 'burger', name: 'Бургеры', icon: '🍔' },
    { id: 'sushi', name: 'Суши', icon: '🍣' },
    { id: 'dessert', name: 'Десерты', icon: '🍰' },
    { id: 'coffee', name: 'Кофе', icon: '☕' }
  ];

  const restaurants = [
    {
      id: 1,
      name: 'Pizza Palace',
      category: 'pizza',
      rating: 4.8,
      deliveryTime: '20-30 мин',
      deliveryFee: 99,
      minOrder: 500,
      image: '🍕',
      cuisine: 'Итальянская',
      distance: '0.8 км',
      promoted: true,
      menu: [
        { id: 1, name: 'Маргарита', price: 890, description: 'Томаты, моцарелла, базилик', image: '🍕' },
        { id: 2, name: 'Пепперони', price: 1200, description: 'Пепперони, моцарелла, томатный соус', image: '🍕' }
      ]
    },
    {
      id: 2,
      name: 'Burger King',
      category: 'burger',
      rating: 4.5,
      deliveryTime: '15-25 мин',
      deliveryFee: 149,
      minOrder: 400,
      image: '🍔',
      cuisine: 'Американская',
      distance: '1.2 км',
      promoted: false,
      menu: [
        { id: 3, name: 'Воппер', price: 350, description: 'Говядина, салат, помидоры, лук', image: '🍔' },
        { id: 4, name: 'Чизбургер', price: 280, description: 'Говядина, сыр, кетчуп, горчица', image: '🍔' }
      ]
    },
    {
      id: 3,
      name: 'Sushi Master',
      category: 'sushi',
      rating: 4.9,
      deliveryTime: '25-35 мин',
      deliveryFee: 199,
      minOrder: 800,
      image: '🍣',
      cuisine: 'Японская',
      distance: '2.1 км',
      promoted: true,
      menu: [
        { id: 5, name: 'Филадельфия', price: 580, description: 'Лосось, сыр, огурец, авокадо', image: '🍣' },
        { id: 6, name: 'Калифорния', price: 520, description: 'Краб, авокадо, огурец, икра', image: '🍣' }
      ]
    }
  ];

  const addToCart = (item: any, restaurantId: number) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    const cartItem = {
      ...item,
      restaurantId,
      restaurantName: restaurant?.name,
      quantity: 1
    };
    
    const existingItem = cart.find(c => c.id === item.id && c.restaurantId === restaurantId);
    if (existingItem) {
      setCart(cart.map(c => 
        c.id === item.id && c.restaurantId === restaurantId 
          ? { ...c, quantity: c.quantity + 1 }
          : c
      ));
    } else {
      setCart([...cart, cartItem]);
    }
    
    toast({
      title: "Добавлено в корзину",
      description: `${item.name} добавлен в корзину`,
    });
  };

  const removeFromCart = (itemId: number, restaurantId: number) => {
    setCart(cart.filter(item => !(item.id === itemId && item.restaurantId === restaurantId)));
  };

  const updateQuantity = (itemId: number, restaurantId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId, restaurantId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === itemId && item.restaurantId === restaurantId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const toggleFavorite = (restaurantId: number) => {
    if (favorites.includes(restaurantId)) {
      setFavorites(favorites.filter(id => id !== restaurantId));
      toast({
        title: "Удалено из избранного",
        description: "Ресторан убран из избранного",
      });
    } else {
      setFavorites([...favorites, restaurantId]);
      toast({
        title: "Добавлено в избранное",
        description: "Ресторан добавлен в избранное",
      });
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Корзина пуста",
        description: "Добавьте товары в корзину",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Заказ оформлен!",
      description: `Ваш заказ на ${getTotalPrice()} ₽ принят в обработку`,
    });
    setCart([]);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">CosmoFood</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast({ title: "Фильтры", description: "Функция в разработке" })}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/cart')}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="max-w-md mx-auto px-4 py-4">
        <ModernCard className="p-3 bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <Input
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="border-none bg-transparent text-sm flex-1"
              placeholder="Адрес доставки"
            />
          </div>
        </ModernCard>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск ресторанов и блюд..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <NeonButton
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'primary' : 'secondary'}
              size="sm"
              className="whitespace-nowrap"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </NeonButton>
          ))}
        </div>
      </div>

      {/* Restaurants List */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="space-y-4">
          {filteredRestaurants.map((restaurant) => (
            <ModernCard
              key={restaurant.id}
              className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex space-x-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg flex items-center justify-center text-2xl">
                    {restaurant.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-gray-900 dark:text-white font-semibold">{restaurant.name}</h3>
                      {restaurant.promoted && (
                        <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs px-2 py-1 rounded">
                          <Zap className="w-3 h-3 inline mr-1" />
                          Промо
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{restaurant.cuisine}</p>
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="text-yellow-600 dark:text-yellow-400 text-sm">{restaurant.rating}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(restaurant.id)}
                  className="p-1"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.includes(restaurant.id) 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-gray-400 dark:text-gray-500'
                    }`} 
                  />
                </Button>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {restaurant.deliveryTime}
                </div>
                <div className="flex items-center">
                  <Truck className="w-3 h-3 mr-1" />
                  {restaurant.deliveryFee} ₽
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {restaurant.distance}
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Минимальный заказ: {restaurant.minOrder} ₽
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                {restaurant.menu.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{item.image}</span>
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium text-sm">{item.name}</p>
                        <p className="text-gray-600 dark:text-gray-300 text-xs">{item.description}</p>
                        <p className="text-gray-900 dark:text-white font-bold text-sm">{item.price} ₽</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {cart.find(c => c.id === item.id && c.restaurantId === restaurant.id) ? (
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, restaurant.id, 
                              (cart.find(c => c.id === item.id && c.restaurantId === restaurant.id)?.quantity || 0) - 1
                            )}
                            className="w-6 h-6 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium">
                            {cart.find(c => c.id === item.id && c.restaurantId === restaurant.id)?.quantity || 0}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, restaurant.id, 
                              (cart.find(c => c.id === item.id && c.restaurantId === restaurant.id)?.quantity || 0) + 1
                            )}
                            className="w-6 h-6 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <NeonButton
                          size="sm"
                          variant="primary"
                          onClick={() => addToCart(item, restaurant.id)}
                        >
                          <Plus className="w-3 h-3" />
                        </NeonButton>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
          <ModernCard className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-900 dark:text-white font-semibold">
                Корзина ({getTotalItems()} товаров)
              </span>
              <span className="text-gray-900 dark:text-white font-bold">
                {getTotalPrice()} ₽
              </span>
            </div>
            <NeonButton onClick={handleCheckout} className="w-full">
              Оформить заказ
            </NeonButton>
          </ModernCard>
        </div>
      )}

      <CosmoAI service="food" />
    </div>
  );
};

export default Food;
