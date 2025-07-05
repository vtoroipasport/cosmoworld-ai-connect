
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Phone, Video, MoreVertical, Send, Mic, Camera, Paperclip, Smile, MessageSquare, Users, Bot, Zap, Globe, Activity, Brain, Stars } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import VoiceAssistant from '@/components/VoiceAssistant';

const Messenger = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [selectedChat, setSelectedChat] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const chats = [
    {
      id: 1,
      name: 'AI Assistant',
      avatar: '🤖',
      lastMessage: 'Готов помочь с переводом',
      time: '2 мин',
      unread: 1,
      online: true,
      type: 'ai'
    },
    {
      id: 2,
      name: 'Семейная группа',
      avatar: '👨‍👩‍👧‍👦',
      lastMessage: 'Мама: Ужин готов!',
      time: '5 мин',
      unread: 3,
      online: false,
      type: 'group'
    },
    {
      id: 3,
      name: 'Анна Петрова',
      avatar: '👩',
      lastMessage: 'Увидимся завтра',
      time: '1 час',
      unread: 0,
      online: true,
      type: 'personal'
    },
    {
      id: 4,
      name: 'Рабочая группа',
      avatar: '💼',
      lastMessage: 'Проект готов к презентации',
      time: '2 часа',
      unread: 5,
      online: false,
      type: 'work'
    }
  ];

  const messages = [
    {
      id: 1,
      text: 'Привет! Как дела?',
      sender: 'other',
      time: '14:30',
      translated: 'Hi! How are you?'
    },
    {
      id: 2,
      text: 'Отлично! Спасибо за вопрос 😊',
      sender: 'me',
      time: '14:32'
    },
    {
      id: 3,
      text: 'Хочешь встретиться завтра?',
      sender: 'other',
      time: '14:35',
      translated: 'Want to meet tomorrow?'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      toast({
        title: "✨ ИИ-переводчик активен",
        description: "Сообщение отправлено с автопереводом"
      });
      setMessage('');
    }
  };

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command:', command);
    toast({
      title: "🎤 Голосовая команда",
      description: `Выполняю: ${command}`
    });
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
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground rounded-xl w-10 h-10 p-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-foreground font-black text-lg gradient-text-2025">Мессенджер</h1>
                  <p className="text-muted-foreground text-xs font-medium">AI-Enhanced Chat</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVoiceAssistant(!showVoiceAssistant)}
              className="text-muted-foreground hover:text-primary rounded-xl w-10 h-10 p-0"
            >
              <Mic className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Voice Assistant */}
      {showVoiceAssistant && (
        <div className="max-w-md mx-auto px-4 py-4 animate-slide-up-bounce-2025">
          <VoiceAssistant
            onCommand={handleVoiceCommand}
            prompt="Скажите что написать или какое действие выполнить"
            context="messenger"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* AI Features Panel */}
        <div className="card-2025 p-5 holographic-2025">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-6 h-6 text-primary" />
            <h3 className="font-bold text-base gradient-text-2025">ИИ-функции</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="neomorphism-2025 p-3 rounded-xl text-center">
              <Globe className="w-5 h-5 text-blue-500 mx-auto mb-2" />
              <div className="text-sm font-bold">Автоперевод</div>
              <div className="text-xs text-muted-foreground">120 языков</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl text-center">
              <Zap className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-bold">Быстрые ответы</div>
              <div className="text-xs text-muted-foreground">ИИ-генерация</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Поиск чатов и сообщений..."
            className="pl-10 h-12 rounded-2xl border-0 bg-card shadow-lg"
          />
        </div>

        {/* Chat List */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold gradient-text-2025">Активные чаты</h2>
          </div>
          
          {chats.map((chat, index) => (
            <Card
              key={chat.id}
              className={`p-4 cursor-pointer hover:shadow-lg transition-all duration-300 border-0 card-2025 magnetic-2025 ${
                selectedChat === index ? 'ring-2 ring-primary/50' : ''
              }`}
              onClick={() => setSelectedChat(index)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-lg ${
                    chat.type === 'ai' ? 'bg-gradient-to-br from-purple-500 to-blue-500' :
                    chat.type === 'group' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                    chat.type === 'work' ? 'bg-gradient-to-br from-orange-500 to-red-500' :
                    'bg-gradient-to-br from-pink-500 to-rose-500'
                  }`}>
                    <span className="text-white">{chat.avatar}</span>
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full animate-pulse" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-foreground truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                
                {chat.unread > 0 && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{chat.unread}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="card-2025 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Stars className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-base gradient-text-2025">Быстрые действия</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl">
              <Users className="w-4 h-4 mr-2" />
              Новая группа
            </Button>
            <Button className="h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl">
              <Bot className="w-4 h-4 mr-2" />
              ИИ-помощник
            </Button>
          </div>
        </div>

        {/* System Status */}
        <div className="card-2025 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Все системы работают</span>
            </div>
            <div className="text-xs text-green-600">
              {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
