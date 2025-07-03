
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Clock, Car, Star, Phone, Zap, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
import FloatingActionButton from '@/components/FloatingActionButton';

const Taxi = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedTariff, setSelectedTariff] = useState('comfort');

  const tariffs = [
    {
      id: 'economy',
      name: 'Эконом',
      price: 8,
      time: '3-5',
      icon: '🚗',
      description: 'Базовый тариф',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      features: ['Стандартный автомобиль', 'Быстрая подача']
    },
    {
      id: 'comfort',
      name: 'Комфорт',
      price: 12,
      time: '2-4',
      icon: '🚙',
      description: 'Улучшенные авто',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      features: ['Премиум авто', 'Климат-контроль', 'Wi-Fi']
    },
    {
      id: 'business',
      name: 'Бизнес',
      price: 20,
      time: '1-3',
      icon: '🚗',
      description: 'Премиум класс',
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      features: ['Люкс автомобили', 'Персональный водитель', 'VIP сервис']
    }
  ];

  const activeRides = [
    {
      id: 1,
      driver: 'Алексей К.',
      rating: 4.9,
      car: 'Tesla Model S',
      license: 'А123БВ',
      status: 'В пути к вам',
      eta: '2 мин',
      phone: '+7 (999) 123-45-67',
      avatar: 'photo-1472099645785-5658abf4ff4e'
    }
  ];

  const handleOrderTaxi = () => {
    if (from && to) {
      toast({
        title: "🚀 Заказ оформлен!",
        description: `Quantum Taxi ${tariffs.find(t => t.id === selectedTariff)?.name} прибудет через ${tariffs.find(t => t.id === selectedTariff)?.time} мин`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      {/* Quantum Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl parallax-slow" />
        <div className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl parallax-fast" />
        <div className="absolute bottom-40 left-32 w-48 h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl parallax-slow" />
      </div>

      {/* Neural Header */}
      <div className="glass-morphism sticky top-0 z-50 border-b border-primary/20">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="neomorphism-inset text-foreground hover:bg-primary/10 rounded-2xl magnetic-element micro-bounce quantum-focus"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="animate-fade-in-blur-bounce">
              <h1 className="text-foreground font-black text-xl neural-text">CosmoTaxi</h1>
              <p className="text-muted-foreground text-sm font-medium">Quantum Transport</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-500 font-bold">ONLINE</span>
          </div>
        </div>
      </div>

      {/* Quantum Route Input */}
      <div className="max-w-md mx-auto px-6 py-8">
        <ModernCard variant="holographic" className="p-6 animate-slide-up-bounce">
          <div className="mb-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-foreground text-lg font-bold neural-text">Маршрут</h2>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5 z-10" />
              <Input
                placeholder="Откуда поедем?"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="pl-12 h-14 glass-morphism border-primary/30 focus:border-primary focus:ring-primary bg-transparent text-foreground placeholder:text-muted-foreground rounded-2xl quantum-focus"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-transparent pointer-events-none" />
            </div>
            
            <div className="relative">
              <Navigation className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5 z-10" />
              <Input
                placeholder="Куда направляемся?"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="pl-12 h-14 glass-morphism border-primary/30 focus:border-primary focus:ring-primary bg-transparent text-foreground placeholder:text-muted-foreground rounded-2xl quantum-focus"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none" />
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Quantum Tariffs */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <div className="mb-6 animate-fade-in-blur-bounce">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-foreground text-xl font-black neural-text">Выберите тариф</h2>
          </div>
        </div>
        
        <div className="space-y-4">
          {tariffs.map((tariff, index) => (
            <ModernCard
              key={tariff.id}
              onClick={() => setSelectedTariff(tariff.id)}
              variant={selectedTariff === tariff.id ? "holographic" : "glass"}
              className={`p-6 cursor-pointer transition-all duration-500 animate-scale-in-bounce magnetic-element ${
                selectedTariff === tariff.id
                  ? 'ring-2 ring-primary/50 pulse-glow'
                  : 'hover:shadow-2xl hover:shadow-primary/20'
              }`}
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center bg-gradient-to-br ${tariff.gradient} shadow-2xl group-hover:scale-110 transition-transform duration-500 relative`}>
                  <span className="text-2xl">{tariff.icon}</span>
                  <div className="absolute inset-0 rounded-3xl bg-white/20 animate-pulse" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-foreground font-bold text-lg">{tariff.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-black text-xl">{tariff.price}</span>
                      <span className="text-primary font-bold text-sm">COSMO</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{tariff.time} мин</span>
                    </div>
                    <span className="text-accent font-medium">{tariff.description}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {tariff.features.map((feature, idx) => (
                      <div key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedTariff === tariff.id && (
                <div className="mt-4 p-3 bg-primary/10 rounded-2xl border border-primary/20 animate-slide-up-bounce">
                  <div className="flex items-center gap-2 text-primary">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-bold">Выбран • Гарантия качества</span>
                  </div>
                </div>
              )}
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Quantum Order Button */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <NeonButton 
          onClick={handleOrderTaxi}
          variant="holographic"
          size="xl"
          className="w-full animate-slide-up-bounce group quantum-button"
          disabled={!from || !to}
          glow={true}
        >
          <Car className="w-6 h-6" />
          <span className="flex-1 text-left font-black text-lg">Заказать Quantum Taxi</span>
          <Zap className="w-5 h-5 opacity-75" />
        </NeonButton>
      </div>

      {/* Active Quantum Rides */}
      {activeRides.length > 0 && (
        <div className="max-w-md mx-auto px-6 pb-8">
          <div className="mb-6 animate-fade-in-blur-bounce">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-foreground text-xl font-black neural-text">Активные поездки</h2>
            </div>
          </div>
          
          {activeRides.map((ride, index) => (
            <ModernCard key={ride.id} variant="holographic" className="p-6 animate-scale-in-bounce magnetic-element" style={{animationDelay: `${index * 100}ms`}}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
                    <Car className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-foreground font-bold text-lg">{ride.driver}</h4>
                    <div className="flex items-center text-yellow-500 gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold">{ride.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{ride.car} • {ride.license}</p>
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
                      PREMIUM
                    </div>
                    <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                      ECO
                    </div>
                  </div>
                </div>
                
                <NeonButton
                  variant="glass"
                  size="sm"
                  className="rounded-2xl magnetic-element micro-bounce"
                >
                  <Phone className="w-4 h-4" />
                </NeonButton>
              </div>
              
              <div className="glass-morphism rounded-2xl p-4 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-400 font-bold">{ride.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-bold">{ride.eta}</span>
                  </div>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      )}

      {/* Quantum Recent Destinations */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <div className="mb-6 animate-fade-in-blur-bounce">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-foreground text-xl font-black neural-text">Частые маршруты</h2>
          </div>
        </div>
        
        <div className="space-y-3">
          {[
            { name: 'Дом', address: 'ул. Ленина, 10', icon: '🏠', color: 'from-blue-500 to-cyan-500' },
            { name: 'Работа', address: 'БЦ Сити', icon: '🏢', color: 'from-purple-500 to-pink-500' },
            { name: 'Аэропорт', address: 'Шереметьево', icon: '✈️', color: 'from-green-500 to-teal-500' }
          ].map((destination, index) => (
            <ModernCard
              key={index}
              variant="glass"
              className="p-4 cursor-pointer animate-scale-in-bounce magnetic-element micro-bounce quantum-button"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${destination.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <span className="text-xl">{destination.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground font-bold">{destination.name}</h4>
                  <p className="text-muted-foreground text-sm">{destination.address}</p>
                </div>
                <div className="text-muted-foreground">
                  <Navigation className="w-4 h-4" />
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Quantum Floating Action Button */}
      <FloatingActionButton
        onClick={() => navigate('/')}
        icon={<ArrowLeft className="w-6 h-6" />}
        variant="holographic"
        className="shadow-2xl hover:shadow-primary/50 transition-all duration-500"
      />
    </div>
  );
};

export default Taxi;
