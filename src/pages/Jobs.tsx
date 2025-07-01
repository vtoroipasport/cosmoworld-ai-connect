import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Clock, DollarSign, Briefcase, Filter, Bookmark, Send, Star, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [isWorkerMode, setIsWorkerMode] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any>(null);

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
      urgent: true
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
      urgent: false
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
      urgent: false
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
    setActiveOrder({ ...job, status: 'accepted', startTime: new Date() });
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
        description: `${activeOrder.rate} COSMO зачислено на ваш баланс`,
      });
      setActiveOrder(null);
    }
  };

  const filteredJobs = hourlyJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="glass-card border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95">
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
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">CosmoJobs</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast({ title: "Фильтры", description: "Функция в разработке" })}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/saved-jobs')}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
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

      {/* Worker Mode Toggle */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex space-x-2">
          <NeonButton
            onClick={() => setIsWorkerMode(false)}
            variant={!isWorkerMode ? 'primary' : 'secondary'}
            className="flex-1"
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Найти исполнителя
          </NeonButton>
          <NeonButton
            onClick={() => setIsWorkerMode(true)}
            variant={isWorkerMode ? 'primary' : 'secondary'}
            className="flex-1"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Хочу поработать
          </NeonButton>
        </div>
      </div>

      {/* Active Order Status */}
      {activeOrder && (
        <div className="max-w-md mx-auto px-4 pb-4">
          <ModernCard className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-900 dark:text-white font-semibold">Активный заказ</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                activeOrder.status === 'accepted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                activeOrder.status === 'in_progress' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
              }`}>
                {activeOrder.status === 'accepted' ? 'Принят' :
                 activeOrder.status === 'in_progress' ? 'В работе' : 'Завершен'}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{activeOrder.title}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{activeOrder.location}</p>
            
            {activeOrder.status === 'accepted' && (
              <NeonButton onClick={handleStartWork} className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Приступить к работе
              </NeonButton>
            )}
            
            {activeOrder.status === 'in_progress' && (
              <NeonButton onClick={handleCompleteWork} className="w-full">
                <CheckCircle className="w-4 h-4 mr-2" />
                Заказ выполнен
              </NeonButton>
            )}
            
            {activeOrder.status === 'completed' && (
              <div className="space-y-2">
                <p className="text-center text-gray-700 dark:text-gray-300 text-sm">Ожидание подтверждения клиента...</p>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600"
                  onClick={handleOrderCompleted}
                >
                  Симулировать принятие клиентом
                </Button>
              </div>
            )}
          </ModernCard>
        </div>
      )}

      {/* Search */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
          <Input
            placeholder={isWorkerMode ? "Поиск заказов рядом..." : "Поиск исполнителей..."}
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

      {/* Jobs List */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
            {isWorkerMode ? 'Доступные заказы' : 'Найти исполнителя'}
          </h3>
          <span className="text-gray-600 dark:text-gray-300 text-sm">{filteredJobs.length} заказов</span>
        </div>
        
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <ModernCard
              key={job.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-gray-900 dark:text-white font-semibold">{job.title}</h3>
                    {job.urgent && (
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs px-2 py-1 rounded">
                        Срочно
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{job.client}</p>
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-yellow-600 dark:text-yellow-400 text-sm">{job.rating}</span>
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
                        : 'text-gray-400 dark:text-gray-500'
                    }`} 
                  />
                </Button>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
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

              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{job.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{job.distance} от вас</span>
                {isWorkerMode ? (
                  <NeonButton 
                    size="sm" 
                    variant="primary"
                    onClick={() => handleTakeOrder(job)}
                    disabled={!!activeOrder}
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
                        description: `Ищем ближайшего исполнителя для "${job.title}"`,
                      });
                    }}
                  >
                    <Send className="w-3 h-3 mr-1" />
                    Заказать
                  </NeonButton>
                )}
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Balance Warning for Cash Orders */}
      {isWorkerMode && (
        <div className="max-w-md mx-auto px-4 pb-6">
          <ModernCard className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700">
            <div className="text-center">
              <h3 className="text-gray-900 dark:text-white font-semibold mb-2">Баланс для наличных заказов</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Для принятия заказов с оплатой наличными необходимо иметь на балансе минимум $10 для оплаты комиссии сервиса (10%)
              </p>
              <NeonButton variant="primary" size="sm">
                Пополнить баланс
              </NeonButton>
            </div>
          </ModernCard>
        </div>
      )}
    </div>
  );
};

export default Jobs;
