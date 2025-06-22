
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, DollarSign, MapPin, CarTaxiFront, ShoppingCart, Mic, Bell, Briefcase, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import VoiceAssistant from '@/components/VoiceAssistant';
import ProfileMenu from '@/components/ProfileMenu';
import PaymentConfirmationModal from '@/components/PaymentConfirmationModal';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    amount: 0,
    recipient: '',
    description: ''
  });

  const features = [
    {
      icon: MessageSquare,
      title: 'Мессенджер',
      description: 'Чаты, голос, видео',
      gradient: 'from-blue-500 to-purple-600',
      path: '/messenger'
    },
    {
      icon: DollarSign,
      title: 'Cosmo Pay',
      description: 'Голосовые платежи',
      gradient: 'from-yellow-400 to-orange-500',
      path: '/payments'
    },
    {
      icon: MapPin,
      title: 'Аренда жилья',
      description: 'Умное бронирование',
      gradient: 'from-green-400 to-blue-500',
      path: '/housing'
    },
    {
      icon: CarTaxiFront,
      title: 'Такси',
      description: 'С картой водителей',
      gradient: 'from-purple-500 to-pink-500',
      path: '/taxi'
    },
    {
      icon: ShoppingCart,
      title: 'Доставка еды',
      description: 'ИИ рекомендации',
      gradient: 'from-red-400 to-pink-500',
      path: '/food'
    },
    {
      icon: Briefcase,
      title: 'Работа',
      description: 'Поиск вакансий',
      gradient: 'from-emerald-500 to-teal-500',
      path: '/jobs'
    },
    {
      icon: Store,
      title: 'Маркетплейс',
      description: 'Покупки и продажи',
      gradient: 'from-orange-500 to-red-500',
      path: '/marketplace'
    },
    {
      icon: Users,
      title: 'Группы',
      description: 'До 10М участников',
      gradient: 'from-indigo-500 to-purple-600',
      path: '/groups'
    }
  ];

  const handleVoiceCommand = (command: string) => {
    console.log('Главная страница - голосовая команда:', command);

    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('мессенджер') || lowerCommand.includes('чат') || lowerCommand.includes('сообщение')) {
      navigate('/messenger');
      toast({
        title: "Переходим в мессенджер",
        description: "Открываю чаты и сообщения",
      });
    } else if (lowerCommand.includes('платеж') || lowerCommand.includes('оплата') || lowerCommand.includes('деньги')) {
      navigate('/payments');
      toast({
        title: "Открываю Cosmo Pay",
        description: "Готов к отправке платежей",
      });
    } else if (lowerCommand.includes('такси') || lowerCommand.includes('поездка')) {
      navigate('/taxi');
      toast({
        title: "Вызываю такси",
        description: "Открываю карту для заказа поездки",
      });
    } else if (lowerCommand.includes('еда') || lowerCommand.includes('заказ') || lowerCommand.includes('ресторан')) {
      navigate('/food');
      toast({
        title: "Заказ еды",
        description: "Открываю сервис доставки",
      });
    } else if (lowerCommand.includes('работа') || lowerCommand.includes('вакансия')) {
      navigate('/jobs');
      toast({
        title: "Поиск работы",
        description: "Открываю доску вакансий",
      });
    } else if (lowerCommand.includes('маркетплейс') || lowerCommand.includes('покупка') || lowerCommand.includes('товар')) {
      navigate('/marketplace');
      toast({
        title: "Открываю маркетплейс",
        description: "Готов к покупкам и продажам",
      });
    } else if (lowerCommand.includes('группа') || lowerCommand.includes('сообщество')) {
      navigate('/groups');
      toast({
        title: "Открываю группы",
        description: "Переходим к сообществам",
      });
    } else if (lowerCommand.includes('жилье') || lowerCommand.includes('аренда')) {
      navigate('/housing');
      toast({
        title: "Поиск жилья",
        description: "Открываю сервис аренды",
      });
    } else if (lowerCommand.includes('профиль') || lowerCommand.includes('кошелек')) {
      toast({
        title: "Открываю профиль",
        description: "Управление кошельком и настройками",
      });
    }
  };

  const handleQuickPayment = (amount: number, description: string) => {
    const wallet = localStorage.getItem('cosmo_wallet');
    if (!wallet) {
      toast({
        title: "Нужен кошелек",
        description: "Создайте кошелек в профиле для совершения платежей",
        variant: "destructive"
      });
      return;
    }

    setPaymentModal({
      isOpen: true,
      amount,
      recipient: '0x1234567890abcdef1234567890abcdef12345678',
      description
    });
  };

  const handlePaymentConfirm = () => {
    toast({
      title: "Платеж выполнен",
      description: `Успешно отправлено ${paymentModal.amount} COSMO`,
    });
    setPaymentModal({ ...paymentModal, isOpen: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">CosmoLife</h1>
              <p className="text-purple-300 text-sm">Powered by Cosmo AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <ProfileMenu />
          </div>
        </div>
      </div>

      {/* Voice Assistant */}
      <div className="max-w-md mx-auto px-4 py-6">
        <VoiceAssistant
          onCommand={handleVoiceCommand}
          prompt="Скажите куда перейти или что сделать"
          context="Навигация по приложению с ИИ"
        />
      </div>

      {/* Features Grid */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-white text-lg font-semibold mb-4">Сервисы</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => navigate(feature.path)}
              >
                <div className="p-4 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium text-sm mb-1">{feature.title}</h4>
                  <p className="text-purple-300 text-xs">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-white text-lg font-semibold mb-4">Быстрые действия</h3>
        <div className="space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={() => navigate('/messenger')}
          >
            Новое сообщение
          </Button>
          <Button
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            onClick={() => handleQuickPayment(10, 'Быстрый платеж')}
          >
            Отправить 10 COSMO
          </Button>
          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            onClick={() => navigate('/marketplace')}
          >
            Найти товары на маркетплейсе
          </Button>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ ...paymentModal, isOpen: false })}
        amount={paymentModal.amount}
        recipient={paymentModal.recipient}
        description={paymentModal.description}
        onConfirm={handlePaymentConfirm}
      />
    </div>
  );
};

export default Index;
