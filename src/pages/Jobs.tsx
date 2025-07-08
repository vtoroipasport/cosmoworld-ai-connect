import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MapPin, Clock, Star, Search, Briefcase, User, UserCheck, Phone, MessageCircle, Navigation, Route, Shield, CreditCard, DollarSign, Calendar, Heart, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ServicePageLayout from '@/components/ServicePageLayout';
import Map from '@/components/Map';

interface Specialist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  hourlyRate: number;
  distance: string;
  time: string;
  lat: number;
  lng: number;
  available: boolean;
}

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userType, setUserType] = useState<'client' | 'specialist'>('client');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [specialtySearch, setSpecialtySearch] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [isJobActive, setIsJobActive] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [jobEstimate, setJobEstimate] = useState<{ duration: string; rate: number; total: number } | null>(null);
  const [jobStatus, setJobStatus] = useState<'searching' | 'found' | 'arriving' | 'working' | 'completed'>('searching');
  const [currentJobStep, setCurrentJobStep] = useState(0);

  const hourlySpecialists: Specialist[] = [
    {
      id: '1',
      name: 'Анна Петрова',
      specialty: 'Уборщица',
      rating: 4.9,
      experience: '3 года',
      hourlyRate: 800,
      distance: '2 км',
      time: '10-15 мин',
      lat: 55.7558 + Math.random() * 0.01,
      lng: 37.6173 + Math.random() * 0.01,
      available: true
    },
    {
      id: '2',
      name: 'Игорь Сидоров',
      specialty: 'Сантехник',
      rating: 4.8,
      experience: '7 лет',
      hourlyRate: 1500,
      distance: '1.5 км',
      time: '8-12 мин',
      lat: 55.7558 + Math.random() * 0.01,
      lng: 37.6173 + Math.random() * 0.01,
      available: true
    },
    {
      id: '3',
      name: 'Мария Козлова',
      specialty: 'Электрик',
      rating: 4.7,
      experience: '5 лет',
      hourlyRate: 1800,
      distance: '3 км',
      time: '15-20 мин',
      lat: 55.7558 + Math.random() * 0.01,
      lng: 37.6173 + Math.random() * 0.01,
      available: true
    },
    {
      id: '4',
      name: 'Дмитрий Волков',
      specialty: 'Мастер на час',
      rating: 4.6,
      experience: '4 года',
      hourlyRate: 1200,
      distance: '2.5 км',
      time: '12-18 мин',
      lat: 55.7558 + Math.random() * 0.01,
      lng: 37.6173 + Math.random() * 0.01,
      available: true
    },
    {
      id: '5',
      name: 'Елена Новикова',
      specialty: 'Репетитор математики',
      rating: 4.9,
      experience: '6 лет',
      hourlyRate: 2000,
      distance: '1 км',
      time: '5-10 мин',
      lat: 55.7558 + Math.random() * 0.01,
      lng: 37.6173 + Math.random() * 0.01,
      available: true
    },
    {
      id: '6',
      name: 'Сергей Морозов',
      specialty: 'Грузчик',
      rating: 4.5,
      experience: '2 года',
      hourlyRate: 600,
      distance: '4 км',
      time: '20-25 мин',
      lat: 55.7558 + Math.random() * 0.01,
      lng: 37.6173 + Math.random() * 0.01,
      available: true
    }
  ];

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Fallback to Moscow coordinates
          setUserLocation({ lat: 55.7558, lng: 37.6173 });
        }
      );
    } else {
      setUserLocation({ lat: 55.7558, lng: 37.6173 });
    }
  }, []);

  const handleRequestSpecialist = () => {
    if (!pickupLocation || !specialtySearch) {
      toast({
        title: "Ошибка",
        description: "Укажите адрес и тип специалиста",
        variant: "destructive",
      });
      return;
    }

    // Calculate estimate
    const estimate = {
      duration: '2 часа',
      rate: Math.floor(Math.random() * 1000) + 800,
      total: (Math.floor(Math.random() * 1000) + 800) * 2
    };
    setJobEstimate(estimate);
    setJobStatus('searching');

    toast({
      title: "Поиск специалистов",
      description: "Ищем ближайших специалистов...",
    });

    // Simulate finding specialists
    setTimeout(() => {
      setJobStatus('found');
    }, 2000);
  };

  const handleSelectSpecialist = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
    setIsJobActive(true);
    setJobStatus('arriving');
    setCurrentJobStep(0);
    
    toast({
      title: "Специалист найден",
      description: `${specialist.name} уже едет к вам!`,
    });

    // Simulate job progress
    const steps = ['arriving', 'working', 'completed'];
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setJobStatus(steps[stepIndex] as any);
        setCurrentJobStep(stepIndex);
        
        if (steps[stepIndex] === 'working') {
          toast({
            title: "Работа началась",
            description: "Специалист приступил к выполнению работы",
          });
        } else if (steps[stepIndex] === 'completed') {
          toast({
            title: "Работа завершена",
            description: "Специалист завершил работу",
          });
          setTimeout(() => {
            setIsJobActive(false);
            setSelectedSpecialist(null);
            setJobStatus('searching');
            setCurrentJobStep(0);
          }, 3000);
        }
      } else {
        clearInterval(interval);
      }
    }, 10000);
  };

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    toast({
      title: isOnline ? "Вы оффлайн" : "Вы онлайн",
      description: isOnline ? "Заказы не поступают" : "Можете принимать заказы",
    });
  };

  return (
    <ServicePageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
            <h1 className="text-xl font-bold">Cosmo Специалисты</h1>
            <div></div>
          </div>

          {/* User Type Selection */}
          <Card className="mb-6 p-4">
            <h2 className="text-lg font-semibold mb-4">Выберите режим</h2>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'client' | 'specialist')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Клиент
                </TabsTrigger>
                <TabsTrigger value="specialist" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Специалист
                </TabsTrigger>
              </TabsList>

              {/* Client Mode */}
              <TabsContent value="client" className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-4">Заказать специалиста</h3>
                  
                  {/* Map */}
                  <div className="mb-4">
                    <Map 
                      userLocation={userLocation}
                      specialists={hourlySpecialists}
                      onLocationSelect={(location) => {
                        if (!pickupLocation) {
                          setPickupLocation(location.address);
                        }
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <Input
                        placeholder="Адрес работы"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-green-500" />
                      <Input
                        placeholder="Тип специалиста (уборщица, сантехник, электрик)"
                        value={specialtySearch}
                        onChange={(e) => setSpecialtySearch(e.target.value)}
                      />
                    </div>
                    
                    {/* Job Estimate */}
                    {jobEstimate && (
                      <Card className="p-3 bg-blue-50 dark:bg-blue-900/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">{jobEstimate.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">{jobEstimate.rate} ₽/час</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-bold">{jobEstimate.total} ₽</span>
                          </div>
                        </div>
                      </Card>
                    )}
                    
                    <Button 
                      className="w-full" 
                      onClick={handleRequestSpecialist}
                      disabled={!pickupLocation || !specialtySearch}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      {jobStatus === 'searching' ? 'Найти специалистов' : 'Поиск...'}
                    </Button>
                  </div>
                </Card>

                {/* Available Specialists */}
                {jobStatus === 'found' && pickupLocation && specialtySearch && !isJobActive && (
                  <Card className="p-4">
                    <h3 className="font-semibold mb-4">Доступные специалисты</h3>
                    <div className="space-y-3">
                      {hourlySpecialists.map((specialist) => (
                        <div 
                          key={specialist.id}
                          className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => handleSelectSpecialist(specialist)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {specialist.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{specialist.name}</div>
                              <div className="text-sm text-gray-600">{specialist.specialty}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {specialist.rating} • {specialist.experience}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{specialist.hourlyRate} ₽/час</div>
                            <div className="text-sm text-gray-500">{specialist.distance}</div>
                            <div className="text-xs text-green-600">Прибытие: {specialist.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                
                {/* Job Status Progress */}
                {jobStatus === 'searching' && pickupLocation && specialtySearch && (
                  <Card className="p-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-700 dark:text-blue-300">Поиск специалистов</h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400">Ищем ближайших специалистов в вашем районе...</p>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Active Job */}
                {isJobActive && selectedSpecialist && (
                  <Card className="p-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                    {/* Job Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Статус заказа</span>
                        <span className="text-sm text-green-600">
                          {jobStatus === 'arriving' && 'Специалист едет к вам'}
                          {jobStatus === 'working' && 'Выполняется работа'}
                          {jobStatus === 'completed' && 'Работа завершена'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: jobStatus === 'arriving' ? '33%' : 
                                   jobStatus === 'working' ? '66%' : 
                                   jobStatus === 'completed' ? '100%' : '0%' 
                          }}
                        ></div>
                      </div>
                    </div>

                    <h3 className="font-semibold mb-4 text-green-700 dark:text-green-300">
                      {jobStatus === 'completed' ? 'Работа завершена' : 'Активный заказ'}
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Specialist Info */}
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {selectedSpecialist.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{selectedSpecialist.name}</div>
                            <div className="text-sm text-gray-600">{selectedSpecialist.specialty}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {selectedSpecialist.rating} • {selectedSpecialist.experience}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-500">Время</div>
                          <div className="font-medium">{selectedSpecialist.time}</div>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-500">Тариф</div>
                          <div className="font-medium">{selectedSpecialist.hourlyRate} ₽/час</div>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-500">Расстояние</div>
                          <div className="font-medium">{selectedSpecialist.distance}</div>
                        </div>
                      </div>

                      {/* Address Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{pickupLocation}</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                          <Search className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{specialtySearch}</span>
                        </div>
                      </div>

                      {jobStatus === 'completed' && (
                        <div className="text-center">
                          <Button className="w-full" onClick={() => {
                            setIsJobActive(false);
                            setSelectedSpecialist(null);
                            setJobStatus('searching');
                            setPickupLocation('');
                            setSpecialtySearch('');
                            setJobEstimate(null);
                          }}>
                            Заказать нового специалиста
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </TabsContent>

              {/* Specialist Mode */}
              <TabsContent value="specialist" className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-4">Режим специалиста</h3>
                  
                  {/* Specialist Status */}
                  <div className="mb-4">
                    <Button 
                      className={`w-full ${isOnline ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                      onClick={handleToggleOnline}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      {isOnline ? 'В сети - Принимаю заказы' : 'Оффлайн - Не принимаю заказы'}
                    </Button>
                  </div>

                  {/* Map for Specialist */}
                  <div className="mb-4">
                    <Map 
                      userLocation={userLocation}
                      specialists={hourlySpecialists}
                    />
                  </div>

                  {/* Specialist Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">23</div>
                      <div className="text-sm text-gray-500">Заказы</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">4.8</div>
                      <div className="text-sm text-gray-500">Рейтинг</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">12,500₽</div>
                      <div className="text-sm text-gray-500">Заработок</div>
                    </div>
                  </div>
                </Card>

                {/* Incoming Orders (when online) */}
                {isOnline && (
                  <Card className="p-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                    <h3 className="font-semibold mb-4 text-blue-700 dark:text-blue-300">Новый заказ</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">ул. Новый Арбат, 15</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Требуется электрик</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">1,500 ₽/час • 2-3 часа</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Отклонить</Button>
                          <Button size="sm">Принять</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </Card>

          {/* Additional Options */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Дополнительно</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Оплата
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Безопасность
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                История
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Премиум
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default Jobs;