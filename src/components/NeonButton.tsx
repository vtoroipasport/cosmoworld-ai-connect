
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
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
  const variantClasses = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 border-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 border-gray-200",
    outline: "bg-transparent text-gray-900 hover:bg-gray-50 border-gray-300"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg"
  };

  return (
    <Button 
      className={cn(
        "relative overflow-hidden font-medium transition-all duration-200",
        "border rounded-lg",
        "hover:scale-[1.02] hover:-translate-y-0.5",
        "modern-shadow hover:modern-shadow-lg",
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
};

export default NeonButton;
