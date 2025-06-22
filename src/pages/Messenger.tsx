
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, MessageSquare, Video, Mic, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Messenger = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Анна Петрова',
      lastMessage: 'Привет! Как дела?',
      time: '14:30',
      unread: 2,
      online: true,
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Cosmo Support',
      lastMessage: 'Добро пожаловать в CosmoLife!',
      time: '12:15',
      unread: 0,
      online: true,
      avatar: '🤖'
    },
    {
      id: 3,
      name: 'Группа разработчиков',
      lastMessage: 'Иван: Отличная работа команда!',
      time: '11:45',
      unread: 5,
      online: false,
      avatar: '👥',
      isGroup: true
    },
    {
      id: 4,
      name: 'Мария Иванова',
      lastMessage: 'Голосовое сообщение',
      time: '10:20',
      unread: 0,
      online: false,
      avatar: '👩‍🎨',
      hasVoice: true
    }
  ];

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
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 backdrop-blur-sm flex-1">
            <div className="p-3 text-center">
              <Video className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <p className="text-white text-xs">Видеозвонок</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30 backdrop-blur-sm flex-1">
            <div className="p-3 text-center">
              <Mic className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <p className="text-white text-xs">Голосовое</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm flex-1">
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
                      {chat.hasVoice && <Mic className="w-3 h-3 inline mr-1" />}
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
