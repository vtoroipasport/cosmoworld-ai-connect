
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Star, Mic, Briefcase, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

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
            <h1 className="text-gray-900 font-bold text-xl">CosmoJobs</h1>
          </div>
        </div>
      </div>

      {/* Voice Search */}
      <div className="max-w-md mx-auto px-4 py-6">
        <ModernCard className="p-6 text-center bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
          <div className="mb-4">
            <NeonButton
              onClick={handleVoiceSearch}
              className={`w-16 h-16 rounded-full transition-all duration-300 ${
                isListening
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                  : 'bg-gradient-to-r from-emerald-500 to-blue-600 hover:scale-110'
              }`}
            >
              <Mic className="w-8 h-8 text-white" />
            </NeonButton>
          </div>
          <h2 className="text-gray-900 text-lg font-semibold mb-2">Голосовой поиск работы</h2>
          <p className="text-emerald-600 text-sm">
            {isListening 
              ? 'Слушаю команду...' 
              : 'Скажите: "Найди работу курьера рядом"'
            }
          </p>
        </ModernCard>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Поиск работы или исполнителей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="flex space-x-2">
          <NeonButton
            onClick={() => setActiveTab('jobs')}
            variant={activeTab === 'jobs' ? 'primary' : 'secondary'}
            className="flex-1"
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Работа
          </NeonButton>
          <NeonButton
            onClick={() => setActiveTab('freelancers')}
            variant={activeTab === 'freelancers' ? 'primary' : 'secondary'}
            className="flex-1"
          >
            <User className="w-4 h-4 mr-2" />
            Исполнители
          </NeonButton>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 pb-6">
        {activeTab === 'jobs' ? (
          <div className="space-y-3">
            <h3 className="text-gray-900 text-lg font-semibold mb-4">Вакансии рядом</h3>
            {jobs.map((job) => (
              <ModernCard
                key={job.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-gray-900 font-medium">{job.title}</h4>
                      {job.urgent && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Срочно
                        </span>
                      )}
                    </div>
                    <p className="text-emerald-600 text-sm">{job.company}</p>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm">{job.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    {job.location}
                  </div>
                  <span className="text-emerald-600 font-semibold">{job.salary}</span>
                </div>
              </ModernCard>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-gray-900 text-lg font-semibold mb-4">Исполнители рядом</h3>
            {freelancers.map((freelancer) => (
              <ModernCard
                key={freelancer.id}
                className="p-4 flex items-center space-x-3 cursor-pointer hover:shadow-md transition-shadow bg-white"
              >
                <div className="text-3xl">{freelancer.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-gray-900 font-medium">{freelancer.name}</h4>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm">{freelancer.rating}</span>
                    </div>
                  </div>
                  <p className="text-purple-600 text-sm mb-1">{freelancer.specialty}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {freelancer.location}
                    </div>
                    <span className="text-purple-600 font-semibold">{freelancer.price}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{freelancer.completed} заказов выполнено</p>
                </div>
              </ModernCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
