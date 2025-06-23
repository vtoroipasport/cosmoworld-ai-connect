
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'cyber' | 'quantum' | 'plasma';
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
  const baseClasses = "relative overflow-hidden font-bold uppercase tracking-widest transition-all duration-500 border-2 transform-gpu perspective-1000 font-rajdhani";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-blue border-neon-blue text-white hover:from-neon-cyan hover:to-neon-blue hover:border-neon-cyan hover:text-black",
    secondary: "bg-transparent border-neon-green text-neon-green hover:bg-gradient-to-r hover:from-neon-green hover:to-neon-yellow hover:text-black hover:border-neon-yellow",
    accent: "bg-gradient-to-r from-neon-pink via-neon-magenta to-neon-pink border-neon-pink text-white hover:from-neon-magenta hover:to-neon-purple hover:border-neon-magenta",
    cyber: "bg-gradient-to-r from-cyber-dark to-cyber-medium border-neon-cyan text-neon-cyan hover:bg-gradient-to-r hover:from-neon-cyan hover:to-cyber-accent hover:text-black hover:border-neon-blue",
    quantum: "bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-400 text-purple-200 hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-purple-300",
    plasma: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 border-orange-400 text-white hover:from-red-500 hover:via-pink-500 hover:to-purple-500 hover:border-red-400"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg"
  };

  return (
    <Button 
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        "hover:animate-glow-pulse hover:shadow-2xl hover:scale-105 hover:-translate-y-1",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        disabled && "opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10 drop-shadow-lg">{children}</span>
      
      {/* Particle effects */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="absolute w-1 h-1 bg-white rounded-full top-2 left-4 animate-ping"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full bottom-2 right-4 animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full top-1/2 left-1/2 animate-ping" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Energy pulse effect */}
      <div className="absolute inset-0 rounded border-2 border-current opacity-0 hover:opacity-60 hover:animate-pulse scale-110"></div>
      
      {/* Holographic stripe */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </Button>
  );
};

export default NeonButton;
