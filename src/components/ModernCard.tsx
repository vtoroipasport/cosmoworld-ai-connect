
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'neon' | 'holographic' | 'cyber' | 'quantum';
  glow?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const ModernCard = ({ 
  children, 
  className, 
  variant = 'glass', 
  glow = false,
  onClick,
  style 
}: ModernCardProps) => {
  const baseClasses = "relative overflow-hidden transition-all duration-700 cursor-pointer group transform-gpu perspective-1000";
  
  const variantClasses = {
    glass: "glass-ultra hover:bg-white/10 hover:backdrop-blur-3xl",
    neon: "bg-black/60 border-2 border-neon-blue/30 hover:border-neon-blue hover:bg-black/40",
    holographic: "holographic-advanced animate-holographic-shift border border-white/20 hover:border-white/40",
    cyber: "bg-gradient-to-br from-cyber-dark/80 to-cyber-medium/60 border border-neon-cyan/30 hover:border-neon-cyan backdrop-blur-xl",
    quantum: "bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 hover:border-purple-400 backdrop-blur-2xl"
  };

  const glowClasses = glow ? "neon-glow-intense hover:animate-glow-pulse" : "";

  return (
    <Card 
      className={cn(
        baseClasses,
        variantClasses[variant],
        glowClasses,
        "hover:scale-110 hover:-translate-y-4 hover:rotate-y-12",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        className
      )}
      onClick={onClick}
      style={style}
    >
      {/* Dynamic background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />
      <div className="absolute inset-0 animate-neural-network opacity-0 group-hover:opacity-30 transition-opacity duration-700" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0,245,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,20,147,0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(57,255,20,0.1) 0%, transparent 50%)'
      }} />
      
      {/* Energy border effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 energy-border rounded-lg"></div>
      </div>
      
      {/* Data stream effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-data-stream"></div>
      
      {/* Content */}
      <div className="relative z-10 transform transition-transform duration-500 group-hover:translateZ-20">
        {children}
      </div>
      
      {/* Holographic shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </Card>
  );
};

export default ModernCard;
