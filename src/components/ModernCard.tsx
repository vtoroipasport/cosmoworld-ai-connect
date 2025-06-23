
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'neon' | 'holographic';
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
  const baseClasses = "relative overflow-hidden transition-all duration-500 cursor-pointer group";
  
  const variantClasses = {
    glass: "glass-morphism hover:bg-white/20",
    neon: "bg-black/40 border border-neon-blue/50 hover:border-neon-blue",
    holographic: "holographic animate-gradient-shift border border-white/30"
  };

  const glowClasses = glow ? "neon-glow hover:shadow-[0_0_30px_rgba(0,245,255,0.7)]" : "";

  return (
    <Card 
      className={cn(
        baseClasses,
        variantClasses[variant],
        glowClasses,
        "hover:scale-105 hover:-translate-y-2",
        className
      )}
      onClick={onClick}
      style={style}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
};

export default ModernCard;
