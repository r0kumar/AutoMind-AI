import { cn } from '@/lib/utils';

export interface ChartCardProps {
  title: string;
  detail: string;
  range: string;
  setRange: (value: string) => void;
  revenue?: boolean;
}

export function ChartCard({ title, detail, range, setRange, revenue = false }: ChartCardProps) {
  const points = revenue
    ? '0,104 38,89 76,94 114,69 152,78 190,48 228,55 266,28 304,38 342,15'
    : '0,93 38,77 76,84 114,62 152,69 190,43 228,50 266,25 304,34 342,11';

  return (
    <div className="card-shell p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-bold">{title}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
        </div>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          data-testid={`select-${title.toLowerCase().replaceAll(' ', '-')}-range`}
          className="h-8 rounded-md border bg-card px-2 text-[11px] font-semibold outline-none"
        >
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
        </select>
      </div>
      <div className="relative h-[172px] overflow-hidden rounded-lg bg-slate-50/70">
        <div className="absolute inset-0 flex flex-col justify-between p-3">
          <div className="border-t border-dashed border-slate-200" />
          <div className="border-t border-dashed border-slate-200" />
          <div className="border-t border-dashed border-slate-200" />
          <div className="border-t border-dashed border-slate-200" />
        </div>
        <svg viewBox="0 0 342 120" preserveAspectRatio="none" className="absolute inset-x-4 bottom-5 h-[120px] w-[calc(100%-32px)]">
          <defs>
            <linearGradient id={revenue ? 'rev' : 'vol'} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={revenue ? '#8b5cf6' : '#06b6d4'} stopOpacity=".22" />
              <stop offset="1" stopColor={revenue ? '#8b5cf6' : '#06b6d4'} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline points={`${points} 342,120 0,120`} fill={`url(#${revenue ? 'rev' : 'vol'})`} />
          <polyline
            points={points}
            fill="none"
            stroke={revenue ? '#8b5cf6' : '#06b6d4'}
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="absolute bottom-1.5 left-4 right-4 flex justify-between text-[9px] text-slate-400">
          <span>01 Jul</span>
          <span>08 Jul</span>
          <span>15 Jul</span>
          <span>Today</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className={cn('h-2 w-2 rounded-full', revenue ? 'bg-violet-500' : 'bg-cyan-500')} />
          {revenue ? 'Gross revenue' : 'Completed jobs'}
        </div>
        <div className="font-mono text-xs font-bold">
          {revenue ? '₹24.8L' : '638'} <span className="font-sans font-medium text-emerald-600">↑ 9.6%</span>
        </div>
      </div>
    </div>
  );
}
