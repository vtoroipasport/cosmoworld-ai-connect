import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, DollarSign, MapPin, CarTaxiFront, ShoppingCart, Mic, Bell, Briefcase, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VoiceAssistant from '@/components/VoiceAssistant';
import ProfileMenu from '@/components/ProfileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import PaymentConfirmationModal from '@/components/PaymentConfirmationModal';
import ModernCard from '@/components/ModernCard';
import TelegramButton from '@/components/TelegramButton';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user, showAlert, hapticFeedback } = useTelegramWebApp();
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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      path: '/messenger'
    },
    {
      icon: DollarSign,
      title: t('services.payments'),
      description: t('services.payments.desc'),
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      path: '/payments'
    },
    {
      icon: MapPin,
      title: t('services.housing'),
      description: t('services.housing.desc'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      path: '/housing'
    },
    {
      icon: CarTaxiFront,
      title: t('services.taxi'),
      description: t('services.taxi.desc'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      path: '/taxi'
    },
    {
      icon: ShoppingCart,
      title: t('services.food'),
      description: t('services.food.desc'),
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      path: '/food'
    },
    {
      icon: Briefcase,
      title: t('services.jobs'),
      description: t('services.jobs.desc'),
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      path: '/jobs'
    },
    {
      icon: Store,
      title: t('services.marketplace'),
      description: t('services.marketplace.desc'),
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      path: '/marketplace'
    },
    {
      icon: Users,
      title: t('services.groups'),
      description: t('services.groups.desc'),
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      path: '/groups'
    }
  ];

  const handleVoiceCommand = (command: string) => {
    console.log('Главная страница - голосовая команда:', command);
    hapticFeedback('medium');

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
      showAlert(t('payments.wallet.needed') + '. ' + t('payments.wallet.create'));
      return;
    }

    hapticFeedback('medium');
    setPaymentModal({
      isOpen: true,
      amount,
      recipient: '0x1234567890abcdef1234567890abcdef12345678',
      description
    });
  };

  const handlePaymentConfirm = () => {
    hapticFeedback('heavy');
    toast({
      title: t('payments.success'),
      description: `${t('payments.transferred')} ${paymentModal.amount} COSMO`,
    });
    setPaymentModal({ ...paymentModal, isOpen: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Header с информацией о пользователе Telegram */}
      <div className="glass-card border-b border-gray-300 dark:border-gray-700 sticky top-0 z-50 bg-white/95 dark:bg-gray-800/95">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white dark:bg-gray-300 rounded-md"></div>
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white font-bold text-xl">{t('app.title')}</h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {user ? `${t('welcome')}, ${user.first_name}!` : t('app.subtitle')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
              onClick={() => hapticFeedback('light')}
            >
              <Bell className="w-5 h-5" />
            </Button>
            <LanguageSelector />
            <ThemeToggle />
            <ProfileMenu />
          </div>
        </div>
      </div>

      {/* Voice Assistant */}
      <div className="max-w-md mx-auto px-6 py-6">
        <VoiceAssistant
          onCommand={handleVoiceCommand}
          prompt={t('voice.prompt')}
          context={t('voice.context')}
        />
      </div>

      {/* Features Grid */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <h2 className="text-gray-800 dark:text-gray-200 text-lg font-semibold mb-6">{t('services.title')}</h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ModernCard
                key={index}
                onClick={() => {
                  hapticFeedback('light');
                  navigate(feature.path);
                }}
                className="animate-fade-in"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="p-6 text-center">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-gray-800 dark:text-gray-200 font-medium text-sm mb-1">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">{feature.description}</p>
                </div>
              </ModernCard>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-6 pb-8">
        <h2 className="text-gray-800 dark:text-gray-200 text-lg font-semibold mb-6">{t('quick.actions')}</h2>
        <div className="space-y-3">
          <TelegramButton
            onClick={() => navigate('/messenger')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-start space-x-3 p-4"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="flex-1 text-left">{t('quick.send.message')}</span>
          </TelegramButton>
          <TelegramButton
            onClick={() => handleQuickPayment(100, t('quick.payment'))}
            className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-start space-x-3 p-4"
          >
            <DollarSign className="w-5 h-5" />
            <span className="flex-1 text-left">{t('quick.transfer')} 100 COSMO</span>
          </TelegramButton>
          <TelegramButton
            onClick={() => navigate('/marketplace')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-start space-x-3 p-4"
          >
            <Store className="w-5 h-5" />
            <span className="flex-1 text-left">{t('quick.open.store')}</span>
          </TelegramButton>
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
