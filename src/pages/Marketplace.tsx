
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Plus, Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
import CreateProductModal from '@/components/CreateProductModal';
import PurchaseModal from '@/components/PurchaseModal';

const Marketplace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'Все', icon: '🛍️' },
    { id: 'electronics', name: 'Электроника', icon: '📱' },
    { id: 'fashion', name: 'Одежда', icon: '👕' },
    { id: 'home', name: 'Дом', icon: '🏠' },
    { id: 'books', name: 'Книги', icon: '📚' },
    { id: 'sports', name: 'Спорт', icon: '⚽' }
  ];

  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'iPhone 14 Pro',
      price: 800,
      oldPrice: 1000,
      seller: 'TechStore',
      rating: 4.8,
      reviews: 124,
      image: '📱',
      category: 'electronics',
      condition: 'Новое',
      location: 'Москва',
      premium: true
    },
    {
      id: 2,
      title: 'Кроссовки Nike Air Max',
      price: 120,
      seller: 'SneakerHub',
      rating: 4.7,
      reviews: 89,
      image: '👟',
      category: 'fashion',
      condition: 'Отличное',
      location: 'СПб',
      premium: false
    },
    {
      id: 3,
      title: 'MacBook Pro M2',
      price: 1500,
      seller: 'AppleReseller',
      rating: 4.9,
      reviews: 56,
      image: '💻',
      category: 'electronics',
      condition: 'Б/у',
      location: 'Москва',
      premium: true
    }
  ]);

  const handleAddToFavorites = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
      toast({
        title: "Удалено из избранного",
        description: "Товар убран из списка избранного",
      });
    } else {
      setFavorites([...favorites, productId]);
      toast({
        title: "Добавлено в избранное",
        description: "Товар добавлен в избранное",
      });
    }
  };

  const handleCreateProduct = (newProduct: any) => {
    setProducts([newProduct, ...products]);
    toast({
      title: "Товар добавлен!",
      description: `"${newProduct.title}" успешно размещен на маркетплейсе`,
    });
  };

  const handlePurchase = (product: any) => {
    toast({
      title: "Покупка оформлена!",
      description: `Товар "${product.title}" добавлен в корзину`,
    });
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="glass-card border-b border-gray-300 dark:border-gray-700 sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95">
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
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">Маркетплейс</h1>
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
              onClick={() => setShowCreateModal(true)}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Plus className="w-5 h-5" />
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
            className="pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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

      {/* Create Product CTA */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <ModernCard className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 dark:text-white font-semibold">Продавайте на маркетплейсе</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Размещайте товары и получайте COSMO токены</p>
            </div>
            <NeonButton 
              onClick={() => setShowCreateModal(true)}
              variant="primary"
              size="sm"
            >
              Продать
            </NeonButton>
          </div>
        </ModernCard>
      </div>

      {/* Products Grid */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">
          {selectedCategory === 'all' ? 'Все товары' : categories.find(c => c.id === selectedCategory)?.name}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map((product) => (
            <ModernCard
              key={product.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="flex space-x-3">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center text-2xl">
                  {product.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-gray-900 dark:text-white font-semibold truncate">{product.title}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToFavorites(product.id);
                      }}
                      className="p-1"
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
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{product.price} COSMO</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">{product.oldPrice} COSMO</span>
                    )}
                    {product.premium && (
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-1 rounded">
                        Premium
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      {product.rating}
                    </div>
                    <span>({product.reviews})</span>
                    <span>{product.condition}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {product.seller} • {product.location}
                    </span>
                    <NeonButton 
                      size="sm" 
                      variant="primary"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <ShoppingCart className="w-3 h-3" />
                    </NeonButton>
                  </div>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      <CreateProductModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateProduct}
      />

      {selectedProduct && (
        <PurchaseModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  );
};

export default Marketplace;
