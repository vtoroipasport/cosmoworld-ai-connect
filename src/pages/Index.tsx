
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Wallet, Home, Car, ShoppingBag, Users, Briefcase, 
  UtensilsCrossed, Star, TrendingUp, Zap, Brain, Sparkles, Send, 
  User, Settings, Bell, Search, MapPin, Clock, DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
import VoiceAssistant from '@/components/VoiceAssistant';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const services = [
    { 
      id: 'messenger', 
      name: 'Мессенджер', 
      icon: MessageSquare, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Общение с друзьями'
    },
    { 
      id: 'payments', 
      name: 'Платежи', 
      icon: Wallet, 
      color: 'from-green-500 to-emerald-500',
      description: 'Переводы и оплата'
    },
    { 
      id: 'housing', 
      name: 'Жилье', 
      icon: Home, 
      color: 'from-orange-500 to-red-500',
      description: 'Аренда и продажа'
    },
    { 
      id: 'taxi', 
      name: 'Такси', 
      icon: Car, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Быстрые поездки'
    },
    { 
      id: 'marketplace', 
      name: 'Магазин', 
      icon: ShoppingBag, 
      color: 'from-purple-500 to-pink-500',
      description: 'Покупки онлайн'
    },
    { 
      id: 'groups', 
      name: 'Группы', 
      icon: Users, 
      color: 'from-indigo-500 to-purple-500',
      description: 'Сообщества'
    },
    { 
      id: 'jobs', 
      name: 'Работа', 
      icon: Briefcase, 
      color: 'from-teal-500 to-green-500',
      description: 'Поиск заработка'
    },
    { 
      id: 'food', 
      name: 'Еда', 
      icon: UtensilsCrossed, 
      color: 'from-red-500 to-pink-500',
      description: 'Доставка еды'
    }
  ];

  const handleAiSubmit = async () => {
    if (!aiInput.trim()) return;
    
    setIsAiLoading(true);
    try {
      const response = await fetch(`https://nzrrycacclufrrdvazut.supabase.co/functions/v1/cosmo-ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: aiInput,
          context: 'CosmoWorld - универсальная платформа для жизни'
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка сервера');
      }

      const result = await response.json();
      setAiResponse(result.response || 'Извините, не удалось получить ответ');
      
    } catch (error) {
      console.error('Ошибка Cosmo AI:', error);
      setAiResponse('Извините, произошла ошибка. Попробуйте позже.');
      toast({
        title: "Ошибка Cosmo AI",
        description: "Не удалось получить ответ от ассистента",
        variant: "destructive"
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Quantum Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-pulse animation-delay-500" />
        <div className="absolute bottom-40 left-32 w-48 h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      </div>

      <div className="max-w-md mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-foreground mb-1">CosmoWorld</h1>
            <p className="text-muted-foreground">Ваша цифровая вселенная</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="rounded-2xl">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-2xl">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Cosmo AI Assistant */}
        <ModernCard variant="holographic" className="mb-6 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-foreground font-bold text-lg">Cosmo AI</h3>
              <p className="text-muted-foreground text-sm">Ваш персональный ассистент</p>
            </div>
            <div className="ml-auto">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Спросите что-нибудь у Cosmo AI..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
                className="flex-1 glass-morphism border-primary/30 focus:border-primary"
                disabled={isAiLoading}
              />
              <NeonButton
                onClick={handleAiSubmit}
                disabled={isAiLoading || !aiInput.trim()}
                size="sm"
                className="px-4"
              >
                {isAiLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </NeonButton>
            </div>
            
            {aiResponse && (
              <div className="glass-morphism rounded-2xl p-4 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-primary font-medium text-sm">Cosmo AI</span>
                </div>
                <p className="text-foreground text-sm leading-relaxed">{aiResponse}</p>
              </div>
            )}
          </div>
        </ModernCard>

        {/* Voice Assistant */}
        <div className="mb-6">
          <VoiceAssistant
            prompt="Скажите команду Cosmo AI"
            context="CosmoWorld - универсальная платформа"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {services.map((service, index) => (
            <ModernCard
              key={service.id}
              onClick={() => navigate(`/${service.id}`)}
              variant="glass"
              className="p-4 cursor-pointer group animate-scale-in-bounce magnetic-element"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-foreground font-semibold mb-1 text-base">{service.name}</h3>
              <p className="text-muted-foreground text-xs leading-tight">{service.description}</p>
            </ModernCard>
          ))}
        </div>

        {/* Smart Stats */}
        <ModernCard variant="glass" className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-foreground font-semibold">Сегодня</h3>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">₽2,450</div>
              <div className="text-xs text-muted-foreground">Заработано</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-xs text-muted-foreground">Заказов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">4.9</div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                Рейтинг
              </div>
            </div>
          </div>
        </ModernCard>
      </div>
    </div>
  );
};

export default Index;
