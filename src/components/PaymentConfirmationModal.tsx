
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Wallet, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NeonButton from './NeonButton';
import ModernCard from './ModernCard';

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
        <DialogContent className="bg-white border border-gray-200 text-gray-900 max-w-md modern-shadow-lg">
          <div className="text-center py-8">
            <div className="relative mx-auto mb-6">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-scale-in" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Платеж выполнен!</h3>
            <p className="text-green-600 font-medium">Транзакция успешно завершена</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border border-gray-200 text-gray-900 max-w-md modern-shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center space-x-3 text-xl font-bold">
            <Wallet className="w-7 h-7 text-blue-600" />
            <span className="text-gray-900">Подтверждение платежа</span>
          </DialogTitle>
        </DialogHeader>
        
        {isProcessing ? (
          <div className="text-center py-8">
            <div className="relative mx-auto mb-6">
              <Clock className="w-20 h-20 text-blue-600 mx-auto animate-spin" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Обработка платежа...</h3>
            <p className="text-blue-600 font-medium">Пожалуйста, подождите</p>
          </div>
        ) : (
          <div className="space-y-6">
            <ModernCard className="p-6 bg-gray-50">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Сумма:</span>
                  <span className="font-bold text-2xl text-gray-900">{amount} COSMO</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Получатель:</span>
                  <span className="font-mono text-sm text-blue-600">{recipient.slice(0, 10)}...{recipient.slice(-6)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Описание:</span>
                  <span className="text-sm text-gray-900">{description}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Комиссия:</span>
                  <span className="text-sm text-orange-600">0.001 COSMO</span>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-900">Итого:</span>
                  <span className="text-gray-900">{(amount + 0.001).toFixed(3)} COSMO</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard className="p-4 bg-orange-50 border-orange-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700">
                    Убедитесь, что адрес получателя указан верно. Транзакции в блокчейне необратимы.
                  </p>
                </div>
              </div>
            </ModernCard>

            <div className="flex space-x-4">
              <NeonButton 
                variant="secondary"
                className="flex-1"
                onClick={handleReject}
              >
                Отклонить
              </NeonButton>
              <NeonButton 
                variant="primary"
                className="flex-1"
                onClick={handleConfirm}
              >
                <Zap className="w-4 h-4" />
                Подтвердить
              </NeonButton>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmationModal;
