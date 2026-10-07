import { useState } from 'react';
import * as Icons from 'lucide-react';
import { initialRows } from '@/data/mockData';
import { PageHeader } from '@/components/shared/PageHeader';
import { ChartCard } from '@/components/shared/ChartCard';
import { cn } from '@/lib/utils';

export function Analytics() {
  const [period, setPeriod] = useState('Q2 2024');

  const metrics = [
    { value: '₹72.4L', label: 'Network revenue', change: '+11.8%', icon: Icons.IndianRupee },
    { value: '2,314', label: 'Services completed', change: '+17.2%', icon: Icons.Wrench },
    { value: '68.4%', label: 'Customer retention', change: '+4.6%', icon: Icons.RefreshCw },
    { value: '84.6%', label: 'Avg. bay utilization', change: '+8.1%', icon: Icons.Gauge },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Intelligence"
        title="Analytics"
        description="See what is moving through your network — and where to focus next."
      />
      <div className="mb-5 flex justify-end">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="h-9 rounded-lg border bg-card px-3 text-xs font-semibold"
        >
          <option>Q2 2024</option>
          <option>Q1 2024</option>
          <option>Last 12 months</option>
        </select>
      </div>
      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ value, label, change, icon: Icon }) => (
          <div className="card-shell p-4" key={label}>
            <div className="mb-4 flex justify-between">
              <span className="text-xs text-muted-foreground">{label}</span>
              <Icon size={17} className="text-cyan-600" />
            </div>
            <div className="font-display text-2xl font-bold">{value}</div>
            <div className="mt-1 text-[11px] font-semibold text-emerald-600">{change} vs previous period</div>
          </div>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_.9fr]">
        <ChartCard
          title="Revenue & service volume"
          detail={`Network performance · ${period}`}
          range="Last 30 days"
          setRange={() => undefined}
          revenue
        />
        <div className="card-shell p-5">
          <h2 className="font-display text-base font-bold">Common issues</h2>
          <p className="mt-1 text-xs text-muted-foreground">What technicians are seeing most</p>
          <div className="mt-6 space-y-4">
            {[
              ['Brake wear', 72, '1,124'],
              ['AC performance', 58, '904'],
              ['Battery health', 44, '682'],
              ['Wheel alignment', 36, '514'],
              ['Engine noise', 24, '364'],
            ].map(([x, n, count]) => (
              <div key={String(x)}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span>{x}</span>
                  <span className="font-mono text-muted-foreground">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-slate-900" style={{ width: `${n}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-shell p-5">
          <h2 className="font-display text-base font-bold">Branch comparison</h2>
          <div className="mt-5 space-y-4">
            {initialRows.branches.map((b, i) => (
              <div key={b.id} className="flex items-center gap-3">
                <span className="w-5 font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>{b.name}</span>
                    <span>{b.amount}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-muted">
                    <div
                      className={cn(
                        'h-full rounded-full',
                        i === 0 ? 'bg-cyan-500' : i === 1 ? 'bg-slate-700' : 'bg-slate-400'
                      )}
                      style={{ width: `${92 - i * 17}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-shell p-5">
          <h2 className="font-display text-base font-bold">Vehicle mix</h2>
          <p className="mt-1 text-xs text-muted-foreground">Serviced vehicles this quarter</p>
          <div className="mt-7 flex items-center gap-7">
            <div
              className="relative grid h-32 w-32 shrink-0 place-items-center rounded-full"
              style={{
                background:
                  'conic-gradient(#06b6d4 0 37%, #334155 37% 63%, #94a3b8 63% 81%, #cbd5e1 81% 100%)',
              }}
            >
              <div className="grid h-20 w-20 place-items-center rounded-full bg-card">
                <div className="text-center">
                  <div className="font-display text-lg font-bold">2.3k</div>
                  <div className="text-[9px] text-muted-foreground">vehicles</div>
                </div>
              </div>
            </div>
            <div className="space-y-2.5 text-[11px]">
              {[
                ['Honda', '37%', 'bg-cyan-500'],
                ['Hyundai', '26%', 'bg-slate-700'],
                ['Tata', '18%', 'bg-slate-400'],
                ['Other', '19%', 'bg-slate-200'],
              ].map(([x, n, c]) => (
                <div className="flex items-center gap-2" key={x}>
                  <span className={cn('h-2 w-2 rounded-full', c)} />
                  {x}
                  <strong className="ml-2">{n}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
