
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, DollarSign, MapPin, CarTaxiFront, ShoppingCart, Briefcase, Store, Sparkles, Stars, Bell, Zap, Brain, Globe } from 'lucide-react';
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
      description: 'AI-переводчик с голосовыми сообщениями',
      color: 'from-blue-500 to-purple-600',
      path: '/messenger',
      trend: 'AI-Enhanced',
      stats: '2.1M+'
    },
    {
      icon: DollarSign,
      title: t('services.payments'),
      description: 'Крипто и мгновенные переводы',
      color: 'from-emerald-500 to-teal-600',
      path: '/payments',
      trend: 'Web3-Native',
      stats: '€1.5B+'
    },
    {
      icon: MapPin,
      title: t('services.housing'),
      description: 'Аренда с AR-просмотром',
      color: 'from-purple-500 to-pink-600',
      path: '/housing',
      trend: 'AR-Ready',
      stats: '45K+'
    },
    {
      icon: CarTaxiFront,
      title: t('services.taxi'),
      description: 'Автономные такси и каршеринг',
      color: 'from-yellow-500 to-orange-600',
      path: '/taxi',
      trend: 'Autonomous',
      stats: '320K+'
    },
    {
      icon: ShoppingCart,
      title: t('services.food'),
      description: 'Доставка с AI-рекомендациями',
      color: 'from-red-500 to-pink-600',
      path: '/food',
      trend: 'Voice-First',
      stats: '1.8M+'
    },
    {
      icon: Briefcase,
      title: t('services.jobs'),
      description: 'AI-подбор работы и фриланс',
      color: 'from-indigo-500 to-blue-600',
      path: '/jobs',
      trend: 'AI-Matched',
      stats: '890K+'
    },
    {
      icon: Store,
      title: t('services.marketplace'),
      description: 'Маркетплейс с поиском лучших цен',
      color: 'from-pink-500 to-rose-600',
      path: '/marketplace',
      trend: 'Price-AI',
      stats: '12M+'
    },
    {
      icon: Users,
      title: t('services.groups'),
      description: 'Группы до 10М участников',
      color: 'from-teal-500 to-cyan-600',
      path: '/groups',
      trend: 'Metaverse',
      stats: '5.2M+'
    }
  ];

  const handleVoiceCommand = (command: string) => {
    console.log('Cosmo Life - голосовая команда:', command);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 2025 Aurora Background */}
      <div className="fixed inset-0 pointer-events-none aurora-2025">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-60 right-32 w-80 h-80 bg-gradient-to-br from-accent/8 to-primary/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-32 left-48 w-72 h-72 bg-gradient-to-br from-primary/6 to-accent/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
      </div>

      {/* Modern Header */}
      <div className="sticky top-0 z-50 glass-morphism-2025 border-b border-border/20">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-primary via-accent to-primary rounded-3xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full status-online-2025" />
            </div>
            <div>
              <h1 className="text-foreground font-black text-xl gradient-text-2025">
                Cosmo Life
              </h1>
              <p className="text-muted-foreground text-sm font-medium">Суперсервис 2025</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary rounded-2xl relative magnetic-2025"
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

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 py-8 space-y-8">
        {/* Enhanced Cosmo AI Assistant */}
        <div className="animate-slide-up-bounce-2025">
          <CosmoLifeAssistant onCommand={handleVoiceCommand} />
        </div>

        {/* AI Status Panel */}
        <div className="card-2025 p-6 holographic-2025">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg gradient-text-2025">AI Status</h3>
                <p className="text-sm text-muted-foreground">Neural Network Active</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-500">{currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="text-xs text-muted-foreground">Moscow Time</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Zap className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-bold">99.9%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Globe className="w-5 h-5 text-blue-500 mx-auto mb-2" />
              <div className="text-sm font-bold">12ms</div>
              <div className="text-xs text-muted-foreground">Latency</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Stars className="w-5 h-5 text-purple-500 mx-auto mb-2" />
              <div className="text-sm font-bold">4.9★</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <Stars className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-foreground text-2xl font-black gradient-text-2025">
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
                  <div className="p-6 relative">
                    {/* Trend Badge */}
                    <div className="absolute -top-2 -right-2 px-3 py-1 gradient-border-2025 text-xs font-bold text-primary rounded-full">
                      {service.trend}
                    </div>
                    
                    {/* Stats Badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {service.stats}
                    </div>
                    
                    <div className="mt-8 text-center">
                      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br ${service.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-foreground font-bold text-lg mb-2 heading-2025">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      
                      {/* Status */}
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-500 font-medium">Активно</span>
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

      {/* Modern Floating Action Button */}
      <FloatingActionButton
        onClick={() => navigate('/messenger')}
        icon={<MessageSquare className="w-6 h-6" />}
        variant="holographic"
        className="shadow-2xl hover:shadow-primary/50 transition-all duration-500 floating-2025"
      />
    </div>
  );
};

export default Index;
