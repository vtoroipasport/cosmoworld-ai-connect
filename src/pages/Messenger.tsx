import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, MessageSquare, Video, Mic, Users, Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Messenger = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);

  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Анна Петрова',
      lastMessage: 'Привет! Как дела?',
      time: '14:30',
      unread: 2,
      online: true,
      avatar: '👩‍💼',
      messages: [
        { id: 1, text: 'Привет! Как дела?', time: '14:30', sender: 'other' },
        { id: 2, text: 'Привет! Всё отлично, спасибо!', time: '14:32', sender: 'me' }
      ]
    },
    {
      id: 2,
      name: 'Cosmo Support',
      lastMessage: 'Добро пожаловать в CosmoLife!',
      time: '12:15',
      unread: 0,
      online: true,
      avatar: '🤖',
      messages: [
        { id: 1, text: 'Добро пожаловать в CosmoLife!', time: '12:15', sender: 'other' },
        { id: 2, text: 'Спасибо! Очень нравится приложение', time: '12:16', sender: 'me' }
      ]
    },
    {
      id: 3,
      name: 'Группа разработчиков',
      lastMessage: 'Иван: Отличная работа команда!',
      time: '11:45',
      unread: 5,
      online: false,
      avatar: '👥',
      isGroup: true,
      messages: [
        { id: 1, text: 'Отличная работа команда!', time: '11:45', sender: 'other', senderName: 'Иван' },
        { id: 2, text: 'Да, релиз прошёл успешно!', time: '11:46', sender: 'me' }
      ]
    },
    {
      id: 4,
      name: 'Мария Смирнова',
      lastMessage: 'Увидимся завтра на встрече 👋',
      time: '10:22',
      unread: 0,
      online: true,
      avatar: '👩‍🎨',
      messages: [
        { id: 1, text: 'Привет! Напомни время встречи?', time: '10:20', sender: 'me' },
        { id: 2, text: 'Увидимся завтра на встрече 👋', time: '10:22', sender: 'other' }
      ]
    },
    {
      id: 5,
      name: 'Семья',
      lastMessage: 'Мама: Не забудьте про ужин в воскресенье',
      time: '09:15',
      unread: 3,
      online: false,
      avatar: '👨‍👩‍👧‍👦',
      isGroup: true,
      messages: [
        { id: 1, text: 'Не забудьте про ужин в воскресенье', time: '09:15', sender: 'other', senderName: 'Мама' },
        { id: 2, text: 'Конечно, будем!', time: '09:16', sender: 'me' }
      ]
    },
    {
      id: 6,
      name: 'Алексей Волков',
      lastMessage: 'Отправил документы на почту',
      time: '08:45',
      unread: 0,
      online: false,
      avatar: '👨‍💻',
      messages: [
        { id: 1, text: 'Нужны документы по проекту', time: '08:40', sender: 'me' },
        { id: 2, text: 'Отправил документы на почту', time: '08:45', sender: 'other' }
      ]
    },
    {
      id: 7,
      name: 'CosmoRide Водители',
      lastMessage: 'Сергей: Новый бонус за 5-звёздочные поездки!',
      time: '07:30',
      unread: 12,
      online: true,
      avatar: '🚗',
      isGroup: true,
      messages: [
        { id: 1, text: 'Новый бонус за 5-звёздочные поездки!', time: '07:30', sender: 'other', senderName: 'Сергей' },
        { id: 2, text: 'Отличные новости!', time: '07:32', sender: 'me' }
      ]
    },
    {
      id: 8,
      name: 'Елена Кузнецова',
      lastMessage: 'Спасибо за помощь! 😊',
      time: 'Вчера',
      unread: 0,
      online: false,
      avatar: '👩‍⚕️',
      messages: [
        { id: 1, text: 'Можешь помочь с задачей?', time: '16:20', sender: 'other' },
        { id: 2, text: 'Спасибо за помощь! 😊', time: '16:45', sender: 'other' }
      ]
    },
    {
      id: 9,
      name: 'Cosmo Pay Новости',
      lastMessage: 'Новая функция: мгновенные переводы!',
      time: 'Вчера',
      unread: 1,
      online: true,
      avatar: '💰',
      messages: [
        { id: 1, text: 'Новая функция: мгновенные переводы!', time: '14:00', sender: 'other' },
        { id: 2, text: 'Классно!', time: '14:05', sender: 'me' }
      ]
    },
    {
      id: 10,
      name: 'Игорь Петров',
      lastMessage: 'Созвонимся завтра?',
      time: 'Вчера',
      unread: 0,
      online: true,
      avatar: '👨‍🔧',
      messages: [
        { id: 1, text: 'Привет! Как проект?', time: '13:30', sender: 'other' },
        { id: 2, text: 'Созвонимся завтра?', time: '13:45', sender: 'other' }
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const chatIndex = chats.findIndex(chat => chat.id === selectedChat);
    const newMsg = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      sender: 'me' as const
    };

    const updatedChats = [...chats];
    updatedChats[chatIndex].messages.push(newMsg);
    updatedChats[chatIndex].lastMessage = newMessage;
    updatedChats[chatIndex].time = newMsg.time;

    setChats(updatedChats);
    setNewMessage('');
  };

  const handleVoiceRecord = () => {
    setIsVoiceRecording(!isVoiceRecording);
    console.log('Cosmo AI voice message recording:', isVoiceRecording ? 'stopped' : 'started');
  };

  const handleVideoCall = () => {
    console.log('Starting video call with Cosmo AI integration...');
  };

  const handleVoiceCall = () => {
    console.log('Starting voice call with Cosmo AI integration...');
  };

  const handleNewGroup = () => {
    console.log('Creating new group with Cosmo AI assistant...');
  };

  if (selectedChat) {
    const chat = chats.find(c => c.id === selectedChat);
    if (!chat) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
        {/* Chat Header */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedChat(null)}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="text-lg">{chat.avatar}</div>
                <div>
                  <h3 className="text-white font-medium">{chat.name}</h3>
                  {chat.online && <p className="text-green-400 text-xs">В сети</p>}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceCall}
                className="text-white hover:bg-white/10"
              >
                <Mic className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVideoCall}
                className="text-white hover:bg-white/10"
              >
                <Video className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 max-w-md mx-auto px-4 py-4 space-y-3 overflow-y-auto">
          {chat.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'me'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white/10 text-white backdrop-blur-sm'
                }`}
              >
                {chat.isGroup && message.sender === 'other' && (
                  <p className="text-xs text-blue-300 mb-1">{message.senderName}</p>
                )}
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="max-w-md mx-auto px-4 py-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={handleVoiceRecord}
              className={`transition-all duration-300 ${
                isVoiceRecording
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-110'
              }`}
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white font-bold text-xl">Чаты</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск чатов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="flex space-x-3">
          <Card 
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 backdrop-blur-sm flex-1 cursor-pointer hover:bg-blue-600/30 transition-colors"
            onClick={handleVideoCall}
          >
            <div className="p-3 text-center">
              <Video className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <p className="text-white text-xs">Видеозвонок</p>
            </div>
          </Card>
          <Card 
            className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30 backdrop-blur-sm flex-1 cursor-pointer hover:bg-green-600/30 transition-colors"
            onClick={handleVoiceCall}
          >
            <div className="p-3 text-center">
              <Mic className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <p className="text-white text-xs">Голосовое</p>
            </div>
          </Card>
          <Card 
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm flex-1 cursor-pointer hover:bg-purple-600/30 transition-colors"
            onClick={handleNewGroup}
          >
            <div className="p-3 text-center">
              <Users className="w-6 h-6 text-purple-400 mx-auto mb-1" />
              <p className="text-white text-xs">Группа</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Chat List */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="space-y-2">
          {chats.map((chat) => (
            <Card
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="p-4 flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium truncate">{chat.name}</h3>
                    <span className="text-gray-400 text-xs">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-300 text-sm truncate">
                      {chat.isGroup && <Users className="w-3 h-3 inline mr-1" />}
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
