
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { User, Wallet, Settings, LogOut, Copy, Eye, EyeOff, Shield, History, CreditCard, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Wallet {
  address: string;
  privateKey: string;
  mnemonic: string;
  balance: number;
}

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [walletPassword, setWalletPassword] = useState('');
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Загружаем кошелек из localStorage
    const savedWallet = localStorage.getItem('cosmo_wallet');
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet));
    }
  }, []);

  const generateMnemonic = () => {
    const words = [
      'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
      'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
      'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual'
    ];
    return Array.from({ length: 12 }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
  };

  const generateWallet = () => {
    const mnemonic = generateMnemonic();
    const address = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const privateKey = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    return {
      address,
      privateKey,
      mnemonic,
      balance: 0
    };
  };

  const createWallet = () => {
    if (!walletPassword) {
      toast({
        title: "Ошибка",
        description: "Введите пароль для кошелька",
        variant: "destructive"
      });
      return;
    }

    setIsCreatingWallet(true);
    
    setTimeout(() => {
      const newWallet = generateWallet();
      setWallet(newWallet);
      localStorage.setItem('cosmo_wallet', JSON.stringify(newWallet));
      localStorage.setItem('wallet_password', walletPassword);
      
      toast({
        title: "Кошелек создан!",
        description: "Ваш Cosmo кошелек успешно создан",
      });
      
      setIsCreatingWallet(false);
      setWalletPassword('');
    }, 2000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано",
      description: `${label} скопирован в буфер обмена`,
    });
  };

  const deleteWallet = () => {
    localStorage.removeItem('cosmo_wallet');
    localStorage.removeItem('wallet_password');
    setWallet(null);
    toast({
      title: "Кошелек удален",
      description: "Ваш кошелек был удален из устройства",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
        >
          <User className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-800 dark:via-purple-800 dark:to-slate-800 border-purple-500/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Профиль CosmoLife</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Кошелек */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Wallet className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold">Cosmo Кошелек</h3>
            </div>
            
            {!wallet ? (
              <div className="space-y-3">
                <p className="text-sm text-purple-300">Создайте свой Web3 кошелек как в MetaMask</p>
                <Input
                  type="password"
                  placeholder="Пароль для кошелька"
                  value={walletPassword}
                  onChange={(e) => setWalletPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                />
                <Button 
                  onClick={createWallet}
                  disabled={isCreatingWallet}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isCreatingWallet ? 'Создание кошелька...' : 'Создать кошелек'}
                </Button>
                <p className="text-xs text-purple-200">
                  ⚠️ Сохраните seed-фразу в безопасном месте. Без неё восстановить кошелек будет невозможно!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-300">Баланс:</span>
                  <span className="font-bold">{wallet.balance} COSMO</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-300">Адрес:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(wallet.address, 'Адрес')}
                      className="hover:bg-white/10"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs font-mono bg-black/20 p-2 rounded break-all">
                    {wallet.address}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-300">Приватный ключ:</span>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPrivateKey(!showPrivateKey)}
                        className="hover:bg-white/10"
                      >
                        {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(wallet.privateKey, 'Приватный ключ')}
                        className="hover:bg-white/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs font-mono bg-black/20 p-2 rounded break-all">
                    {showPrivateKey ? wallet.privateKey : '•'.repeat(64)}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-300">Seed-фраза:</span>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowMnemonic(!showMnemonic)}
                        className="hover:bg-white/10"
                      >
                        {showMnemonic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(wallet.mnemonic, 'Seed-фраза')}
                        className="hover:bg-white/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs bg-black/20 p-2 rounded">
                    {showMnemonic ? wallet.mnemonic : '•'.repeat(wallet.mnemonic.length)}
                  </p>
                  <p className="text-xs text-yellow-300">
                    ⚠️ Никому не показывайте вашу seed-фразу!
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Меню действий */}
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
              <CreditCard className="w-5 h-5 mr-3" />
              История транзакций
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
              <Coins className="w-5 h-5 mr-3" />
              Пополнить баланс
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
              <Settings className="w-5 h-5 mr-3" />
              Настройки
            </Button>
            
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
              <Shield className="w-5 h-5 mr-3" />
              Безопасность
            </Button>
            
            {wallet && (
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-400 hover:bg-red-500/10"
                onClick={deleteWallet}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Удалить кошелек
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileMenu;
