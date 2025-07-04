
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Heart, ShoppingCart, Star, Eye, MessageCircle, Shield, Truck, CreditCard, Timer, Gavel, TrendingUp, Award } from 'lucide-react';
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
  const [bidAmount, setBidAmount] = useState<{[key: number]: number}>({});

  const categories = [
    { id: 'all', name: 'Все', icon: '🛍️' },
    { id: 'electronics', name: 'Электроника', icon: '📱' },
    { id: 'fashion', name: 'Одежда', icon: '👕' },
    { id: 'home', name: 'Дом', icon: '🏠' },
    { id: 'collectibles', name: 'Коллекции', icon: '🏆' },
    { id: 'auto', name: 'Авто', icon: '🚗' },
    { id: 'sports', name: 'Спорт', icon: '⚽' }
  ];

  const products = [
    {
      id: 1,
      title: 'iPhone 15 Pro Max 256GB',
      currentBid: 89999,
      buyNowPrice: 99999,
      originalPrice: 110000,
      category: 'electronics',
      seller: 'TechStore',
      sellerRating: 4.9,
      condition: 'Новое',
      location: 'Москва',
      shipping: 'Бесплатная доставка',
      image: '📱',
      views: 1247,
      watchers: 89,
      bids: 23,
      timeLeft: '2д 15ч 23м',
      auction: true,
      buyNow: true,
      photos: 8,
      description: 'Новый iPhone 15 Pro Max с официальной гарантией Apple',
      topBidder: 'user***5',
      bidHistory: [
        { bidder: 'user***5', amount: 89999, time: '2 мин назад' },
        { bidder: 'user***2', amount: 89500, time: '5 мин назад' },
        { bidder: 'user***8', amount: 89000, time: '12 мин назад' }
      ]
    },
    {
      id: 2,
      title: 'Vintage Rolex Submariner 1980',
      currentBid: 450000,
      category: 'collectibles',
      seller: 'WatchCollector',
      sellerRating: 4.8,
      condition: 'Б/у отличное',
      location: 'СПб',
      shipping: 'Доставка 990₽',
      image: '⌚',
      views: 2341,
      watchers: 156,
      bids: 67,
      timeLeft: '1д 8ч 45м',
      auction: true,
      buyNow: false,
      photos: 12,
      description: 'Редкие винтажные часы Rolex Submariner 1980 года в отличном состоянии',
      topBidder: 'collector***1',
      bidHistory: [
        { bidder: 'collector***1', amount: 450000, time: '1 мин назад' },
        { bidder: 'watch***7', amount: 445000, time: '8 мин назад' },
        { bidder: 'vintage***3', amount: 440000, time: '15 мин назад' }
      ]
    },
    {
      id: 3,
      title: 'MacBook Pro M3 16" 512GB',
      currentBid: 199999,
      buyNowPrice: 219999,
      originalPrice: 249999,
      category: 'electronics',
      seller: 'AppleStore',
      sellerRating: 5.0,
      condition: 'Новое',
      location: 'Москва',
      shipping: 'Бесплатная доставка',
      image: '💻',
      views: 890,
      watchers: 67,
      bids: 12,
      timeLeft: '5д 12ч 30м',
      auction: true,
      buyNow: true,
      photos: 6,
      description: 'Новый MacBook Pro с чипом M3 и гарантией Apple',
      topBidder: 'dev***4',
      bidHistory: [
        { bidder: 'dev***4', amount: 199999, time: '30 мин назад' },
        { bidder: 'student***1', amount: 195000, time: '1 час назад' }
      ]
    }
  ];

  const handlePlaceBid = (productId: number) => {
    const product = products.find(p => p.id === productId);
    const bidValue = bidAmount[productId];
    
    if (!bidValue || bidValue <= (product?.currentBid || 0)) {
      toast({
        title: "Ошибка ставки",
        description: "Ваша ставка должна быть больше текущей",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ставка размещена!",
      description: `Ваша ставка ${bidValue.toLocaleString()} ₽ на "${product?.title}" принята`,
    });
    
    setBidAmount({...bidAmount, [productId]: 0});
  };

  const handleBuyNow = (product: any) => {
    toast({
      title: "Покупка мгновенно!",
      description: `"${product.title}" за ${product.buyNowPrice?.toLocaleString()} ₽ добавлен в корзину`,
    });
    addToCart(product.id);
  };

  const addToCart = (productId: number) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId]);
    }
  };

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
        title: "Добавлено в наблюдение",
        description: "Вы будете получать уведомления об изменении цены",
      });
    }
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
        return (a.currentBid || a.buyNowPrice || 0) - (b.currentBid || b.buyNowPrice || 0);
      case 'price_high':
        return (b.currentBid || b.buyNowPrice || 0) - (a.currentBid || a.buyNowPrice || 0);
      case 'ending_soon':
        return a.timeLeft.localeCompare(b.timeLeft);
      case 'most_watched':
        return b.watchers - a.watchers;
      case 'most_bids':
        return (b.bids || 0) - (a.bids || 0);
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
              className="text-gray-700 dark:text-gray-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-gray-900 dark:text-white font-bold text-xl">CosmoMarket</h1>
              <p className="text-xs text-muted-foreground">Аукционы и мгновенные покупки</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="relative">
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
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Поиск товаров на аукционе..."
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
            { id: 'ending_soon', name: 'Скоро закончится' },
            { id: 'most_bids', name: 'Больше ставок' },
            { id: 'price_low', name: 'Дешевле' },
            { id: 'price_high', name: 'Дороже' },
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
        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <ModernCard
              key={product.id}
              className="p-4 bg-white dark:bg-gray-800"
            >
              <div className="flex space-x-3 mb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center text-2xl relative">
                  {product.image}
                  <div className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs px-1 rounded">
                    {product.photos}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900 dark:text-white font-semibold text-sm pr-2">
                      {product.title}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(product.id)}
                      className="p-1"
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          favorites.includes(product.id) 
                            ? 'text-red-500 fill-red-500' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-yellow-600">{product.sellerRating}</span>
                    <span className="text-blue-600">{product.seller}</span>
                  </div>
                </div>
              </div>

              {/* Auction Info */}
              {product.auction && (
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Gavel className="w-4 h-4 text-red-600" />
                      <span className="text-red-600 font-bold text-sm">АУКЦИОН</span>
                    </div>
                    <div className="flex items-center gap-1 text-orange-600">
                      <Timer className="w-3 h-3" />
                      <span className="text-xs font-bold">{product.timeLeft}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {product.currentBid.toLocaleString()} ₽
                      </div>
                      <div className="text-xs text-gray-600">
                        Текущая ставка • {product.bids} ставок
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-600">Лидирует:</div>
                      <div className="text-sm font-medium text-green-600">{product.topBidder}</div>
                    </div>
                  </div>

                  {/* Bid Input */}
                  <div className="flex gap-2 mb-3">
                    <Input
                      type="number"
                      placeholder={`Мин. ${(product.currentBid + 1000).toLocaleString()}`}
                      value={bidAmount[product.id] || ''}
                      onChange={(e) => setBidAmount({...bidAmount, [product.id]: parseInt(e.target.value) || 0})}
                      className="flex-1 text-sm"
                    />
                    <NeonButton
                      onClick={() => handlePlaceBid(product.id)}
                      size="sm"
                      className="px-4"
                    >
                      <Gavel className="w-3 h-3 mr-1" />
                      Ставка
                    </NeonButton>
                  </div>

                  {/* Recent Bids */}
                  <div className="border-t pt-2">
                    <div className="text-xs text-gray-600 mb-1">Последние ставки:</div>
                    {product.bidHistory.slice(0, 2).map((bid, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-gray-600">{bid.bidder}</span>
                        <span className="font-medium">{bid.amount.toLocaleString()} ₽</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buy Now Option */}
              {product.buyNow && product.buyNowPrice && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-blue-600 font-medium mb-1">
                        Купить сейчас
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {product.buyNowPrice.toLocaleString()} ₽
                      </div>
                    </div>
                    <NeonButton
                      onClick={() => handleBuyNow(product)}
                      variant="primary"
                      size="sm"
                    >
                      <CreditCard className="w-3 h-3 mr-1" />
                      Купить
                    </NeonButton>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {product.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {product.watchers}
                  </div>
                  {product.bids && (
                    <div className="flex items-center gap-1">
                      <Gavel className="w-3 h-3" />
                      {product.bids}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-green-600" />
                  <span className="text-green-600">{product.shipping}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast({title: "Сообщение", description: `Сообщение продавцу ${product.seller} отправлено`})}
                  className="flex-1"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Написать
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addToCart(product.id)}
                  className="px-3"
                >
                  <ShoppingCart className="w-3 h-3" />
                </Button>
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
