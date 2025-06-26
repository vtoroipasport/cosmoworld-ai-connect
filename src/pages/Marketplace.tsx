
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import CosmoAI from '@/components/CosmoAI';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import SearchBar from '@/components/marketplace/SearchBar';
import CategoryFilter from '@/components/marketplace/CategoryFilter';
import SortOptions from '@/components/marketplace/SortOptions';
import ProductList from '@/components/marketplace/ProductList';

const Marketplace = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('relevance');

  const categories = [
    { id: 'all', name: 'Все', icon: '🛍️' },
    { id: 'electronics', name: 'Техника', icon: '📱' },
    { id: 'fashion', name: 'Одежда', icon: '👕' },
    { id: 'home', name: 'Дом', icon: '🏠' },
    { id: 'books', name: 'Книги', icon: '📚' },
    { id: 'sports', name: 'Спорт', icon: '⚽' }
  ];

  const sortOptions = [
    { id: 'relevance', name: 'Релевантность' },
    { id: 'price_low', name: 'Дешевле' },
    { id: 'price_high', name: 'Дороже' },
    { id: 'ending_soon', name: 'Скоро' },
    { id: 'most_watched', name: 'Популярные' }
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
      <MarketplaceHeader favorites={favorites} cart={cart} />
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <SortOptions 
        sortOptions={sortOptions}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <ProductList
        products={sortedProducts}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onAddToCart={addToCart}
        onBuyNow={handleBuyNow}
        onPlaceBid={handlePlaceBid}
        onContactSeller={handleContactSeller}
      />
      <CosmoAI service="marketplace" />
    </div>
  );
};

export default Marketplace;
