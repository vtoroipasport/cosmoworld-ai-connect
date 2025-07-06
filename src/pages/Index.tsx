
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, CreditCard, Home, Car, UtensilsCrossed, Briefcase, ShoppingBag, Brain, Activity, Zap, Globe2, Users, TrendingUp, Star, Settings, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import FloatingActionButton from '@/components/FloatingActionButton';
import CosmoLifeAssistant from '@/components/CosmoLifeAssistant';
import SmartHub from '@/components/SmartHub';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import ProfileMenu from '@/components/ProfileMenu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    }
  ];

  const quickActions = [
    { id: 1, title: 'Написать сообщение', icon: MessageSquare, action: () => navigate('/messenger') },
    { id: 2, title: 'Быстрый платеж', icon: CreditCard, action: () => navigate('/payments') },
    { id: 3, title: 'Найти такси', icon: Car, action: () => navigate('/taxi') },
    { id: 4, title: 'Заказать еду', icon: UtensilsCrossed, action: () => navigate('/food') },
    { id: 5, title: 'Найти работу', icon: Briefcase, action: () => navigate('/jobs') },
    { id: 6, title: 'Снять жилье', icon: Home, action: () => navigate('/housing') },
    { id: 7, title: 'Покупки', icon: ShoppingBag, action: () => navigate('/marketplace') },
    { id: 8, title: 'Настройки', icon: Settings, action: () => toast({ title: "Настройки", description: "Откроется скоро" }) }
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

      {/* Header with Menu */}
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
              <LanguageSelector />
              <ThemeToggle />
              <ProfileMenu />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                    <Menu className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Настройки
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div className="text-sm font-bold text-green-500">Онлайн</div>
              <div className="text-xs text-muted-foreground">
                {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid - Moved to top */}
      <div className="max-w-md mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4 text-center gradient-text-2025">Сервисы</h2>
        <div className="grid grid-cols-2 gap-4">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="aspect-square p-4 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl group relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-transparent hover:border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleServiceClick(service.path)}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="font-bold text-foreground mb-1 text-sm leading-tight">{service.name}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{service.description}</p>
                
                <div className="flex items-center justify-center mt-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-xs font-medium text-muted-foreground">4.9</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Quick Actions - Below services */}
      <div className="max-w-md mx-auto px-4 py-4">
        <h3 className="text-lg font-bold mb-3 text-center">AI Quick Actions</h3>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {quickActions.map((action) => (
              <Card
                key={action.id}
                className="min-w-[120px] p-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
                onClick={action.action}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md mb-2">
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-medium text-foreground leading-tight">{action.title}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Hub Component - Moved below */}
      <div className="max-w-md mx-auto px-4 py-6">
        <SmartHub />
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

      {/* Floating Action Button with Brain Icon */}
      <FloatingActionButton 
        onClick={toggleAssistant} 
        icon={<Brain className="w-6 h-6" />}
        variant="holographic"
      />
    </div>
  );
};

export default Index;
