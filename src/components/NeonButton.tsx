
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'neon' | 'holographic';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  disabled?: boolean;
  glow?: boolean;
  style?: React.CSSProperties;
}

const NeonButton = ({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  glow = false,
  style
}: NeonButtonProps) => {
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    glass: "glass-morphism text-foreground hover:bg-white/10",
    neon: "bg-primary text-primary-foreground shadow-lg hover:shadow-primary/50 pulse-glow",
    holographic: "holographic-button text-white font-bold shadow-2xl hover:shadow-primary/50"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm h-9 rounded-lg",
    md: "px-6 py-3 text-sm h-10 rounded-xl",
    lg: "px-8 py-3 text-base h-11 rounded-xl",
    xl: "px-10 py-4 text-lg h-12 rounded-2xl"
  };

  return (
    <Button 
      className={cn(
        "relative overflow-hidden font-medium transition-all duration-500 micro-bounce group",
        "hover:scale-105 hover:-translate-y-0.5 active:scale-95",
        "transform-gpu will-change-transform",
        glow && "pulse-glow",
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {/* Holographic background for holographic variant */}
      {variant === 'holographic' && (
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-green-500 opacity-75 animate-gradient-shift" />
      )}
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-30 bg-white transition-opacity duration-200 animate-ripple" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      
      {/* Enhanced glow effect */}
      {glow && (
        <>
          <div className="absolute inset-0 rounded-xl bg-primary/20 blur-sm animate-pulse" />
          <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-lg animate-pulse-glow" />
        </>
      )}
    </Button>
  );
};

export default NeonButton;
