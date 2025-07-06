
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Clock, DollarSign, Briefcase, Filter, Bookmark, Send, Star, Play, CheckCircle, Brain, Bot, Activity, Zap, TrendingUp, Globe2, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import VoiceAssistant from '@/components/VoiceAssistant';

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAI, setShowAI] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [isWorkerMode, setIsWorkerMode] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [showMap, setShowMap] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      coordinates: { lat: 55.7558, lng: 37.6176 }
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
      coordinates: { lat: 55.7539, lng: 37.6208 }
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
      coordinates: { lat: 55.7512, lng: 37.6156 }
    }
  ];

  const workers = [
    { id: 1, name: 'Иван К.', rating: 4.9, distance: '0.3 км', coordinates: { lat: 55.7580, lng: 37.6190 } },
    { id: 2, name: 'Мария П.', rating: 4.8, distance: '0.8 км', coordinates: { lat: 55.7520, lng: 37.6140 } },
    { id: 3, name: 'Алексей В.', rating: 4.7, distance: '1.1 км', coordinates: { lat: 55.7590, lng: 37.6220 } }
  ];

  const handleSaveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast({
        title: "💾 Удалено из сохраненных",
        description: "Заказ убран из избранного",
      });
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast({
        title: "⭐ Добавлено в избранное",
        description: "Заказ сохранен в избранном",
      });
    }
  };

  const handleTakeOrder = (job: any) => {
    setActiveOrder({ ...job, status: 'accepted', startTime: new Date() });
    toast({
      title: "🎉 Заказ принят!",
      description: `Вы взяли заказ "${job.title}"`,
    });
  };

  const handleStartWork = () => {
    if (activeOrder) {
      setActiveOrder({ ...activeOrder, status: 'in_progress', workStartTime: new Date() });
      toast({
        title: "🚀 Работа начата",
        description: "Время работы засекается",
      });
    }
  };

  const handleCompleteWork = () => {
    if (activeOrder) {
      setActiveOrder({ ...activeOrder, status: 'completed', completedTime: new Date() });
      toast({
        title: "✅ Работа завершена!",
        description: "Заказ отправлен клиенту на проверку",
      });
    }
  };

  const handleOrderCompleted = () => {
    if (activeOrder) {
      toast({
        title: "💰 Оплата получена!",
        description: `${activeOrder.rate} COSMO зачислено на ваш баланс`,
      });
      setActiveOrder(null);
    }
  };

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command:', command);
    toast({
      title: "🎤 Голосовая команда",
      description: `Выполняю: ${command}`
    });
  };

  const filteredJobs = hourlyJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 2025 Aurora Background */}
      <div className="fixed inset-0 pointer-events-none aurora-2025">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-500/8 to-indigo-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
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
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-foreground font-black text-lg gradient-text-2025">Cosmo Job</h1>
                  <p className="text-muted-foreground text-xs font-medium">Neural Job Matching</p>
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
            prompt="Скажите какую работу ищете или хотите предложить"
            context="jobs"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* AI Job Assistant */}
        <div className="card-2025 p-5 holographic-2025">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base gradient-text-2025">ИИ-Помощник</h3>
                <p className="text-xs text-muted-foreground">Умный подбор работы</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-green-500">Активен</div>
              <div className="text-xs text-muted-foreground">24/7</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Zap className="w-4 h-4 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-bold">1 мин</div>
              <div className="text-xs text-muted-foreground">Подбор</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Globe2 className="w-4 h-4 text-blue-500 mx-auto mb-2" />
              <div className="text-sm font-bold">5 км</div>
              <div className="text-xs text-muted-foreground">Радиус</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <TrendingUp className="w-4 h-4 text-green-500 mx-auto mb-2" />
              <div className="text-sm font-bold">95%</div>
              <div className="text-xs text-muted-foreground">Матчинг</div>
            </div>
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div className="card-2025 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base gradient-text-2025">Карта заказов</h3>
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
            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center text-6xl relative overflow-hidden">
              🗺️
              {/* Имитация точек на карте */}
              <div className="absolute top-4 left-8 w-3 h-3 bg-red-500 rounded-full animate-pulse" title="Заказ 1" />
              <div className="absolute top-12 right-12 w-3 h-3 bg-blue-500 rounded-full animate-pulse" title="Исполнитель 1" />
              <div className="absolute bottom-8 left-12 w-3 h-3 bg-red-500 rounded-full animate-pulse" title="Заказ 2" />
              <div className="absolute bottom-4 right-8 w-3 h-3 bg-blue-500 rounded-full animate-pulse" title="Исполнитель 2" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full animate-pulse" title="Вы здесь" />
            </div>
            <div className="flex items-center justify-between mt-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-muted-foreground">Заказы</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-muted-foreground">Исполнители</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-muted-foreground">Вы</span>
              </div>
            </div>
          </div>
        )}

        {/* Worker Mode Toggle */}
        <div className="card-2025 p-4">
          <div className="flex space-x-2">
            <Button
              onClick={() => setIsWorkerMode(false)}
              variant={!isWorkerMode ? 'default' : 'secondary'}
              className={`flex-1 h-12 rounded-2xl ${
                !isWorkerMode 
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Найти исполнителя
            </Button>
            <Button
              onClick={() => setIsWorkerMode(true)}
              variant={isWorkerMode ? 'default' : 'secondary'}
              className={`flex-1 h-12 rounded-2xl ${
                isWorkerMode 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Хочу поработать
            </Button>
          </div>
        </div>

        {/* Active Order Status */}
        {activeOrder && (
          <div className="card-2025 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base gradient-text-2025">Активный заказ</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeOrder.status === 'accepted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                activeOrder.status === 'in_progress' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
              }`}>
                {activeOrder.status === 'accepted' ? 'Принят' :
                 activeOrder.status === 'in_progress' ? 'В работе' : 'Завершен'}
              </span>
            </div>
            <p className="font-medium text-foreground mb-2">{activeOrder.title}</p>
            <p className="text-muted-foreground text-sm mb-4">{activeOrder.location}</p>
            
            {activeOrder.status === 'accepted' && (
              <Button 
                onClick={handleStartWork} 
                className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl"
              >
                <Play className="w-4 h-4 mr-2" />
                Приступить к работе
              </Button>
            )}
            
            {activeOrder.status === 'in_progress' && (
              <Button 
                onClick={handleCompleteWork} 
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Заказ выполнен
              </Button>
            )}
            
            {activeOrder.status === 'completed' && (
              <div className="space-y-3">
                <p className="text-center text-muted-foreground text-sm">Ожидание подтверждения клиента...</p>
                <Button 
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl"
                  onClick={handleOrderCompleted}
                >
                  Симулировать принятие клиентом
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Search */}
        <div className="card-2025 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base gradient-text-2025">Поиск</h3>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={isWorkerMode ? "Поиск заказов рядом..." : "Поиск исполнителей..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-2xl border-0 bg-secondary"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="card-2025 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-base gradient-text-2025">Категории</h3>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'secondary'}
                size="sm"
                className={`whitespace-nowrap rounded-2xl ${
                  selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white' 
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="card-2025 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base gradient-text-2025">
              {isWorkerMode ? 'Доступные заказы' : 'Найти исполнителя'}
            </h3>
            <span className="text-muted-foreground text-sm">{filteredJobs.length} заказов</span>
          </div>
          
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="card-2025 p-4 cursor-pointer hover:shadow-lg transition-all duration-300 magnetic-2025"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-foreground">{job.title}</h3>
                      {job.urgent && (
                        <span className="bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 text-red-800 dark:text-red-300 text-xs px-2 py-1 rounded-full">
                          Срочно
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground font-medium">{job.client}</p>
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">{job.rating}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveJob(job.id);
                    }}
                    className="p-1"
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
                    {job.rate} COSMO/час
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {job.duration}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-3">{job.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{job.distance} от вас</span>
                  {isWorkerMode ? (
                    <Button 
                      size="sm" 
                      onClick={() => handleTakeOrder(job)}
                      disabled={!!activeOrder}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Взять заказ
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => {
                        toast({
                          title: "🎉 Заказ создан!",
                          description: `Ищем ближайшего исполнителя для "${job.title}"`,
                        });
                      }}
                      className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-xl"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Заказать
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="card-2025 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Все системы работают</span>
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

export default Jobs;
