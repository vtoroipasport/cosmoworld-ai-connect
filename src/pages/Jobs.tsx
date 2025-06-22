
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Star, Clock, Mic, Briefcase, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Jobs = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('jobs');

  const jobs = [
    {
      id: 1,
      title: 'Курьер доставки',
      company: 'CosmoDelivery',
      location: '500м от вас',
      salary: '50-80 COSMO/час',
      rating: 4.8,
      urgent: true,
      description: 'Доставка еды и товаров в центре города'
    },
    {
      id: 2,
      title: 'Водитель такси',
      company: 'CosmoRide',
      location: '1.2км от вас',
      salary: '60-120 COSMO/час',
      rating: 4.9,
      urgent: false,
      description: 'Работа водителем с гибким графиком'
    },
    {
      id: 3,
      title: 'Уборщик офисов',
      company: 'CleanCosmo',
      location: '800м от вас',
      salary: '40-60 COSMO/час',
      rating: 4.6,
      urgent: true,
      description: 'Вечерняя уборка офисных помещений'
    }
  ];

  const freelancers = [
    {
      id: 1,
      name: 'Анна Дизайнер',
      specialty: 'UI/UX дизайн',
      location: '300м от вас',
      rating: 4.9,
      price: '100-200 COSMO/час',
      avatar: '🎨',
      completed: 156
    },
    {
      id: 2,
      name: 'Иван Программист',
      specialty: 'React разработка',
      location: '600м от вас',
      rating: 4.8,
      price: '150-300 COSMO/час',
      avatar: '💻',
      completed: 89
    },
    {
      id: 3,
      name: 'Мария Фотограф',
      specialty: 'Портретная съёмка',
      location: '1.1км от вас',
      rating: 4.7,
      price: '80-150 COSMO/час',
      avatar: '📸',
      completed: 234
    }
  ];

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    console.log('Cosmo AI voice search activated: "Найди работу курьера рядом"');
    
    if (!isListening) {
      setTimeout(() => {
        setSearchQuery('Курьер доставки');
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white font-bold text-xl">CosmoJobs</h1>
          </div>
        </div>
      </div>

      {/* Voice Search */}
      <div className="max-w-md mx-auto px-4 py-6">
        <Card className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 border-emerald-500/30 backdrop-blur-sm">
          <div className="p-6 text-center">
            <div className="mb-4">
              <Button
                onClick={handleVoiceSearch}
                className={`w-16 h-16 rounded-full transition-all duration-300 ${
                  isListening
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                    : 'bg-gradient-to-r from-emerald-500 to-blue-600 hover:scale-110'
                }`}
              >
                <Mic className="w-8 h-8 text-white" />
              </Button>
            </div>
            <h2 className="text-white text-lg font-semibold mb-2">Голосовой поиск работы</h2>
            <p className="text-emerald-300 text-sm">
              {isListening 
                ? 'Слушаю команду...' 
                : 'Скажите: "Найди работу курьера рядом"'
              }
            </p>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск работы или исполнителей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="flex space-x-2">
          <Button
            onClick={() => setActiveTab('jobs')}
            className={`flex-1 ${
              activeTab === 'jobs'
                ? 'bg-gradient-to-r from-emerald-600 to-blue-600'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Работа
          </Button>
          <Button
            onClick={() => setActiveTab('freelancers')}
            className={`flex-1 ${
              activeTab === 'freelancers'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Исполнители
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 pb-6">
        {activeTab === 'jobs' ? (
          <div className="space-y-3">
            <h3 className="text-white text-lg font-semibold mb-4">Вакансии рядом</h3>
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-medium">{job.title}</h4>
                        {job.urgent && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            Срочно
                          </span>
                        )}
                      </div>
                      <p className="text-emerald-300 text-sm">{job.company}</p>
                    </div>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm">{job.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{job.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400 text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {job.location}
                    </div>
                    <span className="text-emerald-400 font-semibold">{job.salary}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-white text-lg font-semibold mb-4">Исполнители рядом</h3>
            {freelancers.map((freelancer) => (
              <Card
                key={freelancer.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                <div className="p-4 flex items-center space-x-3">
                  <div className="text-3xl">{freelancer.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-medium">{freelancer.name}</h4>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 mr-1" />
                        <span className="text-sm">{freelancer.rating}</span>
                      </div>
                    </div>
                    <p className="text-purple-300 text-sm mb-1">{freelancer.specialty}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {freelancer.location}
                      </div>
                      <span className="text-purple-400 font-semibold">{freelancer.price}</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">{freelancer.completed} заказов выполнено</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
