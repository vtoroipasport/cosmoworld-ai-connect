
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Plus, Search, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import CreateGroupModal from '@/components/CreateGroupModal';
import VoiceAssistant from '@/components/VoiceAssistant';

const Groups = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'CosmoLife Разработчики',
      members: 8945,
      lastMessage: 'Новое обновление готово!',
      time: '10:30',
      unread: 12,
      avatar: '💻',
      verified: true,
      isSuper: true
    },
    {
      id: 2,
      name: 'Crypto Трейдеры',
      members: 3847,
      lastMessage: 'COSMO растет! 🚀',
      time: '09:15',
      unread: 3,
      avatar: '📈',
      verified: false,
      isSuper: false
    },
    {
      id: 3,
      name: 'Московские таксисты',
      members: 9876,
      lastMessage: 'Пробки на Садовом кольце',
      time: '08:45',
      unread: 0,
      avatar: '🚕',
      verified: true,
      isSuper: true
    },
    {
      id: 4,
      name: 'Foodie Community',
      members: 1234,
      lastMessage: 'Кто пробовал новое кафе?',
      time: 'Вчера',
      unread: 7,
      avatar: '🍕',
      verified: false,
      isSuper: false
    }
  ]);

  const handleVoiceCommand = (command: string) => {
    console.log('Обработка голосовой команды в группах:', command);
    
    if (command.includes('создать группу') || command.includes('новая группа')) {
      setShowCreateModal(true);
      toast({
        title: "Создание группы",
        description: "Открываю форму для создания новой группы",
      });
    } else if (command.includes('супергруппа') || command.includes('премиум')) {
      setShowCreateModal(true);
      toast({
        title: "Создание супергруппы",
        description: "Открываю форму для создания премиум группы",
      });
    } else if (command.includes('поиск') || command.includes('найти группу')) {
      const groupTypes = ['разработчики', 'крипто', 'такси', 'еда', 'спорт'];
      const foundType = groupTypes.find(type => command.includes(type));
      if (foundType) {
        setSearchQuery(foundType);
      }
    }
  };

  const handleCreateGroup = (newGroup: any) => {
    setGroups([newGroup, ...groups]);
    toast({
      title: newGroup.isSuper ? "Супергруппа создана!" : "Группа создана!",
      description: newGroup.isSuper 
        ? `Премиум группа "${newGroup.name}" готова к использованию`
        : `Группа "${newGroup.name}" успешно создана`,
    });
  };

  const formatMemberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-white font-bold text-xl">Группы</h1>
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
              onClick={() => setShowCreateModal(true)}
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
            placeholder="Поиск групп..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Voice Assistant */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <VoiceAssistant
          onCommand={handleVoiceCommand}
          prompt="Скажите 'создать группу' или найдите нужную"
          context="Управление группами и сообществами"
        />
      </div>

      {/* Create Group CTA */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <Card className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-indigo-500/30 backdrop-blur-sm">
          <div className="p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2">Создать группу</h3>
            <p className="text-purple-300 text-sm mb-2">
              Обычные группы: до 10,000 участников
            </p>
            <p className="text-purple-300 text-sm mb-4">
              Супергруппы: до 10 миллионов участников
            </p>
            <div className="flex space-x-2">
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                <Users className="w-4 h-4 mr-1" />
                Обычная
              </Button>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white"
              >
                <Crown className="w-4 h-4 mr-1" />
                Супер
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Groups List */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-white text-lg font-semibold mb-4">Мои группы</h3>
        <div className="space-y-3">
          {filteredGroups.map((group) => (
            <Card
              key={group.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/messenger')}
            >
              <div className="p-4 flex items-center space-x-3">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xl">
                    {group.avatar}
                  </div>
                  {group.verified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  {group.isSuper && (
                    <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium truncate">{group.name}</h3>
                    <span className="text-gray-400 text-xs">{group.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-300 text-sm truncate">{group.lastMessage}</p>
                    {group.unread > 0 && (
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                        {group.unread}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <Users className="w-3 h-3 text-gray-400 mr-1" />
                    <span className="text-gray-400 text-xs">
                      {formatMemberCount(group.members)} участников
                      {group.isSuper && <span className="text-yellow-400 ml-1">• Супергруппа</span>}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Groups */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-white text-lg font-semibold mb-4">Рекомендованные группы</h3>
        <div className="space-y-3">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <div className="p-4 flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-lg">
                🏠
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Аренда Москва</h4>
                <div className="flex items-center">
                  <p className="text-gray-400 text-sm">1.2K участников</p>
                  <Crown className="w-3 h-3 text-yellow-400 ml-2" />
                </div>
              </div>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                onClick={() => toast({
                  title: "Присоединились к группе",
                  description: "Добро пожаловать в группу Аренда Москва!",
                })}
              >
                Вступить
              </Button>
            </div>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <div className="p-4 flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-lg">
                🚗
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">CosmoRide Водители</h4>
                <p className="text-gray-400 text-sm">856 участников</p>
              </div>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white"
                onClick={() => toast({
                  title: "Присоединились к группе",
                  description: "Добро пожаловать в группу CosmoRide Водители!",
                })}
              >
                Вступить
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  );
};

export default Groups;
