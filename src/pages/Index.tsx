import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, DollarSign, MapPin, CarTaxiFront, ShoppingCart, Mic, Bell, Briefcase, Store, Sparkles, Zap, Stars, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VoiceAssistant from '@/components/VoiceAssistant';
import ProfileMenu from '@/components/ProfileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import PaymentConfirmationModal from '@/components/PaymentConfirmationModal';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
import FloatingActionButton from '@/components/FloatingActionButton';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    amount: 0,
    recipient: '',
    description: ''
  });

  // Magnetic cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: MessageSquare,
      title: t('services.messenger'),
      description: t('services.messenger.desc'),
      color: 'text-blue-500',
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      path: '/messenger',
      variant: 'glass' as const,
      trend: 'AI-Enhanced'
    },
    {
      icon: DollarSign,
      title: t('services.payments'),
      description: t('services.payments.desc'),
      color: 'text-emerald-500',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
      path: '/payments',
      variant: 'neomorphism' as const,
      trend: 'Crypto-Native'
    },
    {
      icon: MapPin,
      title: t('services.housing'),
      description: t('services.housing.desc'),
      color: 'text-purple-500',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      path: '/housing',
      variant: 'floating' as const,
      trend: 'AR-Ready'
    },
    {
      icon: CarTaxiFront,
      title: t('services.taxi'),
      description: t('services.taxi.desc'),
      color: 'text-yellow-500',
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      path: '/taxi',
      variant: 'gradient' as const,
      trend: 'Autonomous'
    },
    {
      icon: ShoppingCart,
      title: t('services.food'),
      description: t('services.food.desc'),
      color: 'text-red-500',
      gradient: 'from-red-500 via-pink-500 to-purple-500',
      path: '/food',
      variant: 'glass' as const,
      trend: 'Voice-First'
    },
    {
      icon: Briefcase,
      title: t('services.jobs'),
      description: t('services.jobs.desc'),
      color: 'text-indigo-500',
      gradient: 'from-indigo-500 via-blue-500 to-teal-500',
      path: '/jobs',
      variant: 'neomorphism' as const,
      trend: 'AI-Matched'
    },
    {
      icon: Store,
      title: t('services.marketplace'),
      description: t('services.marketplace.desc'),
      color: 'text-pink-500',
      gradient: 'from-pink-500 via-rose-500 to-orange-500',
      path: '/marketplace',
      variant: 'floating' as const,
      trend: 'Web3-Native'
    },
    {
      icon: Users,
      title: t('services.groups'),
      description: t('services.groups.desc'),
      color: 'text-teal-500',
      gradient: 'from-teal-500 via-cyan-500 to-blue-500',
      path: '/groups',
      variant: 'gradient' as const,
      trend: 'Metaverse'
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
        title: t('payments.wallet.needed'),
        description: t('payments.wallet.create'),
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
      title: t('payments.success'),
      description: `${t('payments.transferred')} ${paymentModal.amount} COSMO`,
    });
    setPaymentModal({ ...paymentModal, isOpen: false });
  };

  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl parallax-slow" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full blur-2xl parallax-fast" />
        <div className="absolute bottom-20 left-32 w-40 h-40 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl parallax-slow" />
      </div>

      {/* Ultra-Modern Header */}
      <div className="glass-morphism sticky top-0 z-50 border-b border-primary/10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 neomorphism rounded-3xl flex items-center justify-center group magnetic-element">
                <div className="w-10 h-10 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center holographic-button">
                  <Sparkles className="w-6 h-6 text-white animate-pulse" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
            </div>
            <div className="animate-fade-in-blur-bounce">
              <h1 className="text-foreground font-black text-xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t('app.title')}
              </h1>
              <p className="text-muted-foreground text-sm font-medium">{t('app.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="neomorphism-inset text-muted-foreground hover:text-primary rounded-2xl micro-bounce magnetic-element relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </Button>
            <LanguageSelector />
            <ThemeToggle />
            <ProfileMenu />
          </div>
        </div>
      </div>

      {/* Revolutionary Voice Assistant */}
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="animate-slide-up-bounce">
          <VoiceAssistant
            onCommand={handleVoiceCommand}
            prompt={t('voice.prompt')}
            context={t('voice.context')}
          />
        </div>
      </div>

      {/* Next-Gen Features Grid */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <div className="mb-8 animate-fade-in-blur-bounce">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <Stars className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-foreground text-2xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('services.title')}
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full mb-2" />
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-primary rounded-full opacity-60" />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ModernCard
                key={index}
                onClick={() => navigate(feature.path)}
                variant={feature.variant}
                className="animate-scale-in-bounce group magnetic-element holographic-card"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="p-6 text-center relative">
                  {/* Trend Badge */}
                  <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-white text-xs font-bold animate-pulse">
                    {feature.trend}
                  </div>
                  
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br ${feature.gradient} shadow-2xl group-hover:scale-110 transition-transform duration-500 magnetic-element relative`}>
                    <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                    <div className="absolute inset-0 rounded-3xl bg-white/20 animate-pulse" />
                  </div>
                  
                  <h3 className="text-foreground font-bold text-sm mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                    {feature.description}
                  </p>
                  
                  {/* Status Indicator */}
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-500 font-medium">Active</span>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-primary/30 to-transparent rounded-full animate-pulse" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-br from-accent/40 to-transparent rounded-full animate-pulse" />
                  <div className="absolute top-8 left-6 w-1 h-1 bg-gradient-to-br from-primary/50 to-transparent rounded-full animate-pulse" />
                </div>
              </ModernCard>
            );
          })}
        </div>
      </div>

      {/* Premium Quick Actions */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <div className="mb-6 animate-fade-in-blur-bounce">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-foreground text-2xl font-black bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              {t('quick.actions')}
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-accent via-primary to-accent rounded-full mb-2" />
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full opacity-60" />
        </div>
        
        <div className="space-y-4">
          <NeonButton
            variant="holographic"
            size="lg"
            className="w-full animate-slide-up-bounce group"
            onClick={() => navigate('/messenger')}
            glow={true}
            style={{animationDelay: '200ms'}}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="flex-1 text-left font-bold">{t('quick.send.message')}</span>
            <Flame className="w-4 h-4 opacity-75" />
          </NeonButton>
          
          <NeonButton
            variant="glass"
            size="lg"
            className="w-full animate-slide-up-bounce"
            onClick={() => handleQuickPayment(100, t('quick.payment'))}
            style={{animationDelay: '300ms'}}
          >
            <DollarSign className="w-6 h-6" />
            <span className="flex-1 text-left font-bold">{t('quick.transfer')} 100 COSMO</span>
            <div className="px-2 py-1 bg-green-500/20 rounded-full text-green-400 text-xs font-bold">
              INSTANT
            </div>
          </NeonButton>
          
          <NeonButton
            variant="neon"
            size="lg"
            className="w-full animate-slide-up-bounce"
            onClick={() => navigate('/marketplace')}
            glow={true}
            style={{animationDelay: '400ms'}}
          >
            <Store className="w-6 h-6" />
            <span className="flex-1 text-left font-bold">{t('quick.open.store')}</span>
            <div className="px-2 py-1 bg-primary/20 rounded-full text-primary text-xs font-bold">
              NEW
            </div>
          </NeonButton>
        </div>
      </div>

      {/* Ultra-Premium Floating Action Button */}
      <FloatingActionButton
        onClick={() => navigate('/messenger')}
        icon={<MessageSquare className="w-6 h-6" />}
        variant="primary"
        className="shadow-2xl hover:shadow-primary/50 transition-all duration-500"
      />

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
