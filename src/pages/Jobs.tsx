
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Clock, DollarSign, Briefcase, Filter, Bookmark, Send, Star, Play, CheckCircle, User, UserCheck, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userMode, setUserMode] = useState<'select' | 'client' | 'worker'>('select');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [executorLocation, setExecutorLocation] = useState<{lat: number, lng: number} | null>(null);

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
            description: "Включите доступ к местоположению",
            variant: "destructive"
          });
        }
      );
    }
  }, []);

  // Симуляция движения исполнителя
  useEffect(() => {
    if (activeOrder && (activeOrder.status === 'accepted' || activeOrder.status === 'in_progress')) {
      const interval = setInterval(() => {
        setExecutorLocation(prev => {
          if (!prev || !currentLocation) return prev;
          
          const deltaLat = (currentLocation.lat - prev.lat) * 0.08;
          const deltaLng = (currentLocation.lng - prev.lng) * 0.08;
          
          return {
            lat: prev.lat + deltaLat,
            lng: prev.lng + deltaLng
          };
        });
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [activeOrder, currentLocation]);

  const categories = [
    { id: 'all', name: 'Все', icon: '💼' },
    { id: 'cleaning', name: 'Уборка', icon: '🧽' },
    { id: 'delivery', name: 'Доставка', icon: '🚚' },
    { id: 'repair', name: 'Ремонт', icon: '🔧' },
    { id: 'beauty', name: 'Красота', icon: '💅' },
    { id: 'tutoring', name: 'Репетиторство', icon: '📚' }
  ];

  const hourlyJobs = [
    {
      id: 1,
      title: 'Уборка квартиры',
      client: 'Анна П.',
      location: 'ул. Ленина, 15',
      rate: 500,
      duration: '2-3 часа',
      category: 'cleaning',
      distance: '0.5 км',
      rating: 4.8,
      description: 'Генеральная уборка 2-комнатной квартиры',
      urgent: true,
      coordinates: { lat: 0, lng: 0 }
    },
    {
      id: 2,
      title: 'Доставка документов',
      client: 'ООО "Бизнес"',
      location: 'БЦ Сити',
      rate: 300,
      duration: '1 час',
      category: 'delivery',
      distance: '1.2 км',
      rating: 4.9,
      description: 'Срочная доставка документов в банк',
      urgent: false,
      coordinates: { lat: 0.01, lng: 0.01 }
    },
    {
      id: 3,
      title: 'Ремонт крана',
      client: 'Михаил С.',
      location: 'ул. Победы, 22',
      rate: 800,
      duration: '1-2 часа',
      category: 'repair',
      distance: '2.1 км',
      rating: 4.7,
      description: 'Замена смесителя на кухне',
      urgent: false,
      coordinates: { lat: -0.01, lng: 0.01 }
    }
  ];

  const handleSaveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast({
        title: "Удалено из сохраненных",
        description: "Заказ убран из избранного",
      });
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast({
        title: "Добавлено в избранное",
        description: "Заказ сохранен в избранном",
      });
    }
  };

  const handleTakeOrder = (job: any) => {
    setActiveOrder({ 
      ...job, 
      status: 'accepted', 
      startTime: new Date(),
      executor: {
        name: 'Вы',
        rating: 4.9,
        phone: '+7 (999) 123-45-67'
      }
    });
    
    // Устанавливаем начальную позицию исполнителя
    if (currentLocation) {
      setExecutorLocation({
        lat: currentLocation.lat + 0.02,
        lng: currentLocation.lng + 0.02
      });
    }
    
    toast({
      title: "Заказ принят!",
      description: `Вы взяли заказ "${job.title}"`,
    });
  };

  const handleStartWork = () => {
    if (activeOrder) {
      setActiveOrder({ ...activeOrder, status: 'in_progress', workStartTime: new Date() });
      toast({
        title: "Работа начата",
        description: "Время работы засекается",
      });
    }
  };

  const handleCompleteWork = () => {
    if (activeOrder) {
      setActiveOrder({ ...activeOrder, status: 'completed', completedTime: new Date() });
      toast({
        title: "Работа завершена!",
        description: "Заказ отправлен клиенту на проверку",
      });
    }
  };

  const handleOrderCompleted = () => {
    if (activeOrder) {
      toast({
        title: "Оплата получена!",
        description: `${activeOrder.rate} ₽ зачислено на ваш баланс`,
      });
      setActiveOrder(null);
      setExecutorLocation(null);
    }
  };

  const filteredJobs = hourlyJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                  <h1 className="text-foreground font-black text-xl">CosmoJobs</h1>
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
                <h2 className="text-foreground font-bold text-2xl mb-3">Заказчик</h2>
                <p className="text-muted-foreground mb-6">Найти мастера для выполнения задач</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-blue-500/10 rounded-xl p-3 text-blue-400">
                    <Search className="w-4 h-4 mx-auto mb-1" />
                    <div>Быстрый поиск</div>
                  </div>
                  <div className="bg-green-500/10 rounded-xl p-3 text-green-400">
                    <Star className="w-4 h-4 mx-auto mb-1" />
                    <div>Лучшие мастера</div>
                  </div>
                </div>
              </div>
            </ModernCard>

            <ModernCard 
              variant="holographic"
              onClick={() => setUserMode('worker')}
              className="p-8 cursor-pointer group animate-scale-in-bounce magnetic-element"
              style={{animationDelay: '200ms'}}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-foreground font-bold text-2xl mb-3">Исполнитель</h2>
                <p className="text-muted-foreground mb-6">Выполнять заказы и зарабатывать деньги</p>
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

  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-32 w-48 h-48 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <div className="glass-morphism sticky top-0 z-10 border-b border-primary/20">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserMode('select')}
              className="text-foreground hover:bg-primary/10 rounded-2xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-foreground font-bold text-xl">
                {userMode === 'client' ? 'Найти мастера' : 'Поиск работы'}
              </h1>
              <p className="text-muted-foreground text-sm">
                {userMode === 'client' ? 'Заказать услуги' : 'Доступные заказы'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast({ title: "Фильтры", description: "Настройки поиска" })}
              className="text-foreground hover:bg-primary/10 rounded-2xl"
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground hover:bg-primary/10 rounded-2xl relative"
            >
              <Bookmark className="w-5 h-5" />
              {savedJobs.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {savedJobs.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 relative z-10">
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
            
            {/* Позиция исполнителя */}
            {executorLocation && (
              <div className="absolute top-1/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <Briefcase className="w-3 h-3 text-white" />
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
              </div>
            )}
            
            {/* Доступные заказы на карте */}
            {userMode === 'worker' && !activeOrder && filteredJobs.slice(0, 3).map((job, index) => (
              <div 
                key={job.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: `${30 + index * 15}%`,
                  left: `${25 + index * 20}%`
                }}
              >
                <div className="w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {job.rate}₽
                </div>
              </div>
            ))}
            
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 dark:bg-slate-800/90 rounded-xl p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">
                    {currentLocation ? 
                      (userMode === 'worker' ? `${filteredJobs.length} заказов рядом` : 'Мастера в вашем районе') : 
                      'Определяем местоположение...'
                    }
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

        {/* Активный заказ */}
        {activeOrder && (
          <ModernCard variant="holographic" className="p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-foreground font-semibold">
                {userMode === 'worker' ? 'Активный заказ' : 'Ваш заказ'}
              </h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                activeOrder.status === 'accepted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                activeOrder.status === 'in_progress' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
              }`}>
                {activeOrder.status === 'accepted' ? 'Принят' :
                 activeOrder.status === 'in_progress' ? 'В работе' : 'Завершен'}
              </span>
            </div>
            
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground font-semibold mb-1">{activeOrder.title}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{activeOrder.location}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-green-500" />
                    <span className="text-green-500 font-medium">{activeOrder.rate} ₽</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{activeOrder.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Информация об исполнителе/клиенте */}
            <div className="glass-morphism rounded-2xl p-4 border border-primary/20 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-foreground font-medium">
                    {userMode === 'worker' ? activeOrder.client : 'Исполнитель найден'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-yellow-600 text-sm">4.9</span>
                  </div>
                </div>
                {executorLocation && (
                  <div className="text-right">
                    <div className="text-primary font-medium">
                      {activeOrder.status === 'accepted' ? 'Едет к вам' : 'На месте'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activeOrder.status === 'accepted' ? '5 мин' : 'Работает'}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Действия */}
            <div className="flex gap-3">
              {activeOrder.status === 'accepted' && userMode === 'worker' && (
                <NeonButton onClick={handleStartWork} className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Приступить к работе
                </NeonButton>
              )}
              
              {activeOrder.status === 'in_progress' && userMode === 'worker' && (
                <NeonButton onClick={handleCompleteWork} className="flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Заказ выполнен
                </NeonButton>
              )}
              
              {activeOrder.status === 'completed' && (
                <div className="w-full space-y-2">
                  <p className="text-center text-muted-foreground text-sm">
                    {userMode === 'worker' ? 'Ожидание подтверждения клиента...' : 'Подтвердите выполнение работы'}
                  </p>
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white rounded-2xl"
                    onClick={handleOrderCompleted}
                  >
                    {userMode === 'worker' ? 'Симулировать принятие клиентом' : 'Подтвердить выполнение'}
                  </Button>
                </div>
              )}
              
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-2xl border-primary/30"
                onClick={() => toast({title: "Связь", description: "Звонок или чат"})}
              >
                <Phone className="w-4 h-4" />
              </Button>
            </div>
          </ModernCard>
        )}

        {/* Поиск */}
        {!activeOrder && (
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={userMode === 'worker' ? "Поиск заказов рядом..." : "Поиск мастеров..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-primary/30 focus:border-primary focus:ring-primary bg-transparent text-foreground rounded-2xl"
              />
            </div>
          </div>
        )}

        {/* Категории */}
        {!activeOrder && (
          <div className="mb-4">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <NeonButton
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                  size="sm"
                  className="whitespace-nowrap rounded-2xl"
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </NeonButton>
              ))}
            </div>
          </div>
        )}

        {/* Список заказов */}
        {!activeOrder && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground text-lg font-semibold">
                {userMode === 'worker' ? 'Доступные заказы' : 'Найти мастера'}
              </h3>
              <span className="text-muted-foreground text-sm">{filteredJobs.length} заказов</span>
            </div>
            
            {filteredJobs.map((job) => (
              <ModernCard
                key={job.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 magnetic-element"
                variant="glass"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-foreground font-semibold">{job.title}</h3>
                      {job.urgent && (
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs px-2 py-1 rounded">
                          Срочно
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground font-medium">{job.client}</p>
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-yellow-600 text-sm">{job.rating}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveJob(job.id);
                    }}
                    className="p-1 rounded-2xl"
                  >
                    <Bookmark 
                      className={`w-4 h-4 ${
                        savedJobs.includes(job.id) 
                          ? 'text-blue-500 fill-blue-500' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  </Button>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {job.rate} ₽/час
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {job.duration}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-3">{job.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{job.distance} от вас</span>
                  {userMode === 'worker' ? (
                    <NeonButton 
                      size="sm" 
                      variant="primary"
                      onClick={() => handleTakeOrder(job)}
                      className="rounded-2xl"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Взять заказ
                    </NeonButton>
                  ) : (
                    <NeonButton 
                      size="sm" 
                      variant="primary"
                      onClick={() => {
                        toast({
                          title: "Заказ создан!",
                          description: `Ищем ближайшего мастера для "${job.title}"`,
                        });
                      }}
                      className="rounded-2xl"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Заказать
                    </NeonButton>
                  )}
                </div>
              </ModernCard>
            ))}
          </div>
        )}

        {/* Статистика для исполнителя */}
        {userMode === 'worker' && !activeOrder && (
          <ModernCard variant="glass" className="p-4 mt-6">
            <h3 className="text-foreground font-semibold mb-4">Ваша статистика</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">₽2,450</div>
                <div className="text-xs text-muted-foreground">Заработано</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">12</div>
                <div className="text-xs text-muted-foreground">Заказов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4.9</div>
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  Рейтинг
                </div>
              </div>
            </div>
          </ModernCard>
        )}
      </div>
    </div>
  );
};

export default Jobs;
