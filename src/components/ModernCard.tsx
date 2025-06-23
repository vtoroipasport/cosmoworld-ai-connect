
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const ModernCard = ({ 
  children, 
  className, 
  onClick,
  style 
}: ModernCardProps) => {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer group",
        "bg-white border border-gray-200 hover:border-gray-300",
        "modern-shadow hover:modern-shadow-lg",
        "hover:scale-[1.02] hover:-translate-y-1",
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
