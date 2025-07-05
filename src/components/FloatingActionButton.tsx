
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'accent' | 'holographic';
}

const FloatingActionButton = ({ 
  onClick, 
  icon = <Plus className="w-6 h-6" />, 
  className,
  variant = 'primary' 
}: FloatingActionButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const variantClasses = {
    default: "bg-card text-foreground shadow-2xl shadow-black/20",
    primary: "bg-gradient-to-br from-primary to-accent text-white shadow-2xl shadow-primary/40",
    accent: "bg-gradient-to-br from-accent to-primary text-white shadow-2xl shadow-accent/40",
    holographic: "bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 text-white shadow-2xl shadow-purple-500/50"
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "fixed bottom-6 right-5 w-14 h-14 rounded-2xl z-50",
        "flex items-center justify-center",
        "transition-all duration-500 cubic-bezier(0.23, 1, 0.32, 1)",
        "hover:scale-110 hover:-translate-y-1 active:scale-95",
        "floating-element pulse-glow magnetic-element",
        "backdrop-blur-xl border border-white/10",
        isPressed ? "scale-90" : "",
        variantClasses[variant],
        className
      )}
    >
      {/* Background glow effects */}
      <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl animate-pulse" />
      
      {/* Holographic background */}
      {variant === 'holographic' && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-green-500 opacity-90 animate-gradient-shift" />
      )}
      
      {/* Shine effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-2xl border border-white/20 animate-pulse" />
      
      {/* Icon container */}
      <span className="relative z-10 transform transition-transform duration-200">
        {icon}
      </span>
      
      {/* Neural particles */}
      <div className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full animate-pulse" />
      <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
      <div className="absolute top-2 left-1 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
    </button>
  );
};

export default FloatingActionButton;
