
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  recipient: string;
  description: string;
  onConfirm: () => void;
}

const PaymentConfirmationModal = ({ 
  isOpen, 
  onClose, 
  amount, 
  recipient, 
  description,
  onConfirm 
}: PaymentConfirmationModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const handleConfirm = async () => {
    setIsProcessing(true);
    
    // Симуляция обработки платежа
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      
      toast({
        title: "Платеж выполнен",
        description: `Успешно отправлено ${amount} COSMO`,
      });
      
      onConfirm();
      
      setTimeout(() => {
        setIsCompleted(false);
        onClose();
      }, 2000);
    }, 3000);
  };

  const handleReject = () => {
    toast({
      title: "Платеж отклонен",
      description: "Транзакция была отменена",
      variant: "destructive"
    });
    onClose();
  };

  if (isCompleted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 border-green-500/30 text-white max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Платеж выполнен!</h3>
            <p className="text-green-300">Транзакция успешно завершена</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-purple-500/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center space-x-2">
            <Wallet className="w-6 h-6 text-purple-400" />
            <span>Подтверждение платежа</span>
          </DialogTitle>
        </DialogHeader>
        
        {isProcessing ? (
          <div className="text-center py-8">
            <Clock className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-bold mb-2">Обработка платежа...</h3>
            <p className="text-purple-300">Пожалуйста, подождите</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-300">Сумма:</span>
                  <span className="font-bold text-xl">{amount} COSMO</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-purple-300">Получатель:</span>
                  <span className="font-mono text-sm">{recipient.slice(0, 10)}...{recipient.slice(-6)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-purple-300">Описание:</span>
                  <span className="text-sm">{description}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-purple-300">Комиссия:</span>
                  <span className="text-sm">0.001 COSMO</span>
                </div>
                
                <hr className="border-white/20" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span>{(amount + 0.001).toFixed(3)} COSMO</span>
                </div>
              </div>
            </Card>

            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-300">
                  Убедитесь, что адрес получателя указан верно. Транзакции в блокчейне необратимы.
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20 text-white hover:bg-white/10"
                onClick={handleReject}
              >
                Отклонить
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={handleConfirm}
              >
                Подтвердить
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmationModal;
