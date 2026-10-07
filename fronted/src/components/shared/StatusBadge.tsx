import { cn } from '@/lib/utils';

export function StatusBadge({ status }: { status: string }) {
  const tone = status.toLowerCase();
  const color =
    tone.includes('critical') || tone.includes('overdue') || tone.includes('risk')
      ? 'rose'
      : tone.includes('progress') || tone.includes('service') || tone.includes('top')
      ? 'cyan'
      : tone.includes('low') || tone.includes('waiting') || tone.includes('approval') || tone.includes('focus')
      ? 'amber'
      : 'emerald';

  return (
    <span
      data-testid={`status-${status.toLowerCase().replaceAll(' ', '-')}`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold',
        color === 'rose' && 'bg-rose-50 text-rose-700',
        color === 'amber' && 'bg-amber-50 text-amber-700',
        color === 'cyan' && 'bg-cyan-50 text-cyan-700',
        color === 'emerald' && 'bg-emerald-50 text-emerald-700'
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          color === 'rose' && 'bg-rose-500',
          color === 'amber' && 'bg-amber-500',
          color === 'cyan' && 'bg-cyan-500',
          color === 'emerald' && 'bg-emerald-500'
        )}
      />
      {status}
    </span>
  );
}
