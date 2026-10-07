import { useState } from 'react';
import * as Icons from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { initialRows } from '@/data/mockData';
import { PageHeader } from '@/components/shared/PageHeader';
import { ChartCard } from '@/components/shared/ChartCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const [range, setRange] = useState('Last 30 days');
  const [, setLocation] = useLocation();

  const kpis = [
    { label: 'Appointments', value: '184', change: '+12.8%', icon: Icons.CalendarDays, color: 'cyan' },
    { label: 'Active services', value: '42', change: '+6.4%', icon: Icons.Wrench, color: 'amber' },
    { label: 'Completed services', value: '638', change: '+18.2%', icon: Icons.CircleCheck, color: 'emerald' },
    { label: 'Revenue', value: '₹24.8L', change: '+9.6%', icon: Icons.TrendingUp, color: 'violet' },
    { label: 'Customers', value: '2,486', change: '+14.1%', icon: Icons.Users, color: 'blue' },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Tuesday, 16 July 2024"
        title="Good morning, Rohit"
        description="Here’s the operating pulse across your service network."
        action={() => setLocation('/appointments')}
        actionLabel="New appointment"
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className={cn('card-shell animate-rise p-4', `stagger-${i + 1}`)}
              data-testid={`card-kpi-${k.label.toLowerCase().replaceAll(' ', '-')}`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={cn(
                    'grid h-9 w-9 place-items-center rounded-lg',
                    k.color === 'cyan' && 'bg-cyan-50 text-cyan-600',
                    k.color === 'amber' && 'bg-amber-50 text-amber-600',
                    k.color === 'emerald' && 'bg-emerald-50 text-emerald-600',
                    k.color === 'violet' && 'bg-violet-50 text-violet-600',
                    k.color === 'blue' && 'bg-blue-50 text-blue-600'
                  )}
                >
                  <Icon size={17} />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <Icons.ArrowUpRight size={13} />
                  {k.change}
                </span>
              </div>
              <div className="text-[12px] text-muted-foreground">{k.label}</div>
              <div className="mt-1 font-display text-[25px] font-bold tracking-tight text-slate-900">
                {k.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-6 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <ChartCard
          title="Service volume"
          detail="Completed work orders by week"
          range={range}
          setRange={setRange}
        />
        <ChartCard
          title="Revenue performance"
          detail="Gross revenue · all branches"
          range={range}
          setRange={setRange}
          revenue
        />
      </div>

      <div className="mb-6 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
        <div className="card-shell p-5">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="font-display text-base font-bold">Upcoming appointments</h2>
              <p className="mt-1 text-xs text-muted-foreground">The next vehicles entering your bays</p>
            </div>
            <Link href="/appointments" className="text-xs font-semibold text-cyan-700 hover:text-cyan-600">
              View calendar <Icons.ArrowUpRight className="ml-1 inline" size={13} />
            </Link>
          </div>
          <div className="space-y-1">
            {initialRows.appointments.slice(0, 4).map((r, i) => (
              <div
                key={r.id}
                className="flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted"
                data-testid={`row-upcoming-${i}`}
              >
                <div className="w-12 text-center">
                  <div className="font-mono text-[11px] font-bold text-slate-800">
                    {r.meta.split(' · ')[1]}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {r.meta.includes('Tomorrow') ? '17 Jul' : 'Today'}
                  </div>
                </div>
                <div className="h-9 w-px bg-border" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold">{r.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {r.secondary} · {r.detail.split(' · ')[1]}
                  </div>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="card-shell p-5">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="font-display text-base font-bold">Service status</h2>
              <p className="mt-1 text-xs text-muted-foreground">42 active jobs right now</p>
            </div>
            <Icons.MoreHorizontal size={18} className="text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {[
              ['Inspection', 9, 'bg-amber-400'],
              ['In progress', 18, 'bg-cyan-500'],
              ['Awaiting approval', 7, 'bg-violet-400'],
              ['Ready for pickup', 8, 'bg-emerald-500'],
            ].map(([label, value, color]) => (
              <div key={String(label)}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-medium">{label}</span>
                  <span className="font-mono text-muted-foreground">{value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn('bar-fill h-full rounded-full', String(color))}
                    style={{ width: `${(Number(value) / 42) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t pt-4 text-xs text-muted-foreground">
            Average bay utilization <strong className="float-right text-foreground">84.6%</strong>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr_.78fr]">
        <div className="card-shell p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold">Recent activity</h2>
            <button onClick={() => setLocation('/reports')} className="text-xs font-semibold text-cyan-700">
              See all
            </button>
          </div>
          {[
            'Job card JC-7742 moved to inspection',
            'Sonal Patel added as a new customer',
            'Part alert: Front brake pad set · Creta',
            'Report “June operations” generated',
          ].map((x, i) => (
            <div key={x} className="flex gap-3 border-b py-3 last:border-0">
              <div
                className={cn(
                  'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full',
                  i === 2 ? 'bg-amber-50 text-amber-600' : 'bg-cyan-50 text-cyan-600'
                )}
              >
                <Icons.Activity size={14} />
              </div>
              <div>
                <div className="text-xs font-medium">{x}</div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">{i + 1}h ago · Andheri West</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-shell p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold">Vehicle trends</h2>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              This quarter
            </span>
          </div>
          <div className="flex h-[136px] items-end gap-3 border-b px-2">
            {[
              ['Honda', 72],
              ['Hyundai', 88],
              ['Tata', 57],
              ['Mahindra', 44],
              ['Toyota', 31],
            ].map(([label, height]) => (
              <div key={String(label)} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="relative w-full max-w-9 rounded-t-md bg-cyan-100"
                  style={{ height: `${Number(height)}%` }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-t-md bg-cyan-500/80" />
                </div>
                <span className="text-[9px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-cyan-500" /> 1,042 vehicles serviced
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-slate-900 p-5 text-white">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-cyan-400/20" />
          <div className="absolute -right-2 top-1 h-20 w-20 rounded-full border border-cyan-400/15" />
          <div className="relative">
            <div className="mb-8 flex items-center gap-2 text-cyan-300">
              <Icons.Sparkles size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[.18em]">AI signal</span>
            </div>
            <h3 className="font-display text-lg font-bold leading-snug">
              Andheri West can fit 14% more jobs next week.
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Demand rises on Tuesdays. Shift one technician from Vastrapur to protect SLAs.
            </p>
            <Link
              href="/ai-insights"
              className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300"
            >
              Review insight <Icons.ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
