
import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'accent';
}

const FloatingActionButton = ({ 
  onClick, 
  icon = <Plus className="w-6 h-6" />, 
  className,
  variant = 'primary' 
}: FloatingActionButtonProps) => {
  const variantClasses = {
    default: "bg-card text-foreground shadow-lg",
    primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/25",
    accent: "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 rounded-2xl z-50",
        "flex items-center justify-center",
        "transition-all duration-300 micro-bounce",
        "hover:scale-110 hover:-translate-y-1 active:scale-95",
        "floating-element pulse-glow",
        variantClasses[variant],
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10">{icon}</span>
    </button>
  );
};

export default FloatingActionButton;
