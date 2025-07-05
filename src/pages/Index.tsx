
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, DollarSign, MapPin, CarTaxiFront, ShoppingCart, Briefcase, Store, Sparkles, Stars, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CosmoLifeAssistant from '@/components/CosmoLifeAssistant';
import SmartHub from '@/components/SmartHub';
import ProfileMenu from '@/components/ProfileMenu';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import ModernCard from '@/components/ModernCard';
import FloatingActionButton from '@/components/FloatingActionButton';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const features = [
    {
      icon: MessageSquare,
      title: t('services.messenger'),
      description: 'Общение с ИИ-переводчиком и голосовыми сообщениями',
      color: 'text-blue-500',
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      path: '/messenger',
      variant: 'glass' as const,
      trend: 'AI-Enhanced'
    },
    {
      icon: DollarSign,
      title: t('services.payments'),
      description: 'Криптоплатежи и мгновенные переводы',
      color: 'text-emerald-500',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
      path: '/payments',
      variant: 'neomorphism' as const,
      trend: 'Crypto-Native'
    },
    {
      icon: MapPin,
      title: t('services.housing'),
      description: 'Аренда жилья с умным бронированием',
      color: 'text-purple-500',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      path: '/housing',
      variant: 'floating' as const,
      trend: 'AR-Ready'
    },
    {
      icon: CarTaxiFront,
      title: t('services.taxi'),
      description: 'Умное такси с картой и трекингом',
      color: 'text-yellow-500',
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      path: '/taxi',
      variant: 'gradient' as const,
      trend: 'Autonomous'
    },
    {
      icon: ShoppingCart,
      title: t('services.food'),
      description: 'Доставка еды с ИИ-рекомендациями',
      color: 'text-red-500',
      gradient: 'from-red-500 via-pink-500 to-purple-500',
      path: '/food',
      variant: 'glass' as const,
      trend: 'Voice-First'
    },
    {
      icon: Briefcase,
      title: t('services.jobs'),
      description: 'Поиск работы и фриланс с ИИ-подбором',
      color: 'text-indigo-500',
      gradient: 'from-indigo-500 via-blue-500 to-teal-500',
      path: '/jobs',
      variant: 'neomorphism' as const,
      trend: 'AI-Matched'
    },
    {
      icon: Store,
      title: t('services.marketplace'),
      description: 'Маркетплейс с поиском лучших цен',
      color: 'text-pink-500',
      gradient: 'from-pink-500 via-rose-500 to-orange-500',
      path: '/marketplace',
      variant: 'floating' as const,
      trend: 'Web3-Native'
    },
    {
      icon: Users,
      title: t('services.groups'),
      description: 'Группы до 10М участников',
      color: 'text-teal-500',
      gradient: 'from-teal-500 via-cyan-500 to-blue-500',
      path: '/groups',
      variant: 'gradient' as const,
      trend: 'Metaverse'
    }
  ];

  const handleVoiceCommand = (command: string) => {
    console.log('Cosmo Life - голосовая команда:', command);
    // Обработка команд будет в CosmoLifeAssistant компоненте
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full blur-2xl" />
        <div className="absolute bottom-20 left-32 w-40 h-40 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Заголовок */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-primary via-accent to-primary rounded-3xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-foreground font-black text-xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Cosmo Life
              </h1>
              <p className="text-muted-foreground text-sm font-medium">Суперсервис будущего</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary rounded-2xl relative"
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

      {/* Основной контент */}
      <div className="max-w-md mx-auto px-6 py-8 space-y-8">
        {/* Cosmo Life Assistant */}
        <div className="animate-slide-up-bounce">
          <CosmoLifeAssistant onCommand={handleVoiceCommand} />
        </div>

        {/* Сервисы */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <Stars className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-foreground text-2xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('services.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ModernCard
                  key={index}
                  onClick={() => navigate(feature.path)}
                  variant={feature.variant}
                  className="animate-scale-in-bounce group cursor-pointer"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="p-4 text-center relative">
                    {/* Trend Badge */}
                    <div className="absolute -top-1 -right-1 px-2 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-white text-xs font-bold animate-pulse">
                      {feature.trend}
                    </div>
                    
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-foreground font-bold text-sm mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-2">
                      {feature.description}
                    </p>
                    
                    {/* Status */}
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-500 font-medium">Активно</span>
                    </div>
                  </div>
                </ModernCard>
              );
            })}
          </div>
        </div>

        {/* Smart Hub */}
        <SmartHub />
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => navigate('/messenger')}
        icon={<MessageSquare className="w-6 h-6" />}
        variant="primary"
        className="shadow-2xl hover:shadow-primary/50 transition-all duration-500"
      />
    </div>
  );
};

export default Index;
