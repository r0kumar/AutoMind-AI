import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" data-testid="brand-automind">
      <img
        src="/logo.png"
        alt="AutoMind AI Logo"
        className="h-9 w-9 rounded-[11px] object-cover shadow-lg shadow-cyan-500/20"
      />
      <div>
        <div className={cn('font-display text-[15px] font-bold tracking-tight', dark ? 'text-white' : 'text-slate-900')}>
          AutoMind <span className="text-cyan-500">AI</span>
        </div>
        <div className={cn('text-[9px] uppercase tracking-[.22em]', dark ? 'text-slate-400' : 'text-slate-500')}>
          Service intelligence
        </div>
      </div>
    </div>
  );
}
