
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
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
        <DialogContent className="bg-gradient-to-br from-black via-green-900/50 to-black border border-neon-green/50 text-white max-w-md backdrop-blur-xl">
          <div className="text-center py-8">
            <div className="relative mx-auto mb-6">
              <CheckCircle className="w-20 h-20 text-neon-green mx-auto animate-pulse-glow" />
              <div className="absolute inset-0 w-20 h-20 text-neon-green mx-auto animate-ping opacity-50">
                <CheckCircle className="w-20 h-20" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 font-orbitron text-gradient">Платеж выполнен!</h3>
            <p className="text-neon-green font-light">Транзакция успешно завершена</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-black via-purple-900/50 to-black border border-neon-purple/50 text-white max-w-md backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center space-x-3 text-xl font-orbitron">
            <Wallet className="w-7 h-7 text-neon-purple animate-pulse" />
            <span className="text-gradient">Подтверждение платежа</span>
          </DialogTitle>
        </DialogHeader>
        
        {isProcessing ? (
          <div className="text-center py-8">
            <div className="relative mx-auto mb-6">
              <Clock className="w-20 h-20 text-neon-purple mx-auto animate-spin" />
              <div className="absolute inset-0 w-20 h-20 bg-neon-purple/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold mb-3 font-orbitron text-gradient">Обработка платежа...</h3>
            <p className="text-neon-purple font-light">Пожалуйста, подождите</p>
          </div>
        ) : (
          <div className="space-y-6">
            <ModernCard variant="glass" className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-light">Сумма:</span>
                  <span className="font-bold text-2xl text-gradient font-orbitron">{amount} COSMO</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-light">Получатель:</span>
                  <span className="font-mono text-sm text-neon-blue">{recipient.slice(0, 10)}...{recipient.slice(-6)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-light">Описание:</span>
                  <span className="text-sm text-white">{description}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-light">Комиссия:</span>
                  <span className="text-sm text-neon-orange">0.001 COSMO</span>
                </div>
                
                <hr className="border-neon-purple/30" />
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gradient font-orbitron">Итого:</span>
                  <span className="text-gradient font-orbitron">{(amount + 0.001).toFixed(3)} COSMO</span>
                </div>
              </div>
            </ModernCard>

            <ModernCard variant="neon" className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-neon-orange mt-0.5 animate-pulse" />
                <div>
                  <p className="text-sm text-gray-300 font-light">
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
                <Zap className="w-4 h-4 mr-2" />
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
