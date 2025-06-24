
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Plus, Send, ArrowUpDown, History, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

const Payments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [balance, setBalance] = useState(1250.75);
  const [showBalance, setShowBalance] = useState(true);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const transactions = [
    {
      id: 1,
      type: 'received',
      amount: 500,
      from: 'Анна Петрова',
      date: '2024-01-15',
      time: '14:30'
    },
    {
      id: 2,
      type: 'sent',
      amount: 120,
      to: 'Суши Мастер',
      date: '2024-01-14',
      time: '19:45'
    },
    {
      id: 3,
      type: 'received',
      amount: 75,
      from: 'Cashback',
      date: '2024-01-14',
      time: '12:15'
    }
  ];

  const handleSendMoney = () => {
    if (amount && recipient) {
      toast({
        title: "Перевод отправлен!",
        description: `${amount} COSMO отправлено для ${recipient}`,
      });
      setAmount('');
      setRecipient('');
    }
  };

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
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">CosmoWallet</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <History className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="max-w-md mx-auto px-4 py-6">
        <ModernCard className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 dark:text-blue-200 text-sm">Основной баланс</p>
              <div className="flex items-center space-x-2">
                <h2 className="text-3xl font-bold text-white">
                  {showBalance ? `${balance.toFixed(2)}` : '••••••'}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-blue-100 dark:text-blue-200 text-sm">COSMO</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <NeonButton variant="secondary" size="sm" className="flex-1 bg-white/20 hover:bg-white/30 border-white/30">
              <Plus className="w-4 h-4 mr-2" />
              Пополнить
            </NeonButton>
            <NeonButton variant="secondary" size="sm" className="flex-1 bg-white/20 hover:bg-white/30 border-white/30">
              <Send className="w-4 h-4 mr-2" />
              Отправить
            </NeonButton>
          </div>
        </ModernCard>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-2 gap-4">
          <ModernCard className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-900 dark:text-white font-medium">Оплата услуг</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Коммунальные, связь</p>
          </ModernCard>
          
          <ModernCard className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <ArrowUpDown className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-900 dark:text-white font-medium">Обмен валют</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">COSMO ↔ Fiat</p>
          </ModernCard>
        </div>
      </div>

      {/* Send Money */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <ModernCard className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Отправить деньги</h3>
          <div className="space-y-3">
            <Input
              placeholder="Получатель (email или номер телефона)"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <Input
              placeholder="Сумма в COSMO"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <NeonButton 
              onClick={handleSendMoney}
              className="w-full"
              disabled={!amount || !recipient}
            >
              <Send className="w-4 h-4 mr-2" />
              Отправить
            </NeonButton>
          </div>
        </ModernCard>
      </div>

      {/* Transactions */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-4">Последние транзакции</h3>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <ModernCard key={transaction.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'received' 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-red-100 dark:bg-red-900/30'
                }`}>
                  {transaction.type === 'received' ? (
                    <ArrowUpDown className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Send className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900 dark:text-white font-medium">
                      {transaction.type === 'received' ? transaction.from : transaction.to}
                    </p>
                    <span className={`font-semibold ${
                      transaction.type === 'received' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.type === 'received' ? '+' : '-'}{transaction.amount} COSMO
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {transaction.date} в {transaction.time}
                  </p>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;
