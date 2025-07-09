import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MapPin, Navigation, Clock, Star, Car, Zap, Users, CreditCard, Phone, MessageCircle, Shield, Sparkles, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ServicePageLayout from '@/components/ServicePageLayout';

const Taxi = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('5-7 мин');
  const [rating, setRating] = useState(4.8);
  const [driverName, setDriverName] = useState('Иван');
  const [carModel, setCarModel] = useState('Tesla Model S');
  const [licensePlate, setLicensePlate] = useState('А123BC77');
  const [fare, setFare] = useState(250);
  const [isRideActive, setIsRideActive] = useState(false);

  useEffect(() => {
    if (isRideActive) {
      toast({
        title: "Поездка началась",
        description: "Ваша поездка началась. Приятного пути!",
      });
    }
  }, [isRideActive, toast]);

  const handleRequestTaxi = () => {
    if (!pickupLocation || !dropoffLocation) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите место отправления и назначения.",
        variant: "destructive",
      });
      return;
    }

    setIsRideActive(true);
    toast({
      title: "Такси вызвано",
      description: "Ожидайте такси через несколько минут.",
    });
  };

  const handleCallDriver = () => {
    toast({
      title: "Звонок водителю",
      description: "Соединяем с водителем...",
    });
  };

  const handleSendMessage = () => {
    toast({
      title: "Сообщение водителю",
      description: "Открываем чат с водителем...",
    });
  };

  const handleReportIssue = () => {
    toast({
      title: "Сообщить о проблеме",
      description: "Связываемся со службой поддержки...",
    });
  };

  return (
    <ServicePageLayout>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-yellow-900 dark:to-orange-900">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Назад
          </Button>

          <Card className="mb-4 p-4">
            <h2 className="text-lg font-semibold mb-4">Заказать такси</h2>
            <div className="grid grid-cols-1 gap-4">
              <Input
                type="text"
                placeholder="Место отправления"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Место назначения"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
              />
              <Button onClick={handleRequestTaxi} disabled={isRideActive}>
                {isRideActive ? "Поиск такси..." : "Вызвать такси"}
              </Button>
            </div>
          </Card>

          {isRideActive && (
            <Card className="mb-4 p-4">
              <h2 className="text-lg font-semibold mb-4">Информация о поездке</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Водитель: {driverName}</p>
                  <p className="text-sm">Автомобиль: {carModel} ({licensePlate})</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <p className="text-sm">Рейтинг: {rating}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Примерное время прибытия: {estimatedTime}</p>
                  <p className="text-sm">Стоимость: {fare} ₽</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCallDriver}>
                  <Phone className="mr-2 h-4 w-4" /> Позвонить
                </Button>
                <Button variant="outline" size="sm" onClick={handleSendMessage}>
                  <MessageCircle className="mr-2 h-4 w-4" /> Написать
                </Button>
              </div>
            </Card>
          )}

          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Дополнительные опции</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="ghost" className="justify-start">
                <CreditCard className="mr-2 h-4 w-4" /> Оплата картой
              </Button>
              <Button variant="ghost" className="justify-start">
                <Shield className="mr-2 h-4 w-4" /> Безопасность
              </Button>
              <Button variant="ghost" className="justify-start">
                <Sparkles className="mr-2 h-4 w-4" /> Премиум-класс
              </Button>
              <Button variant="ghost" className="justify-start">
                <Bot className="mr-2 h-4 w-4" /> ИИ-помощник
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default Taxi;
