import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Navigation, Clock, Wrench, Star, Phone, Zap, 
  Shield, Sparkles, User, UserCheck, DollarSign, Search, Filter,
  Briefcase, Home, Car as CarIcon, UtensilsCrossed, Hammer, 
  PaintBucket, Scissors, ShoppingBag, Heart, Baby, GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
import FloatingActionButton from '@/components/FloatingActionButton';

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isWorkStarted, setIsWorkStarted] = useState(false);
  const [rideStatus, setRideStatus] = useState<'idle' | 'searching' | 'found' | 'in_work' | 'completed'>('idle');
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);

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

  const categories = [
    { id: 'all', name: 'Все', icon: Briefcase },
    { id: 'home', name: 'Дом', icon: Home },
    { id: 'transport', name: 'Транспорт', icon: CarIcon },
    { id: 'food', name: 'Еда', icon: UtensilsCrossed },
    { id: 'repair', name: 'Ремонт', icon: Hammer },
    { id: 'design', name: 'Дизайн', icon: PaintBucket },
    { id: 'beauty', name: 'Красота', icon: Scissors },
    { id: 'shopping', name: 'Покупки', icon: ShoppingBag },
    { id: 'health', name: 'Здоровье', icon: Heart },
    { id: 'childcare', name: 'Дети', icon: Baby },
    { id: 'education', name: 'Образование', icon: GraduationCap },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Сантехник',
      category: 'home',
      description: 'Устранение засоров, установка сантехники',
      price: 1500,
      location: 'ул. Пушкина, 10',
      rating: 4.8,
      reviews: 25,
      distance: '1.2 км',
      skills: ['сантехника', 'устранение засоров', 'установка'],
      experience: '3 года',
      worker: {
        id: 101,
        name: 'Иван Петров',
        avatar: 'https://images.unsplash.com/photo-1570295999680-0b9740a8ca86?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        skill: 'Сантехник',
        experience: '5 лет'
      }
    },
    {
      id: 2,
      title: 'Электрик',
      category: 'home',
      description: 'Ремонт проводки, установка розеток',
      price: 2000,
      location: 'пр. Ленина, 5',
      rating: 4.5,
      reviews: 18,
      distance: '0.8 км',
      skills: ['электрика', 'ремонт проводки', 'розетки'],
       experience: '2 года',
      worker: {
        id: 102,
        name: 'Мария Смирнова',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b88360?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        skill: 'Электрик',
        experience: '3 года'
      }
    },
    {
      id: 3,
      title: 'Мастер по ремонту',
      category: 'repair',
      description: 'Мелкий бытовой ремонт',
      price: 1200,
      location: 'ул. Гагарина, 22',
      rating: 4.7,
      reviews: 32,
      distance: '2.1 км',
      skills: ['мелкий ремонт', 'бытовой ремонт'],
       experience: '1 год',
      worker: {
        id: 103,
        name: 'Сергей Иванов',
        avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        skill: 'Мастер',
        experience: '4 года'
      }
    },
    {
      id: 4,
      title: 'Парикмахер на дом',
      category: 'beauty',
      description: 'Стрижки, укладки, окрашивание',
      price: 1800,
      location: 'ул. Кирова, 8',
      rating: 4.9,
      reviews: 45,
      distance: '1.5 км',
      skills: ['стрижки', 'укладки', 'окрашивание'],
       experience: '4 года',
      worker: {
        id: 104,
        name: 'Елена Кузнецова',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d674c8e?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        skill: 'Парикмахер',
        experience: '2 года'
      }
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const searchMatch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = categoryFilter === 'all' || job.category === categoryFilter;
    return searchMatch && categoryMatch;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const activeWorker = {
    id: 101,
    name: 'Иван Петров',
    avatar: 'https://images.unsplash.com/photo-1570295999680-0b9740a8ca86?w=100&h=100&fit=crop&crop=face',
    rating: 4.9,
    skill: 'Сантехник',
    experience: '5 лет'
  };

  const handleFindWorker = () => {
    setRideStatus('searching');
    toast({
      title: "🔍 Ищем исполнителя",
      description: "Подбираем ближайшего исполнителя...",
    });

    setTimeout(() => {
      setRideStatus('found');
      toast({
        title: "✅ Исполнитель найден!",
        description: `${activeWorker.name} прибудет через 15 минут`,
      });
    }, 3000);
  };

  const handleStartWork = () => {
    setRideStatus('in_work');
    setIsWorkStarted(true);
    toast({
      title: "🛠️ Работа началась",
      description: "Приступаем к выполнению задачи!",
    });
  };

  const handleCompleteWork = () => {
    setRideStatus('completed');
    toast({
      title: "🎉 Работа завершена",
      description: "Задача успешно выполнена!",
    });

    setTimeout(() => {
      setRideStatus('idle');
      setIsWorkStarted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-32 w-48 h-48 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-md mx-auto px-6 py-8 relative z-10">
        <div className="glass-morphism sticky top-0 z-50 border-b border-primary/20 -mx-6 px-6 py-4 mb-6">
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
                <p className="text-muted-foreground text-sm">Поиск работы и услуг</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Поиск работы или услуги..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-morphism border-primary/30 focus:border-primary focus:ring-primary bg-transparent text-foreground rounded-2xl pl-12"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="rounded-2xl"
            >
              <Filter className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
          </div>

          {/* Filter Options */}
          {isFilterOpen && (
            <ModernCard variant="glass" className="p-4 mb-4">
              <div className="space-y-3">
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Категория</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <Button
                        key={category.id}
                        variant={categoryFilter === category.id ? 'default' : 'outline'}
                        size="sm"
                        className="rounded-2xl"
                        onClick={() => setCategoryFilter(category.id)}
                      >
                        <category.icon className="w-4 h-4 mr-2" />
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Сортировать</h4>
                  <div className="flex gap-2">
                    <Button
                      variant={sortBy === 'relevance' ? 'default' : 'outline'}
                      size="sm"
                      className="rounded-2xl"
                      onClick={() => setSortBy('relevance')}
                    >
                      По релевантности
                    </Button>
                    <Button
                      variant={sortBy === 'price' ? 'default' : 'outline'}
                      size="sm"
                      className="rounded-2xl"
                      onClick={() => setSortBy('price')}
                    >
                      По цене
                    </Button>
                    <Button
                      variant={sortBy === 'rating' ? 'default' : 'outline'}
                      size="sm"
                      className="rounded-2xl"
                      onClick={() => setSortBy('rating')}
                    >
                      По рейтингу
                    </Button>
                  </div>
                </div>
              </div>
            </ModernCard>
          )}
        </div>

        {/* Job Listings */}
        {rideStatus === 'idle' && (
          <div className="space-y-4 mb-6">
            {sortedJobs.map(job => (
              <ModernCard key={job.id} variant="glass" className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-foreground font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground text-sm">{job.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-foreground font-bold">{job.price} ₽</div>
                    <div className="text-xs text-muted-foreground">{job.distance}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-yellow-600 font-bold">{job.rating}</span>
                    <span className="text-muted-foreground">({job.reviews})</span>
                  </div>
                  <NeonButton size="sm" onClick={handleFindWorker}>
                    Найти исполнителя
                  </NeonButton>
                </div>
              </ModernCard>
            ))}
          </div>
        )}

        {/* Ride Status */}
        {rideStatus !== 'idle' && (
          <ModernCard variant="holographic" className="p-6 mb-6">
            <div className="text-center">
              {rideStatus === 'searching' && (
                <>
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                  <h3 className="text-foreground font-bold text-xl mb-2">Ищем исполнителя</h3>
                  <p className="text-muted-foreground">Подбираем ближайшего исполнителя...</p>
                </>
              )}
              
              {rideStatus === 'found' && (
                <>
                  <div className="w-20 h-20 rounded-3xl overflow-hidden mx-auto mb-4 border-4 border-green-500">
                    <img 
                      src={activeWorker.avatar} 
                      alt={activeWorker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-foreground font-bold text-xl mb-1">{activeWorker.name}</h3>
                  <p className="text-muted-foreground mb-2">{activeWorker.skill} • Опыт {activeWorker.experience}</p>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-yellow-600 font-bold">{activeWorker.rating}</span>
                  </div>
                  <div className="glass-morphism rounded-2xl p-4 border border-green-500/30 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-bold">Исполнитель едет к вам</span>
                      <span className="text-green-400 font-bold">15 мин</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-2xl border-primary/30"
                      onClick={() => toast({title: "Звонок", description: `Звоним ${activeWorker.name}`})}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Позвонить
                    </Button>
                    <NeonButton 
                      onClick={handleStartWork}
                      className="flex-1"
                    >
                      Начать работу
                    </NeonButton>
                  </div>
                </>
              )}

              {rideStatus === 'in_work' && (
                <>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Wrench className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-foreground font-bold text-xl mb-2">В процессе</h3>
                  <p className="text-muted-foreground mb-4">Работа выполняется...</p>
                  <NeonButton
                    onClick={handleCompleteWork}
                    variant="primary"
                    className="w-full"
                    disabled={!isWorkStarted}
                  >
                    Завершить работу
                  </NeonButton>
                </>
              )}

              {rideStatus === 'completed' && (
                <>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-foreground font-bold text-xl mb-2">Работа завершена!</h3>
                  <p className="text-muted-foreground mb-4">
                    Оплата: {jobs[0].price} ₽
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-2xl">
                      <Star className="w-4 h-4 mr-2" />
                      Оценить
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-2xl">
                      Повторить заказ
                    </Button>
                  </div>
                </>
              )}
            </div>
          </ModernCard>
        )}
      </div>
    </div>
  );
};

export default Jobs;
