
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'neomorphism' | 'gradient' | 'floating' | 'holographic';
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
    default: "bg-card border-border hover:border-primary/30 transition-all duration-500",
    glass: "glass-morphism border-0 backdrop-blur-3xl",
    neomorphism: "neomorphism transition-all duration-500 hover:shadow-2xl",
    gradient: "gradient-border bg-card overflow-hidden",
    floating: "neomorphism floating-element hover:shadow-2xl hover:shadow-primary/20",
    holographic: "holographic-card border-primary/20 backdrop-blur-2xl overflow-hidden"
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden cursor-pointer group transition-all duration-500 transform-gpu",
        hover && "hover:scale-105 hover:-translate-y-2",
        onClick && "micro-bounce active:scale-95",
        variantClasses[variant],
        className
      )}
      onClick={onClick}
      style={style}
    >
      {/* Holographic shimmer effect */}
      {variant === 'holographic' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-accent/50 to-transparent" />
        </>
      )}
      
      {/* Enhanced gradient effects */}
      {variant === 'gradient' && (
        <>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </>
      )}
      
      {/* Floating element glow */}
      {variant === 'floating' && (
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {/* Glass morphism enhancement */}
      {variant === 'glass' && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Universal hover effect */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      )}
      
      {/* Ambient border glow */}
      <div className="absolute inset-0 rounded-lg border border-primary/0 group-hover:border-primary/30 transition-colors duration-500" />
    </Card>
  );
};

export default ModernCard;
