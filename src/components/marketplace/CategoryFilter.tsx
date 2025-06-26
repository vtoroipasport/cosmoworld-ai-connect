
import React from 'react';
import NeonButton from '@/components/NeonButton';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="max-w-md mx-auto px-4 pb-4">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <NeonButton
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            variant={selectedCategory === category.id ? 'primary' : 'secondary'}
            size="sm"
            className="whitespace-nowrap min-w-fit px-2 py-1.5 text-xs"
          >
            <span className="mr-1 text-sm">{category.icon}</span>
            <span className="text-xs">{category.name}</span>
          </NeonButton>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
