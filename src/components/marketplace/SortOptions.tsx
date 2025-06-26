
import React from 'react';
import NeonButton from '@/components/NeonButton';

interface SortOption {
  id: string;
  name: string;
}

interface SortOptionsProps {
  sortOptions: SortOption[];
  sortBy: string;
  onSortChange: (sortId: string) => void;
}

const SortOptions = ({ sortOptions, sortBy, onSortChange }: SortOptionsProps) => {
  return (
    <div className="max-w-md mx-auto px-4 pb-4">
      <div className="flex space-x-1 overflow-x-auto pb-2">
        {sortOptions.map((sort) => (
          <NeonButton
            key={sort.id}
            onClick={() => onSortChange(sort.id)}
            variant={sortBy === sort.id ? 'primary' : 'secondary'}
            size="sm"
            className="whitespace-nowrap text-xs px-2 py-1 min-w-fit"
          >
            <span className="text-xs">{sort.name}</span>
          </NeonButton>
        ))}
      </div>
    </div>
  );
};

export default SortOptions;
