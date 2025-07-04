import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Clock, Car, Star, Phone, Zap, Shield, Sparkles, User, UserCheck, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
import FloatingActionButton from '@/components/FloatingActionButton';

const Taxi = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userMode, setUserMode] = useState<'select' | 'client' | 'driver'>('select');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedTariff, setSelectedTariff] = useState('comfort');
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [rideStatus, setRideStatus] = useState<'idle' | 'searching' | 'found' | 'in_ride' | 'completed'>('idle');
  const [driverLocation, setDriverLocation] = useState<{lat: number, lng: number} | null>(null);

  // Получение геолокации
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Ошибка геолокации:', error);
          toast({
            title: "Геолокация недоступна",
            description: "Включите доступ к местоположению для лучшего опыта",
            variant: "destructive"
          });
        }
      );
    }
  }, []);

  // Симуляция движения водителя
  useEffect(() => {
    if (rideStatus === 'found' || rideStatus === 'in_ride') {
      const interval = setInterval(() => {
        setDriverLocation(prev => {
          if (!prev || !currentLocation) return prev;
          
          // Движение к клиенту
          const deltaLat = (currentLocation.lat - prev.lat) * 0.1;
          const deltaLng = (currentLocation.lng - prev.lng) * 0.1;
          
          return {
            lat: prev.lat + deltaLat,
            lng: prev.lng + deltaLng
          };
        });
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [rideStatus, currentLocation]);

  const tariffs = [
    {
      id: 'economy',
      name: 'Эконом',
      price: 150,
      time: '3-5',
      icon: '🚗',
      description: 'Базовый тариф',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      features: ['Стандартный автомобиль', 'Быстрая подача']
    },
    {
      id: 'comfort',
      name: 'Комфорт',
      price: 220,
      time: '2-4',
      icon: '🚙',
      description: 'Улучшенные авто',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      features: ['Премиум авто', 'Климат-контроль', 'Wi-Fi']
    },
    {
      id: 'business',
      name: 'Бизнес',
      price: 350,
      time: '1-3',
      icon: '🚗',
      description: 'Премиум класс',
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      features: ['Люкс автомобили', 'Персональный водитель', 'VIP сервис']
    }
  ];

  const activeDriver = {
    id: 1,
    name: 'Алексей К.',
    rating: 4.9,
    car: 'Hyundai Solaris',
    license: 'А123БВ77',
    phone: '+7 (999) 123-45-67',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  };

  const handleOrderTaxi = () => {
    if (!from || !to) {
      toast({
        title: "Заполните маршрут",
        description: "Укажите точки отправления и назначения",
        variant: "destructive"
      });
      return;
    }

    setRideStatus('searching');
    toast({
      title: "🔍 Ищем водителя",
      description: "Подбираем ближайшего водителя...",
    });

    // Симуляция поиска водителя
    setTimeout(() => {
      setRideStatus('found');
      setDriverLocation({
        lat: currentLocation!.lat + 0.01,
        lng: currentLocation!.lng + 0.01
      });
      toast({
        title: "✅ Водитель найден!",
        description: `${activeDriver.name} прибудет через 3 минуты`,
      });
    }, 3000);
  };

  const handleStartRide = () => {
    setRideStatus('in_ride');
    toast({
      title: "🚗 Поездка началась",
      description: "Приятной дороги!",
    });
  };

  const handleCompleteRide = () => {
    setRideStatus('completed');
    toast({
      title: "🎉 Поездка завершена",
      description: `Стоимость: ${tariffs.find(t => t.id === selectedTariff)?.price} ₽`,
    });
    
    setTimeout(() => {
      setRideStatus('idle');
      setFrom('');
      setTo('');
      setDriverLocation(null);
    }, 3000);
  };

  // Экран выбора режима
  if (userMode === 'select') {
    return (
      <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-32 w-48 h-48 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-md mx-auto px-6 py-8 relative z-10">
          <div className="glass-morphism sticky top-0 z-50 border-b border-primary/20 -mx-6 px-6 py-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="neomorphism-inset text-foreground hover:bg-primary/10 rounded-2xl"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-foreground font-black text-xl">CosmoTaxi</h1>
                  <p className="text-muted-foreground text-sm">Выберите режим</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ModernCard 
              variant="holographic"
              onClick={() => setUserMode('client')}
              className="p-8 cursor-pointer group animate-scale-in-bounce magnetic-element"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-foreground font-bold text-2xl mb-3">Пассажир</h2>
                <p className="text-muted-foreground mb-6">Заказать поездку и добраться до места назначения</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-blue-500/10 rounded-xl p-3 text-blue-400">
                    <MapPin className="w-4 h-4 mx-auto mb-1" />
                    <div>Быстрая подача</div>
                  </div>
                  <div className="bg-green-500/10 rounded-xl p-3 text-green-400">
                    <Star className="w-4 h-4 mx-auto mb-1" />
                    <div>Лучшие водители</div>
                  </div>
                </div>
              </div>
            </ModernCard>

            <ModernCard 
              variant="holographic"
              onClick={() => setUserMode('driver')}
              className="p-8 cursor-pointer group animate-scale-in-bounce magnetic-element"
              style={{animationDelay: '200ms'}}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-foreground font-bold text-2xl mb-3">Водитель</h2>
                <p className="text-muted-foreground mb-6">Принимать заказы и зарабатывать на поездках</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-green-500/10 rounded-xl p-3 text-green-400">
                    <DollarSign className="w-4 h-4 mx-auto mb-1" />
                    <div>Хороший доход</div>
                  </div>
                  <div className="bg-purple-500/10 rounded-xl p-3 text-purple-400">
                    <Clock className="w-4 h-4 mx-auto mb-1" />
                    <div>Гибкий график</div>
                  </div>
                </div>
              </div>
            </ModernCard>
          </div>
        </div>
      </div>
    );
  }

  // Основной интерфейс такси
  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-32 w-48 h-48 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <div className="glass-morphism sticky top-0 z-50 border-b border-primary/20">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserMode('select')}
              className="neomorphism-inset text-foreground hover:bg-primary/10 rounded-2xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-foreground font-black text-xl">
                {userMode === 'client' ? 'Заказ такси' : 'Водитель онлайн'}
              </h1>
              <p className="text-muted-foreground text-sm">
                {userMode === 'client' ? 'Quantum Transport' : 'Принимайте заказы'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-500 font-bold">ONLINE</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 relative z-10">
        {/* Карта */}
        <ModernCard variant="holographic" className="p-4 mb-6">
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl h-64 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
            
            {/* Моя позиция */}
            {currentLocation && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
                <div className="w-8 h-8 bg-blue-500/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
              </div>
            )}
            
            {/* Позиция водителя */}
            {driverLocation && (
              <div className="absolute top-1/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <Car className="w-3 h-3 text-white" />
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
              </div>
            )}
            
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 dark:bg-slate-800/90 rounded-xl p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">
                    {currentLocation ? 'Ваше местоположение определено' : 'Определяем местоположение...'}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-green-600 font-medium">GPS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModernCard>

        {userMode === 'client' && (
          <>
            {/* Маршрут */}
            {rideStatus === 'idle' && (
              <ModernCard variant="glass" className="p-6 mb-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-foreground text-lg font-bold">Маршрут</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5 z-10" />
                    <Input
                      placeholder="Откуда поедем?"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="pl-12 h-14 glass-morphism border-primary/30 focus:border-primary focus:ring-primary bg-transparent text-foreground rounded-2xl"
                    />
                  </div>
                  
                  <div className="relative">
                    <Navigation className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5 z-10" />
                    <Input
                      placeholder="Куда направляемся?"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="pl-12 h-14 glass-morphism border-primary/30 focus:border-primary focus:ring-primary bg-transparent text-foreground rounded-2xl"
                    />
                  </div>
                </div>
              </ModernCard>
            )}

            {/* Тарифы */}
            {rideStatus === 'idle' && (
              <div className="mb-6">
                <h2 className="text-foreground text-xl font-black mb-4">Выберите тариф</h2>
                <div className="space-y-4">
                  {tariffs.map((tariff, index) => (
                    <ModernCard
                      key={tariff.id}
                      onClick={() => setSelectedTariff(tariff.id)}
                      variant={selectedTariff === tariff.id ? "holographic" : "glass"}
                      className={`p-6 cursor-pointer transition-all duration-500 magnetic-element ${
                        selectedTariff === tariff.id
                          ? 'ring-2 ring-primary/50 pulse-glow'
                          : 'hover:shadow-2xl hover:shadow-primary/20'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center bg-gradient-to-br ${tariff.gradient} shadow-2xl`}>
                          <span className="text-2xl">{tariff.icon}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-foreground font-bold text-lg">{tariff.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-foreground font-black text-xl">{tariff.price}</span>
                              <span className="text-primary font-bold text-sm">₽</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{tariff.time} мин</span>
                            </div>
                            <span className="text-accent font-medium">{tariff.description}</span>
                          </div>
                        </div>
                      </div>
                    </ModernCard>
                  ))}
                </div>
              </div>
            )}

            {/* Кнопка заказа */}
            {rideStatus === 'idle' && (
              <NeonButton 
                onClick={handleOrderTaxi}
                variant="holographic"
                size="xl"
                className="w-full group"
                disabled={!from || !to}
                glow={true}
              >
                <Car className="w-6 h-6" />
                <span className="flex-1 text-left font-black text-lg">Заказать такси</span>
                <Zap className="w-5 h-5 opacity-75" />
              </NeonButton>
            )}
          </>
        )}

        {/* Статус поездки */}
        {rideStatus !== 'idle' && userMode === 'client' && (
          <ModernCard variant="holographic" className="p-6 mb-6">
            <div className="text-center">
              {rideStatus === 'searching' && (
                <>
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                  <h3 className="text-foreground font-bold text-xl mb-2">Ищем водителя</h3>
                  <p className="text-muted-foreground">Подбираем ближайшего водителя...</p>
                </>
              )}
              
              {rideStatus === 'found' && (
                <>
                  <div className="w-20 h-20 rounded-3xl overflow-hidden mx-auto mb-4 border-4 border-green-500">
                    <img 
                      src={activeDriver.avatar} 
                      alt={activeDriver.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-foreground font-bold text-xl mb-1">{activeDriver.name}</h3>
                  <p className="text-muted-foreground mb-2">{activeDriver.car} • {activeDriver.license}</p>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-yellow-600 font-bold">{activeDriver.rating}</span>
                  </div>
                  <div className="glass-morphism rounded-2xl p-4 border border-green-500/30 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-bold">Водитель едет к вам</span>
                      <span className="text-green-400 font-bold">3 мин</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-2xl border-primary/30"
                      onClick={() => toast({title: "Звонок", description: `Звоним ${activeDriver.name}`})}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Позвонить
                    </Button>
                    <NeonButton 
                      onClick={handleStartRide}
                      className="flex-1"
                    >
                      Начать поездку
                    </NeonButton>
                  </div>
                </>
              )}
              
              {rideStatus === 'in_ride' && (
                <>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Car className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-foreground font-bold text-xl mb-2">В пути</h3>
                  <p className="text-muted-foreground mb-4">Время в пути: 12 мин</p>
                  <NeonButton 
                    onClick={handleCompleteRide}
                    variant="primary"
                    className="w-full"
                  >
                    Завершить поездку
                  </NeonButton>
                </>
              )}
              
              {rideStatus === 'completed' && (
                <>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-foreground font-bold text-xl mb-2">Поездка завершена!</h3>
                  <p className="text-muted-foreground mb-4">
                    Стоимость: {tariffs.find(t => t.id === selectedTariff)?.price} ₽
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-2xl">
                      <Star className="w-4 h-4 mr-2" />
                      Оценить
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-2xl">
                      Повторить
                    </Button>
                  </div>
                </>
              )}
            </div>
          </ModernCard>
        )}

        {/* Интерфейс водителя */}
        {userMode === 'driver' && (
          <div className="space-y-6">
            <ModernCard variant="holographic" className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-foreground font-bold text-xl mb-2">Вы онлайн</h3>
                <p className="text-muted-foreground mb-4">Ожидаем заказы в вашем районе</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">₽1,850</div>
                    <div className="text-xs text-muted-foreground">Сегодня</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">8</div>
                    <div className="text-xs text-muted-foreground">Поездок</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">4.9</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      Рейтинг
                    </div>
                  </div>
                </div>

                <NeonButton 
                  variant="secondary"
                  className="w-full"
                  onClick={() => toast({title: "Статус изменен", description: "Вы офлайн"})}
                >
                  Завершить смену
                </NeonButton>
              </div>
            </ModernCard>

            <ModernCard variant="glass" className="p-4">
              <h3 className="text-foreground font-semibold mb-4">Активные заказы поблизости</h3>
              <div className="space-y-3">
                {[
                  { from: 'ул. Ленина, 15', to: 'БЦ Сити', price: 180, distance: '0.8 км' },
                  { from: 'ТЦ Мега', to: 'Аэропорт', price: 450, distance: '1.2 км' },
                ].map((order, index) => (
                  <div key={index} className="glass-morphism rounded-2xl p-4 border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm mb-1">
                          <MapPin className="w-3 h-3 text-green-500" />
                          <span className="text-foreground font-medium">{order.from}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Navigation className="w-3 h-3 text-red-500" />
                          <span className="text-muted-foreground">{order.to}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-foreground font-bold">{order.price} ₽</div>
                        <div className="text-xs text-muted-foreground">{order.distance}</div>
                      </div>
                    </div>
                    <NeonButton 
                      size="sm" 
                      className="w-full"
                      onClick={() => toast({title: "Заказ принят", description: "Едем к клиенту"})}
                    >
                      Принять заказ
                    </NeonButton>
                  </div>
                ))}
              </div>
            </ModernCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default Taxi;
