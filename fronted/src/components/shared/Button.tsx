import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  testId?: string;
}

export function Button({
  children,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
  testId,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      data-testid={testId}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3.5 text-sm font-semibold transition-all active:scale-[.98]',
        variant === 'primary' && 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/20 hover:bg-cyan-400',
        variant === 'secondary' && 'border bg-card text-foreground hover:bg-muted',
        variant === 'ghost' && 'text-muted-foreground hover:bg-muted hover:text-foreground',
        variant === 'dark' && 'bg-slate-900 text-white hover:bg-slate-800',
        className
      )}
    >
      {children}
    </button>
  );
}
