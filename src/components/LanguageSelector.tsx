
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, Search } from 'lucide-react';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import ModernCard from '@/components/ModernCard';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Globe className="w-4 h-4 mr-2" />
        {currentLanguage?.flag}
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <ModernCard className="w-64 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
            
            <div className="max-h-48 overflow-y-auto space-y-1">
              {filteredLanguages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? "default" : "ghost"}
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </Button>
              ))}
            </div>
          </ModernCard>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
