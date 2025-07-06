
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Star, Car, MapPin, TrendingUp, Zap, Activity, Brain, Bot, Map, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import VoiceAssistant from '@/components/VoiceAssistant';

const Taxi = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAI, setShowAI] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTaxi, setSelectedTaxi] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const taxiOptions = [
    {
      id: 1,
      name: 'Эконом',
      price: '150₽',
      time: '5-7 мин',
      description: 'Базовый тариф',
      icon: Car,
      vehicle: '🚗'
    },
    {
      id: 2,
      name: 'Комфорт',
      price: '250₽',
      time: '3-5 мин',
      description: 'Более комфортный салон',
      icon: Car,
      vehicle: '🚙'
    },
    {
      id: 3,
      name: 'Премиум',
      price: '500₽',
      time: '2-3 мин',
      description: 'Авто премиум-класса',
      icon: Car,
      vehicle: '🚘'
    },
    {
      id: 4,
      name: 'Мото',
      price: '80₽',
      time: '1-2 мин',
      description: 'Быстро на мотоцикле',
      icon: Car,
      vehicle: '🏍️'
    }
  ];

  const nearbyTaxis = [
    { id: 1, type: 'economy', distance: '2 мин', coordinates: { lat: 55.7558, lng: 37.6176 }, driver: 'Иван К.', rating: 4.9 },
    { id: 2, type: 'comfort', distance: '3 мин', coordinates: { lat: 55.7539, lng: 37.6208 }, driver: 'Мария П.', rating: 4.8 },
    { id: 3, type: 'premium', distance: '1 мин', coordinates: { lat: 55.7580, lng: 37.6190 }, driver: 'Алексей В.', rating: 4.7 },
    { id: 4, type: 'moto', distance: '30 сек', coordinates: { lat: 55.7520, lng: 37.6140 }, driver: 'Денис М.', rating: 4.9 }
  ];

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command:', command);
    toast({
      title: "🎤 Голосовая команда",
      description: `Выполняю: ${command}`
    });
  };

  const handleOrderTaxi = (taxi: any) => {
    setSelectedTaxi(taxi.id);
    toast({
      title: "🚗 Такси заказано!",
      description: `${taxi.name} будет через ${taxi.time}`,
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 2025 Aurora Background */}
      <div className="fixed inset-0 pointer-events-none aurora-2025">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-orange-500/8 to-yellow-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Modern Header */}
      <div className="sticky top-0 z-50 glass-morphism-2025 border-b border-border/10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground rounded-xl w-10 h-10 p-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-foreground font-black text-lg gradient-text-2025">Такси</h1>
                  <p className="text-muted-foreground text-xs font-medium">Autonomous Transport</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMap(!showMap)}
                className="text-muted-foreground hover:text-primary rounded-xl w-10 h-10 p-0"
              >
                <Map className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAI(!showAI)}
                className="text-muted-foreground hover:text-primary rounded-xl w-10 h-10 p-0"
              >
                <Brain className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Assistant */}
      {showAI && (
        <div className="max-w-md mx-auto px-4 py-4 animate-slide-up-bounce-2025">
          <VoiceAssistant
            onCommand={handleVoiceCommand}
            prompt="Скажите куда поехать или выберите тариф"
            context="taxi"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* AI Autopilot Status */}
        <div className="card-2025 p-5 holographic-2025">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base gradient-text-2025">Автопилот</h3>
                <p className="text-xs text-muted-foreground">Автономные авто доступны</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-green-500">В сети</div>
              <div className="text-xs text-muted-foreground">24/7</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Zap className="w-4 h-4 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-bold">2 мин</div>
              <div className="text-xs text-muted-foreground">Подача</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Star className="w-4 h-4 text-purple-500 mx-auto mb-2" />
              <div className="text-sm font-bold">4.9★</div>
              <div className="text-xs text-muted-foreground">Рейтинг</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <TrendingUp className="w-4 h-4 text-green-500 mx-auto mb-2" />
              <div className="text-sm font-bold">15</div>
              <div className="text-xs text-muted-foreground">Доступно</div>
            </div>
          </div>
        </div>

        {/* Live Map */}
        {showMap && (
          <div className="card-2025 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base gradient-text-2025">Карта такси</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMap(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </Button>
            </div>
            <div className="w-full h-64 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center text-6xl relative overflow-hidden">
              🗺️
              {/* Имитация такси на карте */}
              <div className="absolute top-6 left-12 text-2xl animate-pulse" title="Эконом такси">🚗</div>
              <div className="absolute top-12 right-8 text-2xl animate-pulse" title="Комфорт такси">🚙</div>
              <div className="absolute bottom-12 left-8 text-2xl animate-pulse" title="Премиум такси">🚘</div>
              <div className="absolute bottom-6 right-12 text-2xl animate-pulse" title="Мото такси">🏍️</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full animate-pulse" title="Вы здесь" />
              {/* Маршрут */}
              <div className="absolute top-1/3 left-1/3 w-8 h-0.5 bg-blue-500 transform rotate-45" />
              <div className="absolute top-1/3 right-1/3 w-8 h-0.5 bg-blue-500 transform -rotate-45" />
            </div>
            <div className="flex items-center justify-between mt-3 text-sm">
              <div className="flex items-center gap-2">
                <Navigation className="w-3 h-3 text-blue-500" />
                <span className="text-muted-foreground">Маршрут</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-muted-foreground">Вы</span>
              </div>
            </div>
          </div>
        )}

        {/* Route Planning */}
        <div className="card-2025 p-5">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base gradient-text-2025">Маршрут</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <Input
                placeholder="Откуда"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="flex-1 h-12 rounded-2xl border-0 bg-secondary"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <Input
                placeholder="Куда"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="flex-1 h-12 rounded-2xl border-0 bg-secondary"
              />
            </div>
          </div>
        </div>

        {/* Taxi Options */}
        <div className="card-2025 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Car className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-base gradient-text-2025">Тарифы</h3>
          </div>
          
          <div className="space-y-3">
            {taxiOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOrderTaxi(option)}
                className={`card-2025 p-4 cursor-pointer hover:shadow-lg transition-all duration-300 magnetic-2025 ${
                  selectedTaxi === option.id ? 'ring-2 ring-primary/50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg">
                      {option.vehicle}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{option.name}</h3>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">{option.price}</div>
                    <div className="text-xs text-muted-foreground">{option.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Drivers */}
        <div className="card-2025 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Navigation className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-base gradient-text-2025">Ближайшие водители</h3>
          </div>
          
          <div className="space-y-3">
            {nearbyTaxis.map((taxi) => (
              <div key={taxi.id} className="card-2025 p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
                    🚗
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{taxi.driver}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-muted-foreground">{taxi.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-500">{taxi.distance}</div>
                  <div className="text-xs text-muted-foreground">до вас</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card-2025 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-base gradient-text-2025">Быстрые заказы</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-12 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-2xl">
              🏠 Домой
            </Button>
            <Button className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl">
              💼 На работу
            </Button>
          </div>
        </div>

        {/* System Status */}
        <div className="card-2025 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Все машины на линии</span>
            </div>
            <div className="text-xs text-green-600">
              {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taxi;
