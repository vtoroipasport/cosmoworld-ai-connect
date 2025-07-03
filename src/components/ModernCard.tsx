
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'neomorphism' | 'gradient' | 'floating';
  onClick?: () => void;
  style?: React.CSSProperties;
  hover?: boolean;
}

const ModernCard = ({ 
  children, 
  className, 
  variant = 'default',
  onClick,
  style,
  hover = true
}: ModernCardProps) => {
  const variantClasses = {
    default: "bg-card border-border hover:border-primary/30 transition-all duration-300",
    glass: "glass-morphism border-0",
    neomorphism: "neomorphism transition-all duration-300 hover:shadow-lg",
    gradient: "gradient-border bg-card",
    floating: "neomorphism floating-element hover:shadow-2xl"
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden cursor-pointer group transition-all duration-300",
        hover && "hover:scale-[1.02] hover:-translate-y-1",
        onClick && "micro-bounce",
        variantClasses[variant],
        className
      )}
      onClick={onClick}
      style={style}
    >
      {variant === 'gradient' && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shimmer" />
      )}
      
      {variant === 'floating' && (
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
      
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      )}
    </Card>
  );
};

export default ModernCard;
