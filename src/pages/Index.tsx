
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, DollarSign, MapPin, CarTaxiFront, ShoppingCart, Mic, Bell, Briefcase, Store, Sparkles } from 'lucide-react';
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
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    amount: 0,
    recipient: '',
    description: ''
  });

  const features = [
    {
      icon: MessageSquare,
      title: t('services.messenger'),
      description: t('services.messenger.desc'),
      color: 'text-blue-500',
      gradient: 'from-blue-500 to-purple-600',
      path: '/messenger',
      variant: 'glass' as const
    },
    {
      icon: DollarSign,
      title: t('services.payments'),
      description: t('services.payments.desc'),
      color: 'text-emerald-500',
      gradient: 'from-emerald-500 to-teal-600',
      path: '/payments',
      variant: 'neomorphism' as const
    },
    {
      icon: MapPin,
      title: t('services.housing'),
      description: t('services.housing.desc'),
      color: 'text-purple-500',
      gradient: 'from-purple-500 to-pink-600',
      path: '/housing',
      variant: 'floating' as const
    },
    {
      icon: CarTaxiFront,
      title: t('services.taxi'),
      description: t('services.taxi.desc'),
      color: 'text-yellow-500',
      gradient: 'from-yellow-500 to-orange-600',
      path: '/taxi',
      variant: 'gradient' as const
    },
    {
      icon: ShoppingCart,
      title: t('services.food'),
      description: t('services.food.desc'),
      color: 'text-red-500',
      gradient: 'from-red-500 to-pink-600',
      path: '/food',
      variant: 'glass' as const
    },
    {
      icon: Briefcase,
      title: t('services.jobs'),
      description: t('services.jobs.desc'),
      color: 'text-indigo-500',
      gradient: 'from-indigo-500 to-blue-600',
      path: '/jobs',
      variant: 'neomorphism' as const
    },
    {
      icon: Store,
      title: t('services.marketplace'),
      description: t('services.marketplace.desc'),
      color: 'text-pink-500',
      gradient: 'from-pink-500 to-rose-600',
      path: '/marketplace',
      variant: 'floating' as const
    },
    {
      icon: Users,
      title: t('services.groups'),
      description: t('services.groups.desc'),
      color: 'text-teal-500',
      gradient: 'from-teal-500 to-cyan-600',
      path: '/groups',
      variant: 'gradient' as const
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
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <div className="glass-morphism sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 neomorphism rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div className="animate-fade-in-blur">
              <h1 className="text-foreground font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('app.title')}
              </h1>
              <p className="text-muted-foreground text-sm">{t('app.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="neomorphism-inset text-muted-foreground hover:text-primary rounded-xl micro-bounce"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <LanguageSelector />
            <ThemeToggle />
            <ProfileMenu />
          </div>
        </div>
      </div>

      {/* Enhanced Voice Assistant */}
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="animate-slide-up">
          <VoiceAssistant
            onCommand={handleVoiceCommand}
            prompt={t('voice.prompt')}
            context={t('voice.context')}
          />
        </div>
      </div>

      {/* Modern Features Grid */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <div className="mb-8 animate-fade-in-blur">
          <h2 className="text-foreground text-xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('services.title')}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ModernCard
                key={index}
                onClick={() => navigate(feature.path)}
                variant={feature.variant}
                className="animate-scale-in group"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="p-6 text-center relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-foreground font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-primary/20 to-transparent rounded-full" />
                  <div className="absolute bottom-3 left-3 w-1 h-1 bg-gradient-to-br from-accent/30 to-transparent rounded-full" />
                </div>
              </ModernCard>
            );
          })}
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <div className="mb-6 animate-fade-in-blur">
          <h2 className="text-foreground text-xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('quick.actions')}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>
        
        <div className="space-y-4">
          <NeonButton
            variant="primary"
            size="lg"
            className="w-full animate-slide-up"
            onClick={() => navigate('/messenger')}
            glow={true}
            style={{animationDelay: '200ms'}}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="flex-1 text-left">{t('quick.send.message')}</span>
          </NeonButton>
          
          <NeonButton
            variant="glass"
            size="lg"
            className="w-full animate-slide-up"
            onClick={() => handleQuickPayment(100, t('quick.payment'))}
            style={{animationDelay: '300ms'}}
          >
            <DollarSign className="w-5 h-5" />
            <span className="flex-1 text-left">{t('quick.transfer')} 100 COSMO</span>
          </NeonButton>
          
          <NeonButton
            variant="outline"
            size="lg"
            className="w-full animate-slide-up"
            onClick={() => navigate('/marketplace')}
            style={{animationDelay: '400ms'}}
          >
            <Store className="w-5 h-5" />
            <span className="flex-1 text-left">{t('quick.open.store')}</span>
          </NeonButton>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => navigate('/messenger')}
        icon={<MessageSquare className="w-6 h-6" />}
        variant="primary"
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
