
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Camera } from 'lucide-react';

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (product: any) => void;
}

const CreateProductModal = ({ isOpen, onClose, onCreate }: CreateProductModalProps) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Электроника');
  const [condition, setCondition] = useState('Новое');
  const [isAuction, setIsAuction] = useState(false);
  const [auctionDuration, setAuctionDuration] = useState('7');

  const categories = ['Электроника', 'Одежда', 'Дом и сад', 'Спорт', 'Автомобили', 'Книги'];
  const conditions = ['Новое', 'Б/у отличное', 'Б/у хорошее', 'Б/у удовлетворительное'];

  const handleSubmit = () => {
    if (!title || !price) return;

    const newProduct = {
      id: Date.now(),
      title,
      price: parseInt(price),
      description,
      category,
      condition,
      isAuction,
      timeLeft: isAuction ? `${auctionDuration}д 0ч` : null,
      image: '📦',
      seller: 'Мой магазин',
      rating: 5.0,
      reviews: 0,
      location: 'Москва',
      shipping: 'Быстрая доставка',
      views: 0,
      watchers: 0,
      buyItNow: !isAuction
    };

    onCreate(newProduct);
    setTitle('');
    setPrice('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-slate-900 border-white/20 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-xl">Создать объявление</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Название товара</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: iPhone 15 Pro Max"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Цена (COSMO)</label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1000"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
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

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Состояние</label>
              <div className="flex flex-wrap gap-2">
                {conditions.map((cond) => (
                  <Badge
                    key={cond}
                    variant={condition === cond ? "default" : "outline"}
                    className={`cursor-pointer ${
                      condition === cond
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                        : 'border-white/30 text-white hover:bg-white/10'
                    }`}
                    onClick={() => setCondition(cond)}
                  >
                    {cond}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Описание</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Подробное описание товара..."
                className="w-full h-20 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-gray-400 resize-none"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="auction"
                checked={isAuction}
                onChange={(e) => setIsAuction(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="auction" className="text-white text-sm">Продавать через аукцион</label>
            </div>

            {isAuction && (
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Длительность аукциона (дни)</label>
                <Input
                  type="number"
                  value={auctionDuration}
                  onChange={(e) => setAuctionDuration(e.target.value)}
                  min="1"
                  max="30"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            )}

            <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white text-sm mb-2">Добавить фото товара</p>
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Camera className="w-4 h-4 mr-2" />
                Выбрать фото
              </Button>
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
                onClick={handleSubmit}
                disabled={!title || !price}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Создать
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateProductModal;
