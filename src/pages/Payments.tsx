
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, Send, Plus, QrCode, DollarSign, Mic, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

const Payments = () => {
  const navigate = useNavigate();
  const [balance] = useState(1245.67);
  const [usdBalance] = useState(2491.34);
  const [isListening, setIsListening] = useState(false);
  const [recipientInput, setRecipientInput] = useState('');
  const [amountInput, setAmountInput] = useState('');

  const contacts = [
    { id: 1, name: 'Анна Петрова', avatar: '👩‍💼', username: '@anna_p' },
    { id: 2, name: 'Иван Иванов', avatar: '👨‍💻', username: '@ivan_dev' },
    { id: 3, name: 'Мария Смирнова', avatar: '👩‍🎨', username: '@maria_art' }
  ];

  const transactions = [
    {
      id: 1,
      type: 'receive',
      amount: 100,
      from: 'Анна Петрова',
      time: '2 часа назад',
      status: 'completed'
    },
    {
      id: 2,
      type: 'send',
      amount: 50,
      to: 'Такси CosmoRide',
      time: '5 часов назад',
      status: 'completed'
    },
    {
      id: 3,
      type: 'receive',
      amount: 200,
      from: 'Возврат аренды',
      time: '1 день назад',
      status: 'completed'
    }
  ];

  const handleVoicePayment = () => {
    setIsListening(!isListening);
    console.log('Cosmo AI voice payment activated: "Отправь 100 токенов Анне"');
    
    if (!isListening) {
      setTimeout(() => {
        setRecipientInput('@anna_p');
        setAmountInput('100');
        setIsListening(false);
      }, 3000);
    }
  };

  const handleQuickSend = (contact: any) => {
    setRecipientInput(contact.username);
    console.log(`Quick send to ${contact.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-gray-900 font-bold text-xl">Cosmo Pay</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:bg-gray-100"
          >
            <QrCode className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Voice Payment */}
      <div className="max-w-md mx-auto px-4 py-6">
        <ModernCard className="p-6 text-center bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <div className="mb-4">
            <NeonButton
              onClick={handleVoicePayment}
              className={`w-16 h-16 rounded-full transition-all duration-300 ${
                isListening
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                  : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-110'
              }`}
            >
              <Mic className="w-8 h-8 text-white" />
            </NeonButton>
          </div>
          <h2 className="text-gray-900 text-lg font-semibold mb-2">Голосовой платёж</h2>
          <p className="text-yellow-600 text-sm">
            {isListening 
              ? 'Слушаю команду...' 
              : 'Скажите: "Отправь 100 токенов Анне"'
            }
          </p>
        </ModernCard>
      </div>

      {/* Balance Card */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <ModernCard className="p-6 text-center bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-gray-900 text-2xl font-bold mb-2">{balance.toLocaleString()} COSMO</h2>
          <p className="text-blue-600 text-lg">≈ ${usdBalance.toLocaleString()} USD</p>
          <div className="flex space-x-3 mt-6">
            <NeonButton variant="primary" className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Отправить
            </NeonButton>
            <NeonButton variant="secondary" className="flex-1">
              <Plus className="w-4 h-4 mr-2" />
              Пополнить
            </NeonButton>
          </div>
        </ModernCard>
      </div>

      {/* Wallet Integration */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 text-lg font-semibold mb-4">Подключенные кошельки</h3>
        <ModernCard className="p-4 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900 font-medium">Wallet</h4>
              <p className="text-gray-600 text-sm">0x1234...5678</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </ModernCard>
      </div>

      {/* Quick Send to Contacts */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 text-lg font-semibold mb-4">Быстрая отправка контактам</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {contacts.map((contact) => (
            <ModernCard
              key={contact.id}
              onClick={() => handleQuickSend(contact)}
              className="min-w-0 flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow bg-white"
            >
              <div className="p-3 text-center w-20">
                <div className="text-2xl mb-2">{contact.avatar}</div>
                <p className="text-gray-900 text-xs truncate">{contact.name}</p>
                <div className="mt-2">
                  <NeonButton size="sm" variant="primary" className="w-full">
                    <Send className="w-3 h-3" />
                  </NeonButton>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Quick Send Form */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 text-lg font-semibold mb-4">Отправить токены</h3>
        <div className="space-y-3">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="@username или адрес кошелька"
              value={recipientInput}
              onChange={(e) => setRecipientInput(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Input
            placeholder="Сумма COSMO"
            type="number"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <NeonButton variant="primary" className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Отправить
            </NeonButton>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => navigate('/messenger')}
            >
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <h3 className="text-gray-900 text-lg font-semibold mb-4">История транзакций</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <ModernCard key={tx.id} className="p-4 bg-white">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'receive' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-red-500 to-pink-500'
                }`}>
                  <Send className={`w-5 h-5 text-white ${tx.type === 'receive' ? 'rotate-180' : ''}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-gray-900 font-medium">
                      {tx.type === 'receive' ? `От ${tx.from}` : `К ${tx.to}`}
                    </h4>
                    <span className={`font-bold ${
                      tx.type === 'receive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.type === 'receive' ? '+' : '-'}{tx.amount} COSMO
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{tx.time}</p>
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
