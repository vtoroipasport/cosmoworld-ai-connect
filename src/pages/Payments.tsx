
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CreditCard, Wallet, Plus, Send, ArrowUpDown, History, Eye, EyeOff, Zap, Activity, Brain, Bot, TrendingUp, Globe2, Bitcoin, Banknote, CircleDollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import VoiceAssistant from '@/components/VoiceAssistant';

const Payments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAI, setShowAI] = useState(false);
  const [balance, setBalance] = useState(1250.75);
  const [showBalance, setShowBalance] = useState(true);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCurrency, setSelectedCurrency] = useState('COSMO');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currencies = [
    { code: 'COSMO', name: 'Cosmo Token', icon: '🚀', balance: 1250.75, type: 'crypto' },
    { code: 'BTC', name: 'Bitcoin', icon: '₿', balance: 0.0025, type: 'crypto' },
    { code: 'ETH', name: 'Ethereum', icon: 'Ξ', balance: 0.15, type: 'crypto' },
    { code: 'USDT', name: 'Tether', icon: '₮', balance: 850.00, type: 'crypto' },
    { code: 'USD', name: 'US Dollar', icon: '$', balance: 2340.50, type: 'fiat' },
    { code: 'EUR', name: 'Euro', icon: '€', balance: 1890.25, type: 'fiat' },
    { code: 'RUB', name: 'Russian Ruble', icon: '₽', balance: 95420.00, type: 'fiat' },
    { code: 'BRL', name: 'Brazilian Real (PIX)', icon: 'R$', balance: 5680.75, type: 'digital' },
    { code: 'CNY', name: 'Chinese Yuan (Digital)', icon: '¥', balance: 8950.30, type: 'digital' },
    { code: 'INR', name: 'Indian Rupee (UPI)', icon: '₹', balance: 12450.80, type: 'digital' }
  ];

  const transactions = [
    {
      id: 1,
      type: 'received',
      amount: 500,
      currency: 'COSMO',
      from: 'Анна Петрова',
      date: '2025-01-15',
      time: '14:30'
    },
    {
      id: 2,
      type: 'sent',
      amount: 0.0001,
      currency: 'BTC',
      to: 'Crypto Exchange',
      date: '2025-01-14',
      time: '19:45'
    },
    {
      id: 3,
      type: 'received',
      amount: 75,
      currency: 'USD',
      from: 'Cashback',
      date: '2025-01-14',
      time: '12:15'
    }
  ];

  const handleSendMoney = () => {
    if (amount && recipient) {
      toast({
        title: "💸 Перевод отправлен!",
        description: `${amount} ${selectedCurrency} отправлено для ${recipient}`,
      });
      setAmount('');
      setRecipient('');
    }
  };

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command:', command);
    toast({
      title: "🎤 Голосовая команда",
      description: `Выполняю: ${command}`
    });
  };

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 2025 Aurora Background */}
      <div className="fixed inset-0 pointer-events-none aurora-2025">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-emerald-500/8 to-green-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
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
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-foreground font-black text-lg gradient-text-2025">Cosmo Pay</h1>
                  <p className="text-muted-foreground text-xs font-medium">Neural Payment System</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAI(!showAI)}
              className="text-muted-foreground hover:text-primary rounded-xl w-10 h-10 p-0"
            >
              <Brain className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Voice Assistant */}
      {showAI && (
        <div className="max-w-md mx-auto px-4 py-4 animate-slide-up-bounce-2025">
          <VoiceAssistant
            onCommand={handleVoiceCommand}
            prompt="Скажите какой перевод сделать или валюту обменять"
            context="payments"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* AI Payment Assistant */}
        <div className="card-2025 p-5 holographic-2025">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base gradient-text-2025">ИИ-Ассистент</h3>
                <p className="text-xs text-muted-foreground">Умные платежи 24/7</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-green-500">Активен</div>
              <div className="text-xs text-muted-foreground">Онлайн</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Zap className="w-4 h-4 text-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-bold">0.1с</div>
              <div className="text-xs text-muted-foreground">Скорость</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <Globe2 className="w-4 h-4 text-blue-500 mx-auto mb-2" />
              <div className="text-sm font-bold">150+</div>
              <div className="text-xs text-muted-foreground">Стран</div>
            </div>
            <div className="neomorphism-2025 p-3 rounded-xl">
              <TrendingUp className="w-4 h-4 text-green-500 mx-auto mb-2" />
              <div className="text-sm font-bold">0.1%</div>
              <div className="text-xs text-muted-foreground">Комиссия</div>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="card-2025 p-6 bg-gradient-to-r from-green-500/10 to-emerald-600/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm">Основной баланс</p>
              <div className="flex items-center space-x-2">
                <h2 className="text-3xl font-bold text-foreground">
                  {showBalance ? `${selectedCurrencyData?.balance?.toFixed(selectedCurrency === 'BTC' || selectedCurrency === 'ETH' ? 6 : 2)}` : '••••••'}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-muted-foreground hover:text-foreground p-1"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-muted-foreground text-sm">{selectedCurrencyData?.name}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
              {selectedCurrencyData?.icon}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl">
              <Plus className="w-4 h-4 mr-2" />
              Пополнить
            </Button>
            <Button className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl">
              <Send className="w-4 h-4 mr-2" />
              Отправить
            </Button>
          </div>
        </div>

        {/* Currency Selector */}
        <div className="card-2025 p-5">
          <div className="flex items-center gap-3 mb-4">
            <CircleDollarSign className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base gradient-text-2025">Валюты</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
            {currencies.map((currency) => (
              <div
                key={currency.code}
                onClick={() => setSelectedCurrency(currency.code)}
                className={`card-2025 p-3 cursor-pointer transition-all duration-300 magnetic-2025 ${
                  selectedCurrency === currency.code ? 'ring-2 ring-primary/50' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-md ${
                    currency.type === 'crypto' ? 'bg-gradient-to-br from-orange-500 to-yellow-600 text-white' :
                    currency.type === 'digital' ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' :
                    'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                  }`}>
                    {currency.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-foreground">{currency.code}</div>
                    <div className="text-xs text-muted-foreground truncate">{currency.name}</div>
                  </div>
                </div>
                <div className="text-xs font-medium text-foreground">
                  {currency.balance.toFixed(currency.code === 'BTC' || currency.code === 'ETH' ? 6 : 2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card-2025 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-base gradient-text-2025">Быстрые действия</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl">
              <CreditCard className="w-4 h-4 mr-2" />
              Оплата услуг
            </Button>
            <Button className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Обмен валют
            </Button>
          </div>
        </div>

        {/* Send Money */}
        <div className="card-2025 p-5">
          <h3 className="font-bold text-base gradient-text-2025 mb-4">Отправить деньги</h3>
          <div className="space-y-3">
            <Input
              placeholder="Получатель (email, телефон или @username)"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="h-12 rounded-2xl border-0 bg-secondary"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Сумма"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 h-12 rounded-2xl border-0 bg-secondary"
              />
              <div className="w-20 h-12 bg-secondary rounded-2xl flex items-center justify-center text-sm font-medium text-muted-foreground">
                {selectedCurrency}
              </div>
            </div>
            <Button 
              onClick={handleSendMoney}
              className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl"
              disabled={!amount || !recipient}
            >
              <Send className="w-4 h-4 mr-2" />
              Отправить {selectedCurrency}
            </Button>
          </div>
        </div>

        {/* Transactions */}
        <div className="card-2025 p-5">
          <div className="flex items-center gap-3 mb-4">
            <History className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-base gradient-text-2025">Последние транзакции</h3>
          </div>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="card-2025 p-4 cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                    transaction.type === 'received' 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}>
                    {transaction.type === 'received' ? (
                      <ArrowUpDown className="w-5 h-5 text-white" />
                    ) : (
                      <Send className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">
                        {transaction.type === 'received' ? transaction.from : transaction.to}
                      </p>
                      <span className={`font-bold ${
                        transaction.type === 'received' 
                          ? 'text-green-500' 
                          : 'text-blue-500'
                      }`}>
                        {transaction.type === 'received' ? '+' : '-'}{transaction.amount} {transaction.currency}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {transaction.date} в {transaction.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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

export default Payments;
