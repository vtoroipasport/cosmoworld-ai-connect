
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, DollarSign, MapPin, CarTaxiFront, ShoppingCart, Briefcase, Store, Sparkles, Stars, Bell, Zap, Brain, Globe, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CosmoLifeAssistant from '@/components/CosmoLifeAssistant';
import SmartHub from '@/components/SmartHub';
import ProfileMenu from '@/components/ProfileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import FloatingActionButton from '@/components/FloatingActionButton';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAIInterface, setShowAIInterface] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      icon: MessageSquare,
      title: t('services.messenger'),
      description: 'ИИ-переводчик с голосовыми сообщениями и умными ответами',
      color: 'from-blue-500 to-purple-600',
      path: '/messenger',
      status: 'Активно'
    },
    {
      icon: DollarSign,
      title: t('services.payments'),
      description: 'Крипто-платежи и мгновенные переводы по всему миру',
      color: 'from-emerald-500 to-teal-600',
      path: '/payments',
      status: 'Активно'
    },
    {
      icon: MapPin,
      title: t('services.housing'),
      description: 'Аренда жилья с AR-просмотром и умным поиском',
      color: 'from-purple-500 to-pink-600',
      path: '/housing',
      status: 'Активно'
    },
    {
      icon: CarTaxiFront,
      title: t('services.taxi'),
      description: 'Автономные такси и каршеринг нового поколения',
      color: 'from-yellow-500 to-orange-600',
      path: '/taxi',
      status: 'Активно'
    },
    {
      icon: ShoppingCart,
      title: t('services.food'),
      description: 'Доставка еды с ИИ-рекомендациями и голосовым заказом',
      color: 'from-red-500 to-pink-600',
      path: '/food',
      status: 'Активно'
    },
    {
      icon: Briefcase,
      title: t('services.jobs'),
      description: 'Умный подбор работы и фриланс с ИИ-анализом навыков',
      color: 'from-indigo-500 to-blue-600',
      path: '/jobs',
      status: 'Активно'
    },
    {
      icon: Store,
      title: t('services.marketplace'),
      description: 'Маркетплейс с поиском лучших цен и умными покупками',
      color: 'from-pink-500 to-rose-600',
      path: '/marketplace',
      status: 'Активно'
    },
    {
      icon: Users,
      title: t('services.groups'),
      description: 'Мега-группы до 10М участников с ИИ-модерацией',
      color: 'from-teal-500 to-cyan-600',
      path: '/groups',
      status: 'Активно'
    }
  ];

  const handleVoiceCommand = (command: string) => {
    console.log('Cosmo Life - голосовая команда:', command);
  };

  const handleAIActivation = () => {
    setShowAIInterface(!showAIInterface);
    toast({
      title: "🧠 Нейроинтерфейс",
      description: showAIInterface ? "Интерфейс свернут" : "Нейроинтерфейс активирован",
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 2025 Aurora Background */}
      <div className="fixed inset-0 pointer-events-none aurora-2025">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-60 right-32 w-80 h-80 bg-gradient-to-br from-accent/8 to-primary/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-32 left-48 w-72 h-72 bg-gradient-to-br from-primary/6 to-accent/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
      </div>

      {/* Modern Minimal Header */}
      <div className="sticky top-0 z-50 glass-morphism-2025 border-b border-border/10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center shadow-lg animate-floating-gentle">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-foreground font-black text-lg gradient-text-2025 leading-tight">
                Cosmo Life
              </h1>
              <p className="text-muted-foreground text-xs font-medium">Neural OS V1.0</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary rounded-xl relative w-8 h-8 p-0"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>
            <LanguageSelector />
            <ThemeToggle />
            <ProfileMenu />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Cosmo AI Assistant - Conditional */}
        {showAIInterface && (
          <div className="animate-slide-up-bounce-2025">
            <CosmoLifeAssistant onCommand={handleVoiceCommand} />
          </div>
        )}

        {/* System Status Panel */}
        <div className="card-2025 p-5 holographic-2025">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base gradient-text-2025">Статус системы</h3>
                <p className="text-xs text-muted-foreground">Все системы работают</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-green-500">{currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="text-xs text-muted-foreground">Московское время</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Zap className="w-4 h-4 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-bold">99.9%</div>
              <div className="text-xs text-muted-foreground">Аптайм</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Globe className="w-4 h-4 text-blue-500 mx-auto mb-2" />
              <div className="text-sm font-bold">12ms</div>
              <div className="text-xs text-muted-foreground">Задержка</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Stars className="w-4 h-4 text-purple-500 mx-auto mb-2" />
              <div className="text-sm font-bold">4.9★</div>
              <div className="text-xs text-muted-foreground">Рейтинг</div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-7 h-7 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <Stars className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-foreground text-xl font-black gradient-text-2025">
              {t('services.title')}
            </h2>
          </div>
          
          <div className="bento-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(service.path)}
                  className="bento-card magnetic-2025 cursor-pointer group animate-scale-in-bounce-2025"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="p-5 relative">
                    <div className="text-center">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-gradient-to-br ${service.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-foreground font-bold text-base mb-2 heading-2025 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3 px-1">
                        {service.description}
                      </p>
                      
                      {/* Status */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-500 font-medium">{service.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Smart Hub */}
        <SmartHub />
      </div>

      {/* Neural Interface Activation Button */}
      <FloatingActionButton
        onClick={handleAIActivation}
        icon={<Brain className="w-6 h-6" />}
        variant="holographic"
        className="shadow-2xl hover:shadow-primary/50 transition-all duration-500 floating-2025"
      />
    </div>
  );
};

export default Index;
