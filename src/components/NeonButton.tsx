
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
    primary: "bg-gray-800 text-white hover:bg-gray-700 border-gray-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300",
    outline: "bg-transparent text-gray-700 hover:bg-gray-100 border-gray-400"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm h-9",
    md: "px-6 py-3 text-sm h-10",
    lg: "px-8 py-3 text-base h-11",
    xl: "px-10 py-4 text-lg h-12"
  };

  return (
    <Button 
      className={cn(
        "relative overflow-hidden font-medium transition-all duration-200",
        "border rounded-lg flex items-center justify-center",
        "hover:scale-[1.01] hover:-translate-y-0.5",
        "modern-shadow hover:modern-shadow-lg",
        "whitespace-nowrap",
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </Button>
  );
};

export default NeonButton;
