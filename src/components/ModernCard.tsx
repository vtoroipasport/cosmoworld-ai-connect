
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
    default: "bg-white border-gray-200 hover:border-gray-300",
    glass: "bg-white/80 backdrop-blur-sm border-gray-200/50",
    neon: "bg-white border-blue-200 hover:border-blue-300",
    holographic: "bg-gradient-to-br from-white to-gray-50 border-gray-200"
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer group",
        "modern-shadow hover:modern-shadow-lg",
        "hover:scale-[1.02] hover:-translate-y-1",
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
