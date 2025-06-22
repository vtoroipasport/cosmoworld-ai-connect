
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, ShoppingCart, CreditCard, Wallet } from 'lucide-react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onPurchase: (details: any) => void;
}

const PurchaseModal = ({ isOpen, onClose, product, onPurchase }: PurchaseModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [bidAmount, setBidAmount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handlePurchase = () => {
    const details = {
      productId: product?.id,
      paymentMethod,
      bidAmount: product?.isAuction ? bidAmount : product?.price,
      quantity,
      address,
      phone,
      total: product?.isAuction ? parseInt(bidAmount) : product?.price * quantity
    };

    onPurchase(details);
    onClose();
    setBidAmount('');
    setQuantity(1);
    setAddress('');
    setPhone('');
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-slate-900 border-white/20 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-xl">
              {product.isAuction ? 'Сделать ставку' : 'Купить товар'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="mb-4">
            <div className="flex space-x-3">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                {product.image}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">{product.title}</h3>
                <p className="text-emerald-400 font-bold text-lg">{product.price} COSMO</p>
                <p className="text-gray-400 text-sm">{product.seller}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {product.isAuction ? (
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Ваша ставка (COSMO)</label>
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={`Минимум: ${product.price + 1}`}
                  min={product.price + 1}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <p className="text-gray-400 text-xs mt-1">
                  Текущая цена: {product.price} COSMO
                </p>
              </div>
            ) : (
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Количество</label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  min="1"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            )}

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Способ оплаты</label>
              <div className="space-y-2">
                <div
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'wallet'
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/20 hover:bg-white/10'
                  }`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-white font-medium">Cosmo Wallet</p>
                      <p className="text-gray-400 text-sm">Баланс: 2,450 COSMO</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/20 hover:bg-white/10'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-white font-medium">Банковская карта</p>
                      <p className="text-gray-400 text-sm">**** 1234</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Адрес доставки</label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Улица, дом, квартира"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Телефон</label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex justify-between text-white mb-2">
                <span>Цена:</span>
                <span>{product.isAuction ? bidAmount || product.price : product.price * quantity} COSMO</span>
              </div>
              <div className="flex justify-between text-white mb-2">
                <span>Доставка:</span>
                <span>Бесплатно</span>
              </div>
              <div className="border-t border-white/20 pt-2">
                <div className="flex justify-between text-white font-bold">
                  <span>Итого:</span>
                  <span>{product.isAuction ? bidAmount || product.price : product.price * quantity} COSMO</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-white/30 text-white hover:bg-white/10"
              >
                Отмена
              </Button>
              <Button
                onClick={handlePurchase}
                disabled={product.isAuction ? !bidAmount : !address || !phone}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.isAuction ? 'Поставить ставку' : 'Купить'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PurchaseModal;
