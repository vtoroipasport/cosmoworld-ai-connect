
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Heart, ShoppingCart, Star, Eye, MessageCircle, Shield, Truck, CreditCard, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
import CosmoAI from '@/components/CosmoAI';

const Marketplace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('relevance');

  const categories = [
    { id: 'all', name: 'Все', icon: '🛍️' },
    { id: 'electronics', name: 'Электроника', icon: '📱' },
    { id: 'fashion', name: 'Одежда', icon: '👕' },
    { id: 'home', name: 'Дом', icon: '🏠' },
    { id: 'books', name: 'Книги', icon: '📚' },
    { id: 'sports', name: 'Спорт', icon: '⚽' }
  ];

  const products = [
    {
      id: 1,
      title: 'iPhone 15 Pro Max 256GB',
      price: 89999,
      originalPrice: 99999,
      category: 'electronics',
      seller: 'TechStore',
      sellerRating: 4.9,
      condition: 'Новое',
      location: 'Москва',
      shipping: 'Бесплатная доставка',
      image: '📱',
      views: 1247,
      watchers: 89,
      timeLeft: '2д 15ч',
      auction: false,
      buyNow: true,
      photos: 8,
      description: 'Новый iPhone 15 Pro Max с официальной гарантией'
    },
    {
      id: 2,
      title: 'Vintage Rolex Submariner',
      price: 450000,
      category: 'fashion',
      seller: 'WatchCollector',
      sellerRating: 4.8,
      condition: 'Б/у отличное',
      location: 'СПб',
      shipping: 'Доставка 990₽',
      image: '⌚',
      views: 2341,
      watchers: 156,
      timeLeft: '1д 8ч',
      auction: true,
      buyNow: false,
      photos: 12,
      description: 'Редкие винтажные часы Rolex в отличном состоянии'
    },
    {
      id: 3,
      title: 'MacBook Pro M3 16"',
      price: 199999,
      originalPrice: 219999,
      category: 'electronics',
      seller: 'AppleStore',
      sellerRating: 5.0,
      condition: 'Новое',
      location: 'Москва',
      shipping: 'Бесплатная доставка',
      image: '💻',
      views: 890,
      watchers: 67,
      timeLeft: '5д 12ч',
      auction: false,
      buyNow: true,
      photos: 6,
      description: 'Новый MacBook Pro с чипом M3 и гарантией Apple'
    },
    {
      id: 4,
      title: 'Nike Air Jordan 1 Retro',
      price: 12999,
      category: 'fashion',
      seller: 'SneakerHead',
      sellerRating: 4.7,
      condition: 'Новое',
      location: 'Екатеринбург',
      shipping: 'Доставка 590₽',
      image: '👟',
      views: 567,
      watchers: 34,
      timeLeft: '3д 5ч',
      auction: false,
      buyNow: true,
      photos: 10,
      description: 'Оригинальные кроссовки Nike Air Jordan 1 Retro'
    }
  ];

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
      toast({
        title: "Удалено из избранного",
        description: "Товар убран из списка наблюдения",
      });
    } else {
      setFavorites([...favorites, productId]);
      toast({
        title: "Добавлено в избранное",
        description: "Товар добавлен в список наблюдения",
      });
    }
  };

  const addToCart = (productId: number) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId]);
      toast({
        title: "Добавлено в корзину",
        description: "Товар добавлен в корзину",
      });
    }
  };

  const handleBuyNow = (product: any) => {
    toast({
      title: "Переход к оплате",
      description: `Покупка "${product.title}" за ${product.price.toLocaleString()} ₽`,
    });
  };

  const handlePlaceBid = (product: any) => {
    toast({
      title: "Ставка размещена",
      description: `Ваша ставка на "${product.title}" принята`,
    });
  };

  const handleContactSeller = (product: any) => {
    toast({
      title: "Сообщение отправлено",
      description: `Вопрос продавцу ${product.seller} отправлен`,
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'ending_soon':
        return a.timeLeft.localeCompare(b.timeLeft);
      case 'most_watched':
        return b.watchers - a.watchers;
      default:
        return 0;
    }
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
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">CosmoMarket</h1>
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
              onClick={() => navigate('/watchlist')}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/cart')}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск товаров..."
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

      {/* Sort Options */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[
            { id: 'relevance', name: 'По релевантности' },
            { id: 'price_low', name: 'Сначала дешевые' },
            { id: 'price_high', name: 'Сначала дорогие' },
            { id: 'ending_soon', name: 'Скоро заканчиваются' },
            { id: 'most_watched', name: 'Популярные' }
          ].map((sort) => (
            <NeonButton
              key={sort.id}
              onClick={() => setSortBy(sort.id)}
              variant={sortBy === sort.id ? 'primary' : 'secondary'}
              size="sm"
              className="whitespace-nowrap text-xs"
            >
              {sort.name}
            </NeonButton>
          ))}
        </div>
      </div>

      {/* Products List */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
            {sortedProducts.length} товаров найдено
          </h3>
        </div>
        
        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <ModernCard
              key={product.id}
              className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="flex space-x-3">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center text-2xl relative">
                  {product.image}
                  <div className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs px-1 rounded">
                    {product.photos}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-gray-900 dark:text-white font-semibold text-sm truncate pr-2">
                      {product.title}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(product.id)}
                      className="p-1 flex-shrink-0"
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          favorites.includes(product.id) 
                            ? 'text-red-500 fill-red-500' 
                            : 'text-gray-400 dark:text-gray-500'
                        }`} 
                      />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {product.price.toLocaleString()} ₽
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        {product.originalPrice.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{product.condition}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{product.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <span className="text-sm text-blue-600 dark:text-blue-400">{product.seller}</span>
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-sm text-yellow-600 dark:text-yellow-400">{product.sellerRating}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {product.views}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {product.watchers}
                    </div>
                    {product.auction && (
                      <div className="flex items-center">
                        <Timer className="w-3 h-3 mr-1" />
                        {product.timeLeft}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    <Truck className="w-3 h-3 text-green-600 dark:text-green-400" />
                    <span className="text-xs text-green-600 dark:text-green-400">{product.shipping}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {product.auction ? (
                      <NeonButton
                        size="sm"
                        variant="primary"
                        onClick={() => handlePlaceBid(product)}
                        className="flex-1"
                      >
                        Сделать ставку
                      </NeonButton>
                    ) : (
                      <div className="flex space-x-1 flex-1">
                        <NeonButton
                          size="sm"
                          variant="primary"
                          onClick={() => handleBuyNow(product)}
                          className="flex-1"
                        >
                          <CreditCard className="w-3 h-3 mr-1" />
                          Купить
                        </NeonButton>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCart(product.id)}
                          className="px-2"
                        >
                          <ShoppingCart className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleContactSeller(product)}
                      className="px-2"
                    >
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      <CosmoAI service="marketplace" />
    </div>
  );
};

export default Marketplace;
