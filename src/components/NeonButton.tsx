
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

const NeonButton = ({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false
}: NeonButtonProps) => {
  const baseClasses = "relative overflow-hidden font-bold uppercase tracking-wider transition-all duration-300 border-2";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-neon-blue to-neon-purple border-neon-blue text-white hover:from-neon-purple hover:to-neon-pink",
    secondary: "bg-transparent border-neon-green text-neon-green hover:bg-neon-green hover:text-black",
    accent: "bg-gradient-to-r from-neon-orange to-neon-pink border-neon-orange text-white hover:from-neon-pink hover:to-neon-blue"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <Button 
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        "hover:animate-glow hover:shadow-2xl",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </Button>
  );
};

export default NeonButton;
