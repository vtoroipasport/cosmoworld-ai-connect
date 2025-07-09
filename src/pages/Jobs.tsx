import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MapPin, Clock, Star, Search, Briefcase, User, UserCheck, Heart, Filter, DollarSign, Calendar, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ServicePageLayout from '@/components/ServicePageLayout';
import Map from '@/components/Map';

interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  distance: string;
  time: string;
  rating: number;
  lat: number;
  lng: number;
  urgent: boolean;
}

interface Specialist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  rate: string;
  distance: string;
  lat: number;
  lng: number;
  available: boolean;
}

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userType, setUserType] = useState<'seeker' | 'employer'>('seeker');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [isOnline, setIsOnline] = useState(false);

  const mockJobs: JobOffer[] = [
    {
      id: '1',
      title: 'Python разработчик',
      company: 'Яндекс',
      location: 'Москва, БЦ Аврора',
      type: 'Полная занятость',
      salary: '180,000 - 250,000 ₽',
      distance: '15 мин',
      time: 'Сегодня 14:00',
      rating: 4.8,
      lat: 55.7558 + Math.random() * 0.02,
      lng: 37.6173 + Math.random() * 0.02,
      urgent: true
    },
    {
      id: '2',
      title: 'Дизайнер UX/UI',
      company: 'Сбер',
      location: 'Москва, Сити',
      type: 'Удаленно',
      salary: '120,000 - 180,000 ₽',
      distance: '25 мин',
      time: 'Завтра 10:00',
      rating: 4.9,
      lat: 55.7558 + Math.random() * 0.02,
      lng: 37.6173 + Math.random() * 0.02,
      urgent: false
    },
    {
      id: '3',
      title: 'Курьер',
      company: 'Delivery Club',
      location: 'Москва, Центр',
      type: 'Гибкий график',
      salary: '2,000 ₽ за смену',
      distance: '5 мин',
      time: 'Сейчас',
      rating: 4.6,
      lat: 55.7558 + Math.random() * 0.02,
      lng: 37.6173 + Math.random() * 0.02,
      urgent: true
    }
  ];

  const mockSpecialists: Specialist[] = [
    {
      id: '1',
      name: 'Анна Смирнова',
      specialty: 'Frontend разработчик',
      rating: 4.9,
      experience: '5 лет',
      rate: '3,000 ₽/час',
      distance: '10 мин',
      lat: 55.7558 + Math.random() * 0.02,
      lng: 37.6173 + Math.random() * 0.02,
      available: true
    },
    {
      id: '2',
      name: 'Игорь Петров',
      specialty: 'Электрик',
      rating: 4.7,
      experience: '8 лет',
      rate: '1,500 ₽/час',
      distance: '15 мин',
      lat: 55.7558 + Math.random() * 0.02,
      lng: 37.6173 + Math.random() * 0.02,
      available: true
    },
    {
      id: '3',
      name: 'Мария Козлова',
      specialty: 'Репетитор английского',
      rating: 4.8,
      experience: '3 года',
      rate: '2,000 ₽/час',
      distance: '8 мин',
      lat: 55.7558 + Math.random() * 0.02,
      lng: 37.6173 + Math.random() * 0.02,
      available: true
    }
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          setUserLocation({ lat: 55.7558, lng: 37.6173 });
        }
      );
    } else {
      setUserLocation({ lat: 55.7558, lng: 37.6173 });
    }
  }, []);

  const handleSearch = () => {
    if (!searchTerm) {
      toast({
        title: "Ошибка",
        description: "Введите ключевое слово для поиска",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Поиск",
      description: `Поиск по запросу "${searchTerm}" в радиусе 25 км`,
    });
  };

  const handleApplyJob = (job: JobOffer) => {
    toast({
      title: "Заявка отправлена",
      description: `Ваша заявка на вакансию "${job.title}" отправлена`,
    });
  };

  const handleHireSpecialist = (specialist: Specialist) => {
    toast({
      title: "Заказ оформлен",
      description: `Заказ услуги "${specialist.specialty}" оформлен`,
    });
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-indigo-900 dark:to-blue-900">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
            <h1 className="text-xl font-bold">Cosmo Jobs</h1>
            <div></div>
          </div>

          {/* User Type Selection */}
          <Card className="mb-6 p-4">
            <h2 className="text-lg font-semibold mb-4">Выберите режим</h2>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'seeker' | 'employer')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="seeker" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Ищу работу
                </TabsTrigger>
                <TabsTrigger value="employer" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Ищу специалиста
                </TabsTrigger>
              </TabsList>

              {/* Job Seeker Mode */}
              <TabsContent value="seeker" className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-4">Поиск работы</h3>
                  
                  {/* Map */}
                  <div className="mb-4">
                    <Map 
                      userLocation={userLocation}
                      drivers={mockJobs.map(job => ({
                        id: job.id,
                        name: job.title,
                        rating: job.rating,
                        distance: job.distance,
                        lat: job.lat,
                        lng: job.lng
                      }))}
                      onLocationSelect={(location) => {
                        setLocation(location.address);
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Специальность (например, Python)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Button onClick={handleSearch}>
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Район города (необязательно)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </Card>

                {/* Available Jobs */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-4">Доступные вакансии</h3>
                  <div className="space-y-3">
                    {mockJobs.map((job) => (
                      <div 
                        key={job.id}
                        className="p-3 border rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{job.title}</h4>
                              {job.urgent && (
                                <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-xs font-medium">
                                  Срочно
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">{job.company}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {job.time}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{job.salary}</div>
                            <div className="text-sm text-gray-500">{job.distance}</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{job.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleApplyJob(job)}
                        >
                          Откликнуться
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Employer Mode */}
              <TabsContent value="employer" className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-4">Поиск специалистов</h3>
                  
                  {/* Status Toggle */}
                  <div className="mb-4">
                    <Button 
                      className={`w-full ${isOnline ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                      onClick={handleToggleOnline}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      {isOnline ? 'Активно ищу - Принимаю отклики' : 'Пассивный поиск'}
                    </Button>
                  </div>

                  {/* Map */}
                  <div className="mb-4">
                    <Map 
                      userLocation={userLocation}
                      drivers={mockSpecialists.map(specialist => ({
                        id: specialist.id,
                        name: specialist.specialty,
                        rating: specialist.rating,
                        distance: specialist.distance,
                        lat: specialist.lat,
                        lng: specialist.lng
                      }))}
                    />
                  </div>

                  <div className="space-y-3">
                    <Input
                      placeholder="Специальность (электрик, программист, дизайнер)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button className="w-full" onClick={handleSearch}>
                      <Search className="w-4 h-4 mr-2" />
                      Найти специалистов
                    </Button>
                  </div>
                </Card>

                {/* Available Specialists */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-4">Доступные специалисты</h3>
                  <div className="space-y-3">
                    {mockSpecialists.map((specialist) => (
                      <div 
                        key={specialist.id}
                        className="p-3 border rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                              {specialist.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{specialist.name}</div>
                              <div className="text-sm text-gray-600">{specialist.specialty}</div>
                              <div className="text-sm text-gray-500">Опыт: {specialist.experience}</div>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{specialist.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{specialist.rate}</div>
                            <div className="text-sm text-gray-500">{specialist.distance}</div>
                            {specialist.available && (
                              <span className="text-xs text-green-600 font-medium">Свободен</span>
                            )}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleHireSpecialist(specialist)}
                        >
                          Заказать услугу
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Active Requests */}
                {isOnline && (
                  <Card className="p-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                    <h3 className="font-semibold mb-4 text-blue-700 dark:text-blue-300">Новый отклик</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Сергей Волков</div>
                          <div className="text-sm text-gray-600">Backend разработчик</div>
                          <div className="text-sm text-gray-500">5 лет опыта • 4.9 ⭐</div>
                        </div>
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
                <DollarSign className="w-4 h-4" />
                Зарплата
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                График
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Избранное
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Рейтинг
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default Jobs;