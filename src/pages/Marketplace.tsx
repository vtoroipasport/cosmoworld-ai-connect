
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Heart, Star, ShoppingCart, Mic, Eye, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Электроника', 'Одежда', 'Дом и сад', 'Спорт', 'Автомобили', 'Книги'];

  const products = [
    {
      id: 1,
      title: 'iPhone 15 Pro Max 256GB',
      price: 1299,
      originalPrice: 1499,
      image: '📱',
      seller: 'TechStore Moscow',
      rating: 4.9,
      reviews: 1250,
      location: 'Москва',
      condition: 'Новое',
      shipping: 'Бесплатная доставка',
      views: 2341,
      watchers: 89,
      timeLeft: '2д 14ч',
      isAuction: true
    },
    {
      id: 2,
      title: 'MacBook Air M2 13" 512GB',
      price: 1899,
      image: '💻',
      seller: 'Apple Certified',
      rating: 4.8,
      reviews: 856,
      location: 'СПб',
      condition: 'Новое',
      shipping: 'Быстрая доставка',
      views: 1567,
      watchers: 45,
      buyItNow: true
    },
    {
      id: 3,
      title: 'Кроссовки Nike Air Max 270',
      price: 89,
      originalPrice: 120,
      image: '👟',
      seller: 'SportGear',
      rating: 4.7,
      reviews: 423,
      location: 'Казань',
      condition: 'Б/у отличное',
      shipping: 'Доставка 2-3 дня',
      views: 891,
      watchers: 23,
      timeLeft: '5д 8ч',
      isAuction: true
    },
    {
      id: 4,
      title: 'Samsung 65" 4K Smart TV',
      price: 799,
      image: '📺',
      seller: 'Electronics Hub',
      rating: 4.6,
      reviews: 334,
      location: 'Екатеринбург',
      condition: 'Новое',
      shipping: 'Установка включена',
      views: 1234,
      watchers: 67,
      buyItNow: true
    },
    {
      id: 5,
      title: 'Винтажная кожаная куртка',
      price: 150,
      image: '🧥',
      seller: 'VintageStyle',
      rating: 4.5,
      reviews: 189,
      location: 'Новосибирск',
      condition: 'Б/у хорошее',
      shipping: 'Доставка курьером',
      views: 567,
      watchers: 12,
      timeLeft: '1д 22ч',
      isAuction: true
    },
    {
      id: 6,
      title: 'PlayStation 5 + 2 игры',
      price: 650,
      originalPrice: 750,
      image: '🎮',
      seller: 'GameWorld',
      rating: 4.9,
      reviews: 723,
      location: 'Москва',
      condition: 'Б/у отличное',
      shipping: 'Самовывоз/доставка',
      views: 3456,
      watchers: 156,
      buyItNow: true
    }
  ];

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    console.log('Cosmo AI voice search activated:', isListening ? 'stopped' : 'started');
    
    if (!isListening) {
      setTimeout(() => {
        setSearchQuery('iPhone 15 Pro');
        setIsListening(false);
      }, 2000);
    }
  };

  const handleAddToWatchlist = (productId: number) => {
    console.log('Added to watchlist:', productId);
  };

  const handleBuyNow = (productId: number) => {
    console.log('Buy now:', productId);
  };

  const handlePlaceBid = (productId: number) => {
    console.log('Place bid:', productId);
  };

  const handleContactSeller = (productId: number) => {
    console.log('Contact seller:', productId);
  };

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
            <h1 className="text-white font-bold text-xl">CosmoMarket</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-md mx-auto px-4 py-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Искать товары..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Button
              onClick={handleVoiceSearch}
              className={`transition-all duration-300 ${
                isListening
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110'
              }`}
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Voice Search Feedback */}
      {isListening && (
        <div className="max-w-md mx-auto px-4 pb-4">
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm">
            <div className="p-3 text-center">
              <p className="text-purple-300 text-sm">Слушаю запрос на поиск товаров...</p>
            </div>
          </Card>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="space-y-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="p-4">
                <div className="flex space-x-3 mb-3">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-3xl">
                    {product.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm mb-1 truncate">{product.title}</h3>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-emerald-400 font-bold text-lg">{product.price} COSMO</span>
                      {product.originalPrice && (
                        <span className="text-gray-400 text-sm line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-white text-xs">{product.rating}</span>
                      <span className="text-gray-400 text-xs">({product.reviews})</span>
                    </div>
                    <p className="text-gray-300 text-xs">{product.seller} • {product.location}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddToWatchlist(product.id)}
                    className="text-white hover:bg-white/10"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-300 mb-3">
                  <span>Состояние: {product.condition}</span>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{product.views}</span>
                  </div>
                </div>

                {product.isAuction && product.timeLeft && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 mb-3">
                    <p className="text-red-300 text-xs font-medium">
                      Аукцион завершится через {product.timeLeft}
                    </p>
                    <p className="text-gray-300 text-xs">
                      Наблюдают: {product.watchers} человек
                    </p>
                  </div>
                )}

                <p className="text-green-400 text-xs mb-3">{product.shipping}</p>

                <div className="flex space-x-2">
                  {product.buyItNow ? (
                    <Button
                      onClick={() => handleBuyNow(product.id)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm py-2"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Купить
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handlePlaceBid(product.id)}
                      className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white text-sm py-2"
                    >
                      Сделать ставку
                    </Button>
                  )}
                  <Button
                    onClick={() => handleContactSeller(product.id)}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 text-sm py-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
          >
            Продать товар
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
          >
            Мои покупки
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
