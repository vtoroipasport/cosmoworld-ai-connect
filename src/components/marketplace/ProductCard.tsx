
import React from 'react';
import { Heart, Star, Eye, Timer, Truck, CreditCard, ShoppingCart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  category: string;
  seller: string;
  sellerRating: number;
  condition: string;
  location: string;
  shipping: string;
  image: string;
  views: number;
  watchers: number;
  timeLeft: string;
  auction: boolean;
  buyNow: boolean;
  photos: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  onBuyNow: (product: Product) => void;
  onPlaceBid: (product: Product) => void;
  onContactSeller: (product: Product) => void;
}

const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onBuyNow,
  onPlaceBid,
  onContactSeller
}: ProductCardProps) => {
  return (
    <ModernCard className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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
              onClick={() => onToggleFavorite(product.id)}
              className="p-1 flex-shrink-0"
            >
              <Heart 
                className={`w-4 h-4 ${
                  isFavorite 
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
                onClick={() => onPlaceBid(product)}
                className="flex-1"
              >
                Сделать ставку
              </NeonButton>
            ) : (
              <div className="flex space-x-1 flex-1">
                <NeonButton
                  size="sm"
                  variant="primary"
                  onClick={() => onBuyNow(product)}
                  className="flex-1"
                >
                  <CreditCard className="w-3 h-3 mr-1" />
                  Купить
                </NeonButton>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddToCart(product.id)}
                  className="px-2"
                >
                  <ShoppingCart className="w-3 h-3" />
                </Button>
              </div>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onContactSeller(product)}
              className="px-2"
            >
              <MessageCircle className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </ModernCard>
  );
};

export default ProductCard;
