
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'neon' | 'holographic';
  onClick?: () => void;
  style?: React.CSSProperties;
}

const ModernCard = ({ 
  children, 
  className, 
  variant = 'default',
  onClick,
  style 
}: ModernCardProps) => {
  const variantClasses = {
    default: "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
    glass: "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-300/60 dark:border-gray-600/60",
    neon: "bg-white dark:bg-gray-800 border-blue-300 dark:border-blue-600 hover:border-blue-400 dark:hover:border-blue-500",
    holographic: "bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-300 dark:border-gray-600"
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-200 cursor-pointer group",
        "modern-shadow hover:modern-shadow-lg",
        "hover:scale-[1.01] hover:-translate-y-0.5",
        variantClasses[variant],
        className
      )}
      onClick={onClick}
      style={style}
    >
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
};

export default ModernCard;
