
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Users, Crown, Upload, CreditCard } from 'lucide-react';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (group: any) => void;
}

const CreateGroupModal = ({ isOpen, onClose, onCreate }: CreateGroupModalProps) => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [isSuper, setIsSuper] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [category, setCategory] = useState('Общение');
  const [showPayment, setShowPayment] = useState(false);

  const categories = ['Общение', 'Технологии', 'Бизнес', 'Хобби', 'Спорт', 'Образование', 'Развлечения'];

  const handleCreateGroup = () => {
    if (!groupName) return;

    if (isSuper && !showPayment) {
      setShowPayment(true);
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: groupName,
      description,
      members: 1,
      isSuper,
      isPrivate,
      category,
      lastMessage: 'Группа создана!',
      time: 'Сейчас',
      unread: 0,
      avatar: isSuper ? '👑' : '👥',
      verified: true
    };

    onCreate(newGroup);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setGroupName('');
    setDescription('');
    setIsSuper(false);
    setIsPrivate(false);
    setCategory('Общение');
    setShowPayment(false);
  };

  const handlePayment = () => {
    // Симуляция оплаты
    setTimeout(() => {
      handleCreateGroup();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-slate-900 border-white/20 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-xl">
              {showPayment ? 'Оплата подписки' : 'Создать группу'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {showPayment ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Crown className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h3 className="text-white font-bold">Супергруппа Premium</h3>
                    <p className="text-yellow-300 text-sm">До 10 миллионов участников</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>✓ Неограниченная история сообщений</p>
                  <p>✓ Администраторские права</p>
                  <p>✓ Боты и интеграции</p>
                  <p>✓ Кастомные эмодзи</p>
                  <p>✓ Приоритетная поддержка</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white">Подписка на 1 месяц</span>
                  <span className="text-emerald-400 font-bold text-lg">500 COSMO</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white">Скидка новым пользователям</span>
                  <span className="text-red-400">-100 COSMO</span>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Итого</span>
                    <span className="text-emerald-400 font-bold text-xl">400 COSMO</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 border border-blue-500 bg-blue-500/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-white font-medium">Cosmo Wallet</p>
                      <p className="text-gray-400 text-sm">Баланс: 1,250 COSMO</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowPayment(false)}
                  variant="outline"
                  className="flex-1 border-white/30 text-white hover:bg-white/10"
                >
                  Назад
                </Button>
                <Button
                  onClick={handlePayment}
                  className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white"
                >
                  Оплатить 400 COSMO
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Название группы</label>
                <Input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Например: Разработчики CosmoLife"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Описание</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Краткое описание группы..."
                  className="w-full h-20 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-gray-400 resize-none"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Категория</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Badge
                      key={cat}
                      variant={category === cat ? "default" : "outline"}
                      className={`cursor-pointer ${
                        category === cat
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'border-white/30 text-white hover:bg-white/10'
                      }`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="private"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="private" className="text-white text-sm">Приватная группа</label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="super"
                    checked={isSuper}
                    onChange={(e) => setIsSuper(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="super" className="text-white text-sm flex items-center">
                    <Crown className="w-4 h-4 text-yellow-400 mr-1" />
                    Супергруппа (до 10M участников)
                  </label>
                </div>
              </div>

              {isSuper && (
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 text-sm font-medium mb-1">
                    Супергруппы требуют Premium подписку
                  </p>
                  <p className="text-gray-400 text-xs">
                    400 COSMO/месяц • Расширенные возможности и до 10 миллионов участников
                  </p>
                </div>
              )}

              <div className="border-2 border-dashed border-white/30 rounded-lg p-4 text-center">
                <Upload className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white text-sm">Добавить аватар группы</p>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  variant="outline"
                  className="flex-1 border-white/30 text-white hover:bg-white/10"
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  disabled={!groupName}
                  className={`flex-1 ${
                    isSuper
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                  } text-white`}
                >
                  {isSuper ? (
                    <>
                      <Crown className="w-4 h-4 mr-2" />
                      Создать супергруппу
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4 mr-2" />
                      Создать группу
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CreateGroupModal;
