
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, DollarSign, MapPin, CarTaxiFront, ShoppingCart, Mic, Bell, Briefcase, Store, Sparkles, Zap } from 'lucide-react';
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
      description: 'Чаты, голос, видео',
      gradient: 'from-neon-blue to-neon-purple',
      path: '/messenger',
      variant: 'glass' as const
    },
    {
      icon: DollarSign,
      title: 'Cosmo Pay',
      description: 'Голосовые платежи',
      gradient: 'from-neon-orange to-neon-pink',
      path: '/payments',
      variant: 'neon' as const
    },
    {
      icon: MapPin,
      title: 'Аренда жилья',
      description: 'Умное бронирование',
      gradient: 'from-neon-green to-neon-blue',
      path: '/housing',
      variant: 'holographic' as const
    },
    {
      icon: CarTaxiFront,
      title: 'Такси',
      description: 'С картой водителей',
      gradient: 'from-neon-purple to-neon-pink',
      path: '/taxi',
      variant: 'glass' as const
    },
    {
      icon: ShoppingCart,
      title: 'Доставка еды',
      description: 'ИИ рекомендации',
      gradient: 'from-neon-pink to-neon-orange',
      path: '/food',
      variant: 'neon' as const
    },
    {
      icon: Briefcase,
      title: 'Работа',
      description: 'Поиск вакансий',
      gradient: 'from-neon-green to-neon-blue',
      path: '/jobs',
      variant: 'holographic' as const
    },
    {
      icon: Store,
      title: 'Маркетплейс',
      description: 'Покупки и продажи',
      gradient: 'from-neon-orange to-neon-purple',
      path: '/marketplace',
      variant: 'glass' as const
    },
    {
      icon: Users,
      title: 'Группы',
      description: 'До 10М участников',
      gradient: 'from-neon-blue to-neon-green',
      path: '/groups',
      variant: 'neon' as const
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
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-neon-pink/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,245,255,0.3) 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Header */}
      <div className="glass-morphism border-b border-neon-blue/30 relative z-10">
        <div className="max-w-md mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-white font-bold text-xl font-orbitron">C</span>
              </div>
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full animate-ping opacity-75"></div>
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl font-orbitron animate-neon-flicker text-gradient">CosmoLife</h1>
              <p className="text-neon-blue text-sm font-light">Powered by Cosmo AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-neon-blue hover:bg-neon-blue/20 hover:text-white border border-neon-blue/50 hover:border-neon-blue"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <ProfileMenu />
          </div>
        </div>
      </div>

      {/* Voice Assistant */}
      <div className="max-w-md mx-auto px-6 py-8 relative z-10">
        <VoiceAssistant
          onCommand={handleVoiceCommand}
          prompt="Скажите куда перейти или что сделать"
          context="Навигация по приложению с ИИ"
        />
      </div>

      {/* Features Grid */}
      <div className="max-w-md mx-auto px-6 pb-8 relative z-10">
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="w-6 h-6 text-neon-purple animate-pulse" />
          <h3 className="text-white text-xl font-bold font-orbitron text-gradient">Сервисы</h3>
          <Zap className="w-6 h-6 text-neon-blue animate-bounce" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ModernCard
                key={index}
                variant={feature.variant}
                glow={index % 2 === 0}
                onClick={() => navigate(feature.path)}
                className="animate-fade-in"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="p-6 text-center">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2 font-orbitron">{feature.title}</h4>
                  <p className="text-gray-300 text-xs">{feature.description}</p>
                </div>
              </ModernCard>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-6 pb-8 relative z-10">
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="w-6 h-6 text-neon-green animate-pulse" />
          <h3 className="text-white text-xl font-bold font-orbitron text-gradient">Быстрые действия</h3>
        </div>
        <div className="space-y-4">
          <NeonButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => navigate('/messenger')}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Новое сообщение
          </NeonButton>
          <NeonButton
            variant="accent"
            size="lg"
            className="w-full"
            onClick={() => handleQuickPayment(10, 'Быстрый платеж')}
          >
            <DollarSign className="w-5 h-5 mr-2" />
            Отправить 10 COSMO
          </NeonButton>
          <NeonButton
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => navigate('/marketplace')}
          >
            <Store className="w-5 h-5 mr-2" />
            Найти товары
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
