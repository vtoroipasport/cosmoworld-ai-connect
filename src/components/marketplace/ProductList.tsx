
import React from 'react';
import ProductCard from './ProductCard';

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

interface ProductListProps {
  products: Product[];
  favorites: number[];
  onToggleFavorite: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  onBuyNow: (product: Product) => void;
  onPlaceBid: (product: Product) => void;
  onContactSeller: (product: Product) => void;
}

const ProductList = ({
  products,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onBuyNow,
  onPlaceBid,
  onContactSeller
}: ProductListProps) => {
  return (
    <div className="max-w-md mx-auto px-4 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
          {products.length} товаров найдено
        </h3>
      </div>
      
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={onToggleFavorite}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
            onPlaceBid={onPlaceBid}
            onContactSeller={onContactSeller}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
