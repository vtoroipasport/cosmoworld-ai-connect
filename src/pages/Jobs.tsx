
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Clock, DollarSign, Briefcase, Filter, Bookmark, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'Все', icon: '💼' },
    { id: 'tech', name: 'IT', icon: '💻' },
    { id: 'design', name: 'Дизайн', icon: '🎨' },
    { id: 'marketing', name: 'Маркетинг', icon: '📊' },
    { id: 'sales', name: 'Продажи', icon: '💰' },
    { id: 'remote', name: 'Удаленка', icon: '🏠' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Frontend React Developer',
      company: 'TechCorp',
      location: 'Москва',
      salary: '150-200k',
      type: 'Полная занятость',
      remote: true,
      category: 'tech',
      posted: '2 дня назад',
      description: 'Разработка современных веб-приложений на React',
      requirements: ['React', 'TypeScript', 'Redux'],
      featured: true
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'DesignStudio',
      location: 'СПб',
      salary: '120-150k',
      type: 'Полная занятость',
      remote: false,
      category: 'design',
      posted: '1 день назад',
      description: 'Создание пользовательских интерфейсов',
      requirements: ['Figma', 'Photoshop', 'UX Research'],
      featured: false
    },
    {
      id: 3,
      title: 'Digital Marketing Manager',
      company: 'MarketPro',
      location: 'Удаленно',
      salary: '100-130k',
      type: 'Полная занятость',
      remote: true,
      category: 'marketing',
      posted: '3 дня назад',
      description: 'Управление цифровыми маркетинговыми кампаниями',
      requirements: ['Google Ads', 'Analytics', 'SMM'],
      featured: true
    }
  ];

  const handleSaveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast({
        title: "Удалено из сохраненных",
        description: "Вакансия убрана из избранного",
      });
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast({
        title: "Добавлено в избранное",
        description: "Вакансия сохранена в избранном",
      });
    }
  };

  const handleApply = (job: any) => {
    toast({
      title: "Отклик отправлен!",
      description: `Ваш отклик на позицию "${job.title}" отправлен`,
    });
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="glass-card border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-gray-900 dark:text-white font-bold text-xl">CosmoJobs</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Bookmark className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск вакансий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-md mx-auto px-4 pb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <NeonButton
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'primary' : 'secondary'}
              size="sm"
              className="whitespace-nowrap"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </NeonButton>
          ))}
        </div>
      </div>

      {/* AI Career Assistant */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <ModernCard className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 dark:text-white font-semibold">Карьерный ассистент Cosmo</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Персональные рекомендации вакансий</p>
            </div>
            <NeonButton variant="primary" size="sm">
              Настроить
            </NeonButton>
          </div>
        </ModernCard>
      </div>

      {/* Jobs List */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
            {selectedCategory === 'all' ? 'Все вакансии' : categories.find(c => c.id === selectedCategory)?.name}
          </h3>
          <span className="text-gray-600 dark:text-gray-300 text-sm">{filteredJobs.length} вакансий</span>
        </div>
        
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <ModernCard
              key={job.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-gray-900 dark:text-white font-semibold">{job.title}</h3>
                    {job.featured && (
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-1 rounded">
                        Топ
                      </span>
                    )}
                    {job.remote && (
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded">
                        Remote
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{job.company}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveJob(job.id);
                  }}
                  className="p-1"
                >
                  <Bookmark 
                    className={`w-4 h-4 ${
                      savedJobs.includes(job.id) 
                        ? 'text-blue-500 fill-blue-500' 
                        : 'text-gray-400 dark:text-gray-500'
                    }`} 
                  />
                </Button>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {job.salary}
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {job.posted}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{job.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {job.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                  >
                    {req}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300 text-sm">{job.type}</span>
                <NeonButton 
                  size="sm" 
                  variant="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(job);
                  }}
                >
                  <Send className="w-3 h-3 mr-1" />
                  Откликнуться
                </NeonButton>
              </div>
            </ModernCard>
          ))}
        </div>
      </div>

      {/* Create Resume CTA */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <ModernCard className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700">
          <div className="text-center">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-2">Создайте резюме</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              Увеличьте шансы найти работу мечты
            </p>
            <NeonButton variant="primary" size="sm">
              Создать резюме
            </NeonButton>
          </div>
        </ModernCard>
      </div>
    </div>
  );
};

export default Jobs;
