import { UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };
  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={cn('flex items-center gap-2 text-primary', className)}>
      <UtensilsCrossed className={cn(sizeClasses[size])} />
      <span
        className={cn(
          'font-headline font-bold text-foreground',
          textSizeClasses[size]
        )}
      >
        Achariya College
      </span>
    </div>
  );
}
