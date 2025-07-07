import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Briefcase, MapPin, Clock, DollarSign, Users, Star, Search, Filter, Zap, TrendingUp, Award, Globe, Heart, Bot, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ServicePageLayout from '@/components/ServicePageLayout';

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('Любая');
  const [salaryRange, setSalaryRange] = useState('Любая');

  const jobListings = [
    {
      id: 1,
      title: 'Менеджер по продажам',
      company: 'ООО "Рога и Копыта"',
      location: 'Москва, ул. Тверская, 10',
      type: 'Полный день',
      salary: 'от 80 000 ₽',
      rating: 4.5,
      isFeatured: true,
      isRemote: false
    },
    {
      id: 2,
      title: 'Разработчик Python',
      company: 'Яндекс',
      location: 'Санкт-Петербург, Невский пр., 28',
      type: 'Удаленная работа',
      salary: 'от 120 000 ₽',
      rating: 4.8,
      isFeatured: true,
      isRemote: true
    },
    {
      id: 3,
      title: 'Дизайнер UI/UX',
      company: 'Студия Артемия Лебедева',
      location: 'Москва, ул. Большая Никитская, 12',
      type: 'Проектная работа',
      salary: 'по договоренности',
      rating: 4.2,
      isFeatured: false,
      isRemote: false
    },
    {
      id: 4,
      title: 'Бухгалтер',
      company: 'ООО "Бухгалтерские услуги"',
      location: 'Казань, ул. Баумана, 7',
      type: 'Полный день',
      salary: 'от 50 000 ₽',
      rating: 4.0,
      isFeatured: false,
      isRemote: false
    },
    {
      id: 5,
      title: 'Водитель',
      company: 'Яндекс.Такси',
      location: 'Екатеринбург, ул. Ленина, 24',
      type: 'Сменный график',
      salary: 'от 60 000 ₽',
      rating: 4.3,
      isFeatured: false,
      isRemote: false
    }
  ];

  const handleSearch = () => {
    if (!searchTerm) {
      toast({
        title: "Ошибка",
        description: "Введите ключевое слово для поиска",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Поиск работы",
      description: `Выполняется поиск работы по запросу "${searchTerm}" в городе ${location || 'не указан'}`,
    });
  };

  const handleJobClick = (jobId: number) => {
    toast({
      title: "Вакансия",
      description: `Открывается страница вакансии #${jobId}`,
    });
  };

  return (
    <ServicePageLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-indigo-900 dark:to-blue-900">
        {/* Header */}
        <div className="sticky top-0 z-40 w-full glass-morphism-2025 border-b border-border/10">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Назад
              </Button>
              <h1 className="text-lg font-bold">Cosmo Job</h1>
              <Button variant="ghost" size="sm">
                <Globe className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-md mx-auto px-4 py-6">
          <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-4">Поиск работы</h2>
            <div className="grid gap-4">
              <Input
                type="text"
                placeholder="Ключевое слово (например, Python)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Город (необязательно)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <div className="flex items-center space-x-3">
                <select
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md px-3 py-2"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option>Любая</option>
                  <option>Полный день</option>
                  <option>Удаленная работа</option>
                  <option>Проектная работа</option>
                </select>
                <select
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md px-3 py-2"
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                >
                  <option>Любая</option>
                  <option>от 50 000 ₽</option>
                  <option>от 80 000 ₽</option>
                  <option>от 120 000 ₽</option>
                </select>
              </div>
              <Button className="w-full" onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Найти
              </Button>
            </div>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="max-w-md mx-auto px-4 py-6">
          <h2 className="text-lg font-bold mb-4">Результаты</h2>
          <div className="grid gap-4">
            {jobListings.map((job) => (
              <Card
                key={job.id}
                className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => handleJobClick(job.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-md font-bold">{job.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 inline-block mr-1" />
                      {job.location}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 inline-block mr-1" />
                      {job.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{job.salary}</p>
                    <div className="flex items-center justify-end">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{job.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  {job.isFeatured && (
                    <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                      <TrendingUp className="w-3 h-3 inline-block mr-1" />
                      Топ
                    </div>
                  )}
                  {job.isRemote && (
                    <div className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                      <Globe className="w-3 h-3 inline-block mr-1" />
                      Удаленно
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="sticky bottom-0 z-40 w-full glass-morphism-2025 border-t border-border/10">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm">
                <Briefcase className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Users className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Award className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default Jobs;
