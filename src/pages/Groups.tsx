
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Users, MessageSquare, Calendar, Settings, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

const Groups = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [joinedGroups, setJoinedGroups] = useState<number[]>([1, 3]);

  const categories = [
    { id: 'all', name: 'Все', icon: '🌐' },
    { id: 'tech', name: 'Технологии', icon: '💻' },
    { id: 'business', name: 'Бизнес', icon: '💼' },
    { id: 'hobby', name: 'Хобби', icon: '🎨' },
    { id: 'sport', name: 'Спорт', icon: '⚽' },
    { id: 'education', name: 'Обучение', icon: '📚' }
  ];

  const groups = [
    {
      id: 1,
      name: 'React Developers Russia',
      description: 'Сообщество React разработчиков',
      members: 15420,
      category: 'tech',
      avatar: '⚛️',
      isPrivate: false,
      lastActivity: '5 мин назад',
      posts: 234,
      featured: true
    },
    {
      id: 2,
      name: 'Стартапы и Бизнес',
      description: 'Обсуждаем бизнес-идеи и стартапы',
      members: 8932,
      category: 'business',
      avatar: '🚀',
      isPrivate: false,
      lastActivity: '12 мин назад',
      posts: 156,
      featured: false
    },
    {
      id: 3,
      name: 'Фотография и Искусство',
      description: 'Делимся творчеством и вдохновением',
      members: 12567,
      category: 'hobby',
      avatar: '📸',
      isPrivate: false,
      lastActivity: '1 час назад',
      posts: 89,
      featured: true
    },
    {
      id: 4,
      name: 'Криптоинвесторы',
      description: 'Обсуждение криптовалют и DeFi',
      members: 23891,
      category: 'business',
      avatar: '₿',
      isPrivate: true,
      lastActivity: '30 мин назад',
      posts: 445,
      featured: true
    }
  ];

  const handleJoinGroup = (groupId: number) => {
    if (joinedGroups.includes(groupId)) {
      setJoinedGroups(joinedGroups.filter(id => id !== groupId));
      toast({
        title: "Вы покинули группу",
        description: "Группа удалена из ваших подписок",
      });
    } else {
      setJoinedGroups([...joinedGroups, groupId]);
      toast({
        title: "Добро пожаловать в группу!",
        description: "Вы успешно присоединились к сообществу",
      });
    }
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">Группы</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск групп..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <NeonButton
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'primary' : 'secondary'}
              size="sm"
              className="whitespace-nowrap"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </NeonButton>
          ))}
        </div>
      </div>

      {/* Create Group CTA */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <ModernCard className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 dark:text-white font-semibold">Создайте свою группу</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Соберите единомышленников вокруг общих интересов</p>
            </div>
            <NeonButton variant="primary" size="sm">
              Создать
            </NeonButton>
          </div>
        </ModernCard>
      </div>

      {/* My Groups */}
      {joinedGroups.length > 0 && (
        <div className="max-w-md mx-auto px-4 pb-6">
          <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">Мои группы</h3>
          <div className="grid grid-cols-2 gap-3">
            {groups.filter(group => joinedGroups.includes(group.id)).map((group) => (
              <ModernCard
                key={group.id}
                className="p-3 cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{group.avatar}</div>
                  <h4 className="text-gray-900 dark:text-white font-medium text-sm mb-1">{group.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">{group.members.toLocaleString()} участников</p>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      )}

      {/* Groups List */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
            {selectedCategory === 'all' ? 'Рекомендуемые группы' : categories.find(c => c.id === selectedCategory)?.name}
          </h3>
          <span className="text-gray-600 dark:text-gray-300 text-sm">{filteredGroups.length} групп</span>
        </div>
        
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <ModernCard
              key={group.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="flex space-x-3">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center text-2xl">
                  {group.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-gray-900 dark:text-white font-semibold">{group.name}</h3>
                      {group.isPrivate && (
                        <span className="text-gray-500 dark:text-gray-400 text-xs">🔒</span>
                      )}
                      {group.featured && (
                        <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-1 rounded">
                          Топ
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">{group.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {group.members.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {group.posts}
                    </div>
                    <span>{group.lastActivity}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-500"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-500"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <NeonButton 
                      size="sm" 
                      variant={joinedGroups.includes(group.id) ? "secondary" : "primary"}
                      onClick={() => handleJoinGroup(group.id)}
                    >
                      {joinedGroups.includes(group.id) ? 'Покинуть' : 'Вступить'}
                    </NeonButton>
                  </div>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Popular Topics */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">Популярные темы</h3>
        <div className="flex flex-wrap gap-2">
          {['#react', '#blockchain', '#startup', '#design', '#ai', '#web3', '#career', '#freelance'].map((topic, index) => (
            <span
              key={index}
              className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;
