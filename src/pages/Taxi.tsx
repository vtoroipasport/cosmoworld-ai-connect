import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MapPin, Navigation, Clock, Star, Car, Phone, MessageCircle, Shield, CreditCard, User, UserCheck, DollarSign, Route } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ServicePageLayout from '@/components/ServicePageLayout';
import Map from '@/components/Map';

interface Driver {
  id: string;
  name: string;
  rating: number;
  car: string;
  plate: string;
  distance: string;
  time: string;
  price: number;
  lat: number;
  lng: number;
}

const Taxi = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userType, setUserType] = useState<'passenger' | 'driver'>('passenger');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isRideActive, setIsRideActive] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [rideEstimate, setRideEstimate] = useState<{ distance: string; duration: string; price: number } | null>(null);
  const [rideStatus, setRideStatus] = useState<'searching' | 'found' | 'arriving' | 'onboard' | 'completed'>('searching');
  const [currentRideStep, setCurrentRideStep] = useState(0);

  const mockDrivers: Driver[] = [
    {
      id: '1',
      name: 'Иван Петров',
      rating: 4.8,
      car: 'Toyota Camry',
      plate: 'А123МР77',
      distance: '2 мин',
      time: '5-7 мин',
      price: 250,
      lat: 55.7558 + Math.random() * 0.01,
      lng: 37.6173 + Math.random() * 0.01
    },
    {
      id: '2',
      name: 'Михаил Сидоров',
      rating: 4.9,
      car: 'Skoda Rapid',
      plate: 'В456НК77',
      distance: '3 мин',
      time: '8-10 мин',
      price: 280,
      lat: 55.7558 + Math.random() * 0.01,
      lng: 37.6173 + Math.random() * 0.01
    },
    {
      id: '3',
      name: 'Андрей Козлов',
      rating: 4.7,
      car: 'Hyundai Solaris',
      plate: 'С789ТР77',
      distance: '4 мин',
      time: '10-12 мин',
      price: 220,
      lat: 55.7558 + Math.random() * 0.01,
      lng: 37.6173 + Math.random() * 0.01
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

  const handleRequestRide = () => {
    if (!pickupLocation || !dropoffLocation) {
      toast({
        title: "Ошибка",
        description: "Укажите точки отправления и назначения",
        variant: "destructive",
      });
      return;
    }

    // Calculate estimate
    const estimate = {
      distance: '5.2 км',
      duration: '12 мин',
      price: Math.floor(Math.random() * 200) + 150
    };
    setRideEstimate(estimate);
    setRideStatus('searching');

    toast({
      title: "Поиск водителей",
      description: "Ищем ближайших водителей...",
    });

    // Simulate finding drivers
    setTimeout(() => {
      setRideStatus('found');
    }, 2000);
  };

  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsRideActive(true);
    setRideStatus('arriving');
    setCurrentRideStep(0);
    
    toast({
      title: "Водитель найден",
      description: `${driver.name} уже едет к вам!`,
    });

    // Simulate ride progress
    const steps = ['arriving', 'onboard', 'completed'];
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setRideStatus(steps[stepIndex] as any);
        setCurrentRideStep(stepIndex);
        
        if (steps[stepIndex] === 'onboard') {
          toast({
            title: "Поездка началась",
            description: "Водитель забрал вас, едете к месту назначения",
          });
        } else if (steps[stepIndex] === 'completed') {
          toast({
            title: "Поездка завершена",
            description: "Вы прибыли к месту назначения",
          });
          setTimeout(() => {
            setIsRideActive(false);
            setSelectedDriver(null);
            setRideStatus('searching');
            setCurrentRideStep(0);
          }, 3000);
        }
      } else {
        clearInterval(interval);
      }
    }, 8000);
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-yellow-900 dark:to-orange-900">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
            <h1 className="text-xl font-bold">Cosmo Taxi</h1>
            <div></div>
          </div>

          {/* User Type Selection */}
          <Card className="mb-6 p-4">
            <h2 className="text-lg font-semibold mb-4">Выберите режим</h2>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'passenger' | 'driver')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="passenger" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Пассажир
                </TabsTrigger>
                <TabsTrigger value="driver" className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  Водитель
                </TabsTrigger>
              </TabsList>

              {/* Passenger Mode */}
              <TabsContent value="passenger" className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-4">Заказать поездку</h3>
                  
                  {/* Map */}
                  <div className="mb-4">
                    <Map 
                      userLocation={userLocation}
                      drivers={mockDrivers}
                      onLocationSelect={(location) => {
                        if (!pickupLocation) {
                          setPickupLocation(location.address);
                        } else {
                          setDropoffLocation(location.address);
                        }
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <Input
                        placeholder="Откуда"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <Input
                        placeholder="Куда"
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                      />
                    </div>
                    
                    {/* Ride Estimate */}
                    {rideEstimate && (
                      <Card className="p-3 bg-blue-50 dark:bg-blue-900/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Route className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">{rideEstimate.distance}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">{rideEstimate.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="font-bold">{rideEstimate.price} ₽</span>
                          </div>
                        </div>
                      </Card>
                    )}
                    
                    <Button 
                      className="w-full" 
                      onClick={handleRequestRide}
                      disabled={!pickupLocation || !dropoffLocation}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      {rideStatus === 'searching' ? 'Найти водителей' : 'Поиск...'}
                    </Button>
                  </div>
                </Card>

                {/* Available Drivers */}
                {rideStatus === 'found' && pickupLocation && dropoffLocation && !isRideActive && (
                  <Card className="p-4">
                    <h3 className="font-semibold mb-4">Доступные водители</h3>
                    <div className="space-y-3">
                      {mockDrivers.map((driver) => (
                        <div 
                          key={driver.id}
                          className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => handleSelectDriver(driver)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {driver.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{driver.name}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {driver.rating}
                              </div>
                              <div className="text-xs text-gray-400">{driver.car} • {driver.plate}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{driver.price} ₽</div>
                            <div className="text-sm text-gray-500">{driver.distance}</div>
                            <div className="text-xs text-green-600">Прибытие: {driver.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                
                {/* Ride Status Progress */}
                {rideStatus === 'searching' && pickupLocation && dropoffLocation && (
                  <Card className="p-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Поиск водителей</h3>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">Ищем ближайших водителей в вашем районе...</p>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Active Ride */}
                {isRideActive && selectedDriver && (
                  <Card className="p-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                    {/* Ride Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Статус поездки</span>
                        <span className="text-sm text-green-600">
                          {rideStatus === 'arriving' && 'Водитель едет к вам'}
                          {rideStatus === 'onboard' && 'В пути к месту назначения'}
                          {rideStatus === 'completed' && 'Поездка завершена'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: rideStatus === 'arriving' ? '33%' : 
                                   rideStatus === 'onboard' ? '66%' : 
                                   rideStatus === 'completed' ? '100%' : '0%' 
                          }}
                        ></div>
                      </div>
                    </div>

                    <h3 className="font-semibold mb-4 text-green-700 dark:text-green-300">
                      {rideStatus === 'completed' ? 'Поездка завершена' : 'Активная поездка'}
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Driver Info */}
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {selectedDriver.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{selectedDriver.name}</div>
                            <div className="text-sm text-gray-600 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {selectedDriver.rating}
                            </div>
                            <div className="text-xs text-gray-400">{selectedDriver.car} • {selectedDriver.plate}</div>
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

                      {/* Trip Details */}
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-500">Время</div>
                          <div className="font-medium">{selectedDriver.time}</div>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-500">Стоимость</div>
                          <div className="font-medium">{selectedDriver.price} ₽</div>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-500">Расстояние</div>
                          <div className="font-medium">{selectedDriver.distance}</div>
                        </div>
                      </div>

                      {/* Route Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{pickupLocation}</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span className="text-sm">{dropoffLocation}</span>
                        </div>
                      </div>

                      {rideStatus === 'completed' && (
                        <div className="text-center">
                          <Button className="w-full" onClick={() => {
                            setIsRideActive(false);
                            setSelectedDriver(null);
                            setRideStatus('searching');
                            setPickupLocation('');
                            setDropoffLocation('');
                            setRideEstimate(null);
                          }}>
                            Заказать новую поездку
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </TabsContent>

              {/* Driver Mode */}
              <TabsContent value="driver" className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-4">Режим водителя</h3>
                  
                  {/* Driver Status */}
                  <div className="mb-4">
                    <Button 
                      className={`w-full ${isOnline ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                      onClick={handleToggleOnline}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      {isOnline ? 'В сети - Принимаю заказы' : 'Оффлайн - Не принимаю заказы'}
                    </Button>
                  </div>

                  {/* Map for Driver */}
                  <div className="mb-4">
                    <Map 
                      userLocation={userLocation}
                      isDriverMode={true}
                    />
                  </div>

                  {/* Driver Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-gray-500">Поездки</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">4.8</div>
                      <div className="text-sm text-gray-500">Рейтинг</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">2,850₽</div>
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
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span className="text-sm">ул. Тверская, 15</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Красная площадь, 1</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">280 ₽ • 15 мин</span>
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

export default Taxi;