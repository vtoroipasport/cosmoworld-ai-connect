
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';

interface TelegramButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
  haptic?: boolean;
}

const TelegramButton: React.FC<TelegramButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  size = 'default',
  className = '',
  disabled = false,
  haptic = true,
  ...props
}) => {
  const { hapticFeedback } = useTelegramWebApp();

  const handleClick = () => {
    if (haptic) {
      hapticFeedback('light');
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default TelegramButton;
