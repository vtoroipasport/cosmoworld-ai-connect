import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CreditCard, Wallet, Send, QrCode, History, Shield, Globe, Banknote, TrendingUp, Zap, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import PaymentConfirmationModal from '@/components/PaymentConfirmationModal';
import ServicePageLayout from '@/components/ServicePageLayout';

const Payments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'RUB'];
  const paymentMethods = ['card', 'wallet'];

  const handlePayment = () => {
    if (!recipient || !amount) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }

    setShowConfirmation(true);
  };

  const confirmPayment = () => {
    setShowConfirmation(false);
    toast({
      title: "Успешно",
      description: `Вы отправили ${amount} ${currency} на ${recipient}`,
    });
    setRecipient('');
    setAmount('');
  };

  const cancelPayment = () => {
    setShowConfirmation(false);
  };

  return (
    <ServicePageLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Cosmo Pay</h1>
            <div></div>
          </div>

          {/* Payment Form */}
          <Card className="mb-6 p-6 bg-white shadow-md rounded-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Новый платеж</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Получатель</label>
                <Input
                  type="text"
                  placeholder="Введите имя пользователя или адрес"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Сумма</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Валюта</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  {currencies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Способ оплаты</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
              <Button className="w-full" onClick={handlePayment}>
                <Send className="mr-2 h-4 w-4" />
                Отправить
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="mb-6 p-6 bg-white shadow-md rounded-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Быстрые действия</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <QrCode className="mr-2 h-4 w-4" />
                Сканировать QR-код
              </Button>
              <Button variant="outline" className="w-full">
                <Wallet className="mr-2 h-4 w-4" />
                Пополнить кошелек
              </Button>
              <Button variant="outline" className="w-full">
                <History className="mr-2 h-4 w-4" />
                История транзакций
              </Button>
              <Button variant="outline" className="w-full">
                <Shield className="mr-2 h-4 w-4" />
                Безопасность
              </Button>
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-6 bg-white shadow-md rounded-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Статистика</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-700 font-bold text-sm dark:text-gray-300">Отправлено</p>
                <p className="text-gray-900 text-lg dark:text-gray-100">1,200 USD</p>
              </div>
              <div>
                <p className="text-gray-700 font-bold text-sm dark:text-gray-300">Получено</p>
                <p className="text-gray-900 text-lg dark:text-gray-100">2,500 USD</p>
              </div>
              <div>
                <p className="text-gray-700 font-bold text-sm dark:text-gray-300">Транзакции</p>
                <p className="text-gray-900 text-lg dark:text-gray-100">150</p>
              </div>
            </div>
          </Card>
        </div>

        <PaymentConfirmationModal
          isOpen={showConfirmation}
          onClose={cancelPayment}
          amount={parseFloat(amount) || 0}
          recipient={recipient}
          description={`Платеж в ${currency} через ${paymentMethod}`}
          onConfirm={confirmPayment}
        />
      </div>
    </ServicePageLayout>
  );
};

export default Payments;
