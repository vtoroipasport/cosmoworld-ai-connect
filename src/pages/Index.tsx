
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, DollarSign, MapPin, CarTaxiFront, ShoppingCart, Mic, Bell, Briefcase, Store, Sparkles, Zap, Cpu, Orbit, Atom } from 'lucide-react';
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
      description: 'Квантовая связь',
      gradient: 'from-neon-blue via-neon-cyan to-neon-blue',
      path: '/messenger',
      variant: 'cyber' as const
    },
    {
      icon: DollarSign,
      title: 'Cosmo Pay',
      description: 'Нейро-платежи',
      gradient: 'from-neon-orange via-neon-pink to-neon-magenta',
      path: '/payments',
      variant: 'quantum' as const
    },
    {
      icon: MapPin,
      title: 'Аренда жилья',
      description: 'ИИ-подбор',
      gradient: 'from-neon-green via-neon-yellow to-neon-cyan',
      path: '/housing',
      variant: 'holographic' as const
    },
    {
      icon: CarTaxiFront,
      title: 'Такси',
      description: 'Авто-пилот',
      gradient: 'from-neon-purple via-neon-magenta to-neon-pink',
      path: '/taxi',
      variant: 'cyber' as const
    },
    {
      icon: ShoppingCart,
      title: 'Доставка еды',
      description: 'Дрон-доставка',
      gradient: 'from-neon-pink via-neon-orange to-red-500',
      path: '/food',
      variant: 'quantum' as const
    },
    {
      icon: Briefcase,
      title: 'Работа',
      description: 'Био-скан навыков',
      gradient: 'from-neon-blue via-purple-500 to-neon-purple',
      path: '/jobs',
      variant: 'holographic' as const
    },
    {
      icon: Store,
      title: 'Маркетплейс',
      description: 'Голо-витрина',
      gradient: 'from-neon-yellow via-neon-green to-neon-cyan',
      path: '/marketplace',
      variant: 'cyber' as const
    },
    {
      icon: Users,
      title: 'Группы',
      description: 'Мета-сообщества',
      gradient: 'from-neon-cyan via-neon-blue to-neon-purple',
      path: '/groups',
      variant: 'quantum' as const
    }
  ];

  const handleVoiceCommand = (command: string) => {
    console.log('Главная страница - голосовая команда:', command);

    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes('мессенджер') || lowerCommand.includes('чат') || lowerCommand.includes('сообщение')) {
      navigate('/messenger');
      toast({
        title: "🚀 Переходим в мессенджер",
        description: "Квантовая связь активирована",
      });
    } else if (lowerCommand.includes('платеж') || lowerCommand.includes('оплата') || lowerCommand.includes('деньги')) {
      navigate('/payments');
      toast({
        title: "💫 Открываю Cosmo Pay",
        description: "Нейро-платежная система готова",
      });
    } else if (lowerCommand.includes('такси') || lowerCommand.includes('поездка')) {
      navigate('/taxi');
      toast({
        title: "🛸 Вызываю такси",
        description: "Авто-пилот маршрут строится",
      });
    } else if (lowerCommand.includes('еда') || lowerCommand.includes('заказ') || lowerCommand.includes('ресторан')) {
      navigate('/food');
      toast({
        title: "🍕 Заказ еды",
        description: "Дрон-доставка в пути",
      });
    } else if (lowerCommand.includes('работа') || lowerCommand.includes('вакансия')) {
      navigate('/jobs');
      toast({
        title: "💼 Поиск работы",
        description: "Био-скан навыков запущен",
      });
    } else if (lowerCommand.includes('маркетплейс') || lowerCommand.includes('покупка') || lowerCommand.includes('товар')) {
      navigate('/marketplace');
      toast({
        title: "🛍️ Открываю маркетплейс",
        description: "Голо-витрина активирована",
      });
    } else if (lowerCommand.includes('группа') || lowerCommand.includes('сообщество')) {
      navigate('/groups');
      toast({
        title: "👥 Открываю группы",
        description: "Мета-сообщества загружаются",
      });
    } else if (lowerCommand.includes('жилье') || lowerCommand.includes('аренда')) {
      navigate('/housing');
      toast({
        title: "🏠 Поиск жилья",
        description: "ИИ-подбор активирован",
      });
    } else if (lowerCommand.includes('профиль') || lowerCommand.includes('кошелек')) {
      toast({
        title: "👤 Открываю профиль",
        description: "Квантовый кошелек и настройки",
      });
    }
  };

  const handleQuickPayment = (amount: number, description: string) => {
    const wallet = localStorage.getItem('cosmo_wallet');
    if (!wallet) {
      toast({
        title: "⚠️ Нужен кошелек",
        description: "Создайте квантовый кошелек в профиле",
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
      title: "✨ Платеж выполнен",
      description: `Квантовый перевод ${paymentModal.amount} COSMO`,
    });
    setPaymentModal({ ...paymentModal, isOpen: false });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Advanced Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950/50 to-blue-950/30"></div>
      
      {/* Floating geometric shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-neon-blue/10 to-neon-cyan/5 rounded-full blur-3xl animate-float-advanced"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-neon-purple/10 to-neon-magenta/5 rounded-full blur-3xl animate-float-advanced" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-neon-pink/10 to-neon-orange/5 rounded-full blur-3xl animate-float-advanced" style={{animationDelay: '4s'}}></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-20 h-20 border border-neon-cyan/30 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border border-neon-pink/30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-gradient-to-br from-neon-green/20 to-transparent rounded-full animate-quantum-pulse"></div>
      </div>

      {/* Cyber grid */}
      <div className="fixed inset-0 cyber-grid opacity-20"></div>

      {/* Neural network background */}
      <div className="fixed inset-0 animate-neural-network opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0,245,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,20,147,0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(57,255,20,0.1) 0%, transparent 50%)'
      }}></div>

      {/* Header */}
      <div className="glass-ultra border-b border-neon-blue/20 relative z-10 backdrop-blur-2xl">
        <div className="max-w-md mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-neon-blue via-neon-cyan to-neon-purple rounded-full flex items-center justify-center animate-quantum-pulse energy-border">
                <Cpu className="w-7 h-7 text-white animate-spin" style={{animationDuration: '8s'}} />
              </div>
              <div className="absolute inset-0 w-14 h-14 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full animate-ping opacity-30"></div>
              <Orbit className="absolute top-0 left-0 w-14 h-14 text-neon-cyan animate-spin opacity-50" style={{animationDuration: '12s'}} />
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl font-orbitron text-gradient-cyber animate-neon-flicker-advanced">CosmoLife</h1>
              <p className="text-neon-cyan text-sm font-light font-rajdhani">Neural AI • Quantum Web3</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-neon-cyan hover:bg-neon-cyan/20 hover:text-white border border-neon-cyan/30 hover:border-neon-cyan rounded-xl backdrop-blur-sm"
            >
              <Bell className="w-5 h-5 animate-pulse" />
            </Button>
            <ProfileMenu />
          </div>
        </div>
      </div>

      {/* Voice Assistant */}
      <div className="max-w-md mx-auto px-6 py-8 relative z-10">
        <VoiceAssistant
          onCommand={handleVoiceCommand}
          prompt="Нейро-команда для CosmoAI"
          context="Квантовая навигация и ИИ-управление"
        />
      </div>

      {/* Features Grid */}
      <div className="max-w-md mx-auto px-6 pb-8 relative z-10">
        <div className="flex items-center space-x-3 mb-8">
          <Atom className="w-8 h-8 text-neon-purple animate-spin" style={{animationDuration: '6s'}} />
          <h3 className="text-white text-2xl font-bold font-orbitron text-gradient-cyber">Нейро-Сервисы</h3>
          <Sparkles className="w-8 h-8 text-neon-cyan animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ModernCard
                key={index}
                variant={feature.variant}
                glow={index % 3 === 0}
                onClick={() => navigate(feature.path)}
                className="animate-fade-in"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow-advanced energy-border`}>
                    <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2 font-orbitron tracking-wider">{feature.title}</h4>
                  <p className="text-gray-300 text-xs font-rajdhani">{feature.description}</p>
                </div>
              </ModernCard>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-6 pb-12 relative z-10">
        <div className="flex items-center space-x-3 mb-8">
          <Zap className="w-8 h-8 text-neon-green animate-bounce" />
          <h3 className="text-white text-2xl font-bold font-orbitron text-gradient-cyber">Квантовые действия</h3>
        </div>
        <div className="space-y-6">
          <NeonButton
            variant="cyber"
            size="xl"
            className="w-full"
            onClick={() => navigate('/messenger')}
          >
            <MessageSquare className="w-6 h-6 mr-3" />
            Квантовое сообщение
          </NeonButton>
          <NeonButton
            variant="plasma"
            size="xl"
            className="w-full"
            onClick={() => handleQuickPayment(10, 'Нейро-платеж')}
          >
            <DollarSign className="w-6 h-6 mr-3" />
            Перевести 10 COSMO
          </NeonButton>
          <NeonButton
            variant="quantum"
            size="xl"
            className="w-full"
            onClick={() => navigate('/marketplace')}
          >
            <Store className="w-6 h-6 mr-3" />
            Голо-магазин
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
