import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Phone, Video, Settings, Send, Paperclip, Smile, MoreVertical, Users, Edit, Pin, Archive, VolumeX, Star, Delete, Forward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
import CosmoAI from '@/components/CosmoAI';
import { useLanguage } from '@/contexts/LanguageContext';

const Messenger = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chats = [
    {
      id: 1,
      name: 'Анна Петрова',
      avatar: '👩‍💼',
      lastMessage: 'Привет! Как дела?',
      time: '14:30',
      unread: 2,
      online: true,
      type: 'private',
      pinned: true
    },
    {
      id: 2,
      name: 'Разработчики',
      avatar: '💻',
      lastMessage: 'Кто может помочь с багом?',
      time: '13:45',
      unread: 5,
      online: false,
      type: 'group',
      members: 12,
      pinned: false
    },
    {
      id: 3,
      name: 'Михаил Сидоров',
      avatar: '👨‍💻',
      lastMessage: 'Отправил файлы',
      time: '12:20',
      unread: 0,
      online: true,
      type: 'private',
      pinned: false
    },
    {
      id: 4,
      name: 'Семья',
      avatar: '👨‍👩‍👧‍👦',
      lastMessage: 'Встречаемся в 19:00',
      time: '11:30',
      unread: 1,
      online: false,
      type: 'group',
      members: 4,
      pinned: true
    },
    {
      id: 5,
      name: 'Елена Козлова',
      avatar: '👩‍🎨',
      lastMessage: 'Спасибо за помощь!',
      time: 'Вчера',
      unread: 0,
      online: false,
      type: 'private',
      pinned: false
    }
  ];

  const initialMessages = [
    {
      id: 1,
      chatId: 1,
      sender: 'Анна Петрова',
      content: 'Привет! Как дела?',
      time: '14:30',
      type: 'text',
      own: false
    },
    {
      id: 2,
      chatId: 1,
      sender: 'Вы',
      content: 'Привет! Всё хорошо, спасибо! А у тебя как?',
      time: '14:32',
      type: 'text',
      own: true
    },
    {
      id: 3,
      chatId: 1,
      sender: 'Анна Петрова',
      content: 'Тоже всё отлично! Хочу обсудить проект',
      time: '14:33',
      type: 'text',
      own: false
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: messages.length + 1,
      chatId: selectedChat.id,
      sender: 'Вы',
      content: message,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      own: true
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        chatId: selectedChat.id,
        sender: selectedChat.name,
        content: 'Получил твое сообщение!',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        own: false
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChatAction = (action: string, chat: any) => {
    switch (action) {
      case 'pin':
        toast({ title: "Чат закреплен", description: `${chat.name} закреплен сверху` });
        break;
      case 'mute':
        toast({ title: "Уведомления отключены", description: `Уведомления от ${chat.name} отключены` });
        break;
      case 'archive':
        toast({ title: "Чат архивирован", description: `${chat.name} перемещен в архив` });
        break;
      case 'delete':
        toast({ title: "Чат удален", description: `${chat.name} удален` });
        break;
    }
  };

  const handleCall = (type: 'voice' | 'video') => {
    toast({
      title: `${type === 'voice' ? 'Голосовой' : 'Видео'} звонок`,
      description: `Звонок ${selectedChat?.name}...`,
    });
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedChats = [...filteredChats].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const chatMessages = messages.filter(msg => msg.chatId === selectedChat?.id);

  if (selectedChat) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
        {/* Chat Header */}
        <div className="glass-card border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedChat(null)}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <span className="text-2xl">{selectedChat.avatar}</span>
                  {selectedChat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-sm">{selectedChat.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedChat.type === 'group' 
                      ? `${selectedChat.members} ${t('messenger.members')}` 
                      : selectedChat.online ? t('messenger.online') : t('messenger.offline')
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCall('voice')}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCall('video')}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Video className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast({ title: "Настройки чата", description: "Функция в разработке" })}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-md mx-auto w-full">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.own ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.own 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}>
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  msg.own ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <div className="max-w-md mx-auto flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast({ title: "Прикрепить файл", description: "Функция в разработке" })}
              className="text-gray-500 dark:text-gray-400"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('messenger.type')}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast({ title: "Эмодзи", description: "Функция в разработке" })}
              className="text-gray-500 dark:text-gray-400"
            >
              <Smile className="w-4 h-4" />
            </Button>
            <NeonButton
              onClick={handleSendMessage}
              disabled={!message.trim()}
              size="sm"
            >
              <Send className="w-4 h-4" />
            </NeonButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="glass-card border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">{t('messenger.title')}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast({ title: "Новый чат", description: "Функция в разработке" })}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Plus className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast({ title: "Настройки", description: "Функция в разработке" })}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
          <Input
            placeholder={t('messenger.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Chats List */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="space-y-2">
          {sortedChats.map((chat) => (
            <ModernCard
              key={chat.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <span className="text-2xl">{chat.avatar}</span>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-gray-900 dark:text-white font-semibold truncate">{chat.name}</h3>
                      {chat.pinned && <Pin className="w-3 h-3 text-blue-500" />}
                      {chat.type === 'group' && <Users className="w-3 h-3 text-gray-500 dark:text-gray-400" />}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{chat.time}</span>
                      {chat.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm truncate">{chat.lastMessage}</p>
                  {chat.type === 'group' && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {chat.members} {t('messenger.members')}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast({ title: "Действия с чатом", description: "Функция в разработке" });
                  }}
                  className="p-1"
                >
                  <MoreVertical className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </Button>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      <CosmoAI service="messenger" />
    </div>
  );
};

export default Messenger;
