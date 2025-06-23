
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, DollarSign, MapPin, CarTaxiFront, ShoppingCart, Mic, Bell, Briefcase, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VoiceAssistant from '@/components/VoiceAssistant';
import ProfileMenu from '@/components/ProfileMenu';
import PaymentConfirmationModal from '@/components/PaymentConfirmationModal';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
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
      description: 'Общение и чаты',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      path: '/messenger'
    },
    {
      icon: DollarSign,
      title: 'Cosmo Pay',
      description: 'Платежи',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      path: '/payments'
    },
    {
      icon: MapPin,
      title: 'Аренда жилья',
      description: 'Поиск жилья',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      path: '/housing'
    },
    {
      icon: CarTaxiFront,
      title: 'Такси',
      description: 'Поездки',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      path: '/taxi'
    },
    {
      icon: ShoppingCart,
      title: 'Доставка еды',
      description: 'Заказ еды',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      path: '/food'
    },
    {
      icon: Briefcase,
      title: 'Работа',
      description: 'Поиск работы',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      path: '/jobs'
    },
    {
      icon: Store,
      title: 'Маркетплейс',
      description: 'Покупки',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      path: '/marketplace'
    },
    {
      icon: Users,
      title: 'Группы',
      description: 'Сообщества',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
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
        description: "Открываю чаты",
      });
    } else if (lowerCommand.includes('платеж') || lowerCommand.includes('оплата') || lowerCommand.includes('деньги')) {
      navigate('/payments');
      toast({
        title: "Открываю Cosmo Pay",
        description: "Платежная система",
      });
    } else if (lowerCommand.includes('такси') || lowerCommand.includes('поездка')) {
      navigate('/taxi');
      toast({
        title: "Вызываю такси",
        description: "Поиск водителя",
      });
    } else if (lowerCommand.includes('еда') || lowerCommand.includes('заказ') || lowerCommand.includes('ресторан')) {
      navigate('/food');
      toast({
        title: "Заказ еды",
        description: "Выбор ресторана",
      });
    } else if (lowerCommand.includes('работа') || lowerCommand.includes('вакансия')) {
      navigate('/jobs');
      toast({
        title: "Поиск работы",
        description: "Просмотр вакансий",
      });
    } else if (lowerCommand.includes('маркетплейс') || lowerCommand.includes('покупка') || lowerCommand.includes('товар')) {
      navigate('/marketplace');
      toast({
        title: "Открываю маркетплейс",
        description: "Каталог товаров",
      });
    } else if (lowerCommand.includes('группа') || lowerCommand.includes('сообщество')) {
      navigate('/groups');
      toast({
        title: "Открываю группы",
        description: "Ваши сообщества",
      });
    } else if (lowerCommand.includes('жилье') || lowerCommand.includes('аренда')) {
      navigate('/housing');
      toast({
        title: "Поиск жилья",
        description: "Доступные варианты",
      });
    }
  };

  const handleQuickPayment = (amount: number, description: string) => {
    const wallet = localStorage.getItem('cosmo_wallet');
    if (!wallet) {
      toast({
        title: "Нужен кошелек",
        description: "Создайте кошелек в профиле",
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
      description: `Переведено ${paymentModal.amount} COSMO`,
    });
    setPaymentModal({ ...paymentModal, isOpen: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <div className="glass-card border-b border-gray-300 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-md"></div>
            </div>
            <div>
              <h1 className="text-gray-900 font-bold text-xl">CosmoLife</h1>
              <p className="text-gray-600 text-sm">Все сервисы в одном приложении</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:bg-gray-200 rounded-lg"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <ProfileMenu />
          </div>
        </div>
      </div>

      {/* Voice Assistant */}
      <div className="max-w-md mx-auto px-6 py-6">
        <VoiceAssistant
          onCommand={handleVoiceCommand}
          prompt="Голосовая команда"
          context="Управление приложением"
        />
      </div>

      {/* Features Grid */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <h2 className="text-gray-800 text-lg font-semibold mb-6">Сервисы</h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ModernCard
                key={index}
                onClick={() => navigate(feature.path)}
                className="animate-fade-in"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="p-6 text-center">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-gray-800 font-medium text-sm mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-xs">{feature.description}</p>
                </div>
              </ModernCard>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <h2 className="text-gray-800 text-lg font-semibold mb-6">Быстрые действия</h2>
        <div className="space-y-3">
          <NeonButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => navigate('/messenger')}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="flex-1 text-left">Написать сообщение</span>
          </NeonButton>
          <NeonButton
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => handleQuickPayment(100, 'Быстрый платеж')}
          >
            <DollarSign className="w-5 h-5" />
            <span className="flex-1 text-left">Перевести 100 COSMO</span>
          </NeonButton>
          <NeonButton
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate('/marketplace')}
          >
            <Store className="w-5 h-5" />
            <span className="flex-1 text-left">Открыть магазин</span>
          </NeonButton>
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
