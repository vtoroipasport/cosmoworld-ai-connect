
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, CreditCard, Home, Car, UtensilsCrossed, Briefcase, ShoppingBag, Brain, Activity, Zap, Globe2, Users, TrendingUp, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import FloatingActionButton from '@/components/FloatingActionButton';
import CosmoLifeAssistant from '@/components/CosmoLifeAssistant';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAssistant, setShowAssistant] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      id: 'messenger',
      name: 'Мессенджер',
      description: 'ИИ-переводчик и умные чаты',
      icon: MessageSquare,
      path: '/messenger',
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
    },
    {
      id: 'payments',
      name: 'Cosmo Pay',
      description: 'Мультивалютные платежи',
      icon: CreditCard,
      path: '/payments',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
    },
    {
      id: 'housing',
      name: 'Аренда жилья',
      description: 'ИИ-подбор недвижимости',
      icon: Home,
      path: '/housing',
      gradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20'
    },
    {
      id: 'taxi',
      name: 'Такси',
      description: 'Автономные авто',
      icon: Car,
      path: '/taxi',
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
    },
    {
      id: 'food',
      name: 'Еда',
      description: 'Доставка дронами',
      icon: UtensilsCrossed,
      path: '/food',
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20'
    },
    {
      id: 'jobs',
      name: 'Cosmo Job',
      description: 'Работа рядом с домом',
      icon: Briefcase,
      path: '/jobs',
      gradient: 'from-indigo-500 to-blue-600',
      bgGradient: 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20'
    },
    {
      id: 'marketplace',
      name: 'Маркетплейс',
      description: 'ИИ-рекомендации товаров',
      icon: ShoppingBag,
      path: '/marketplace',
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20'
    }
  ];

  const handleServiceClick = (path: string) => {
    navigate(path);
  };

  const toggleAssistant = () => {
    setShowAssistant(!showAssistant);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 2025 Aurora Background */}
      <div className="fixed inset-0 pointer-events-none aurora-2025">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/8 to-blue-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Modern Header */}
      <div className="sticky top-0 z-50 glass-morphism-2025 border-b border-border/10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg floating-2025">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-foreground font-black text-xl leading-tight gradient-text-2025">Cosmo Life</h1>
                <p className="text-muted-foreground text-xs font-medium">Neural OS V1.0</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-sm font-bold text-green-500">Онлайн</div>
                <div className="text-xs text-muted-foreground">
                  {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Status Panel */}
      <div className="max-w-md mx-auto px-4 pt-6">
        <div className="card-2025 p-5 holographic-2025">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base gradient-text-2025">ИИ-Статус</h3>
                <p className="text-xs text-muted-foreground">Нейросеть активна</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-green-500">Активен</div>
              <div className="text-xs text-muted-foreground">100%</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Zap className="w-4 h-4 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-bold">0.2с</div>
              <div className="text-xs text-muted-foreground">Отклик</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Globe2 className="w-4 h-4 text-blue-500 mx-auto mb-2" />
              <div className="text-sm font-bold">7</div>
              <div className="text-xs text-muted-foreground">Сервисов</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Activity className="w-4 h-4 text-green-500 mx-auto mb-2" />
              <div className="text-sm font-bold">99.9%</div>
              <div className="text-xs text-muted-foreground">Время работы</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bento-grid gap-4">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`bento-card p-4 cursor-pointer transition-all duration-500 hover:scale-105 magnetic-2025 animate-scale-in-bounce-2025 bg-gradient-to-br ${service.bgGradient}`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleServiceClick(service.path)}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1 text-base leading-tight">{service.name}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{service.description}</p>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/20">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium text-muted-foreground">4.9</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Активен</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="card-2025 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="flex items-center justify-between text-center">
            <div className="flex-1">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">1M+</div>
              <div className="text-xs text-muted-foreground">Пользователей</div>
            </div>
            <div className="w-px h-8 bg-border mx-4" />
            <div className="flex-1">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">24/7</div>
              <div className="text-xs text-muted-foreground">Поддержка ИИ</div>
            </div>
            <div className="w-px h-8 bg-border mx-4" />
            <div className="flex-1">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">99.9%</div>
              <div className="text-xs text-muted-foreground">Доступность</div>
            </div>
          </div>
        </div>
      </div>

      {/* Neural Interface Assistant */}
      {showAssistant && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
          <CosmoLifeAssistant onClose={() => setShowAssistant(false)} />
        </div>
      )}

      {/* Floating Action Button */}
      <FloatingActionButton onClick={toggleAssistant} />
    </div>
  );
};

export default Index;
