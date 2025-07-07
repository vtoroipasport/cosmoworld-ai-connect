import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ShoppingBag, Search, Filter, Star, Heart, Zap, TrendingUp, Users, Gift, Award, Globe, Shield, Plus, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CreateProductModal from '@/components/CreateProductModal';
import PurchaseModal from '@/components/PurchaseModal';
import ServicePageLayout from '@/components/ServicePageLayout';

const Marketplace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Neural Sneakers',
      description: 'Comfortable and stylish sneakers with AI-powered cushioning.',
      price: 129.99,
      rating: 4.7,
      imageUrl: 'https://source.unsplash.com/400x300/?sneakers',
      seller: 'CosmoGear',
      deliveryTime: '2-3 days',
      reviews: 64,
      isTrending: true,
      isEcoFriendly: true,
      discount: 10,
      category: 'Fashion',
      tags: ['sneakers', 'ai', 'comfort', 'style'],
      features: ['AI Cushioning', 'Breathable Fabric', 'Durable Sole'],
      specifications: {
        material: 'Recycled Polyester',
        weight: '0.8 kg',
        sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
      }
    },
    {
      id: 2,
      name: 'Quantum Headset',
      description: 'Immersive VR headset for gaming and entertainment.',
      price: 299.00,
      rating: 4.9,
      imageUrl: 'https://source.unsplash.com/400x300/?vr',
      seller: 'VisionTech',
      deliveryTime: '1-2 days',
      reviews: 128,
      isTrending: true,
      isEcoFriendly: false,
      discount: 5,
      category: 'Electronics',
      tags: ['vr', 'gaming', 'entertainment', 'immersive'],
      features: ['8K Resolution', 'Haptic Feedback', 'Spatial Audio'],
      specifications: {
        display: 'Dual OLED',
        refreshRate: '120 Hz',
        weight: '0.6 kg'
      }
    },
    {
      id: 3,
      name: 'Solar Backpack',
      description: 'Eco-friendly backpack with built-in solar panel for charging devices.',
      price: 89.50,
      rating: 4.6,
      imageUrl: 'https://source.unsplash.com/400x300/?backpack',
      seller: 'EcoStyle',
      deliveryTime: '3-5 days',
      reviews: 32,
      isTrending: false,
      isEcoFriendly: true,
      discount: 15,
      category: 'Fashion',
      tags: ['backpack', 'solar', 'eco-friendly', 'charging'],
      features: ['Solar Panel', 'Water Resistant', 'Multiple Compartments'],
      specifications: {
        capacity: '25L',
        solarPanelOutput: '10W',
        weight: '1.2 kg'
      }
    },
    {
      id: 4,
      name: 'Smart Garden Kit',
      description: 'Automated gardening kit for growing herbs and vegetables indoors.',
      price: 149.99,
      rating: 4.8,
      imageUrl: 'https://source.unsplash.com/400x300/?garden',
      seller: 'GreenThumb',
      deliveryTime: '2-4 days',
      reviews: 96,
      isTrending: true,
      isEcoFriendly: true,
      discount: 0,
      category: 'Home & Garden',
      tags: ['garden', 'smart', 'automated', 'indoor'],
      features: ['Automated Watering', 'LED Grow Lights', 'Nutrient Monitoring'],
      specifications: {
        dimensions: '40x30x20 cm',
        powerConsumption: '30W',
        weight: '2.5 kg'
      }
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setPurchaseModalOpen(true);
  };

  return (
    <ServicePageLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
        {/* Header */}
        <div className="sticky top-0 z-40 glass-morphism-2025 border-b border-border/10">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Назад
              </Button>
              <h1 className="text-lg font-bold">Cosmo Маркетплейс</h1>
              <Button variant="ghost" size="sm">
                <Users className="w-5 h-5" />
              </Button>
            </div>
            <div className="relative mt-3">
              <Input
                type="text"
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="rounded-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setFilterOpen(!filterOpen)}>
              <Filter className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setCreateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Создать товар
            </Button>
          </div>
        </div>

        {/* Product List */}
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map(product => (
              <Card
                key={product.id}
                className="bg-white dark:bg-gray-800 cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => handleProductClick(product)}
              >
                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
                <div className="p-3">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm">{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.isTrending && (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Create Product Modal */}
        <CreateProductModal 
          isOpen={createModalOpen} 
          onClose={() => setCreateModalOpen(false)}
          onCreate={(product) => console.log('Created:', product)}
        />

        {/* Purchase Modal */}
        <PurchaseModal
          isOpen={purchaseModalOpen}
          onClose={() => setPurchaseModalOpen(false)}
          product={selectedProduct}
          onPurchase={(details) => console.log('Purchased:', details)}
        />
      </div>
    </ServicePageLayout>
  );
};

export default Marketplace;
