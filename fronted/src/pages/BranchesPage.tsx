import { useState } from 'react';
import * as Icons from 'lucide-react';
import { initialRows } from '@/data/mockData';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/shared/Button';
import { downloadText } from '@/lib/download';
import { cn } from '@/lib/utils';

export function BranchesPage() {
  const [selected, setSelected] = useState(initialRows.branches[0]);
  const [sort, setSort] = useState('Revenue');

  const sorted = [...initialRows.branches].sort((a, b) =>
    sort === 'Utilization'
      ? Number(b.meta.match(/[\d.]+%/)?.[0] || 0) - Number(a.meta.match(/[\d.]+%/)?.[0] || 0)
      : Number((b.amount || '0').replace(/[₹L,]/g, '')) - Number((a.amount || '0').replace(/[₹L,]/g, ''))
  );

  return (
    <>
      <PageHeader
        eyebrow="Intelligence · Network"
        title="Branches"
        description="Compare locations on the signals that matter: throughput, revenue, and capacity."
        action={() =>
          setSelected(initialRows.branches[(initialRows.branches.indexOf(selected) + 1) % initialRows.branches.length])
        }
        actionLabel="Cycle branch"
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {(
          [
            ['12', 'Active branches', '9 cities', Icons.Network],
            ['84.6%', 'Network utilization', '+8.1%', Icons.Gauge],
            ['₹4.2Cr', 'Quarter revenue', '+11.8%', Icons.IndianRupee],
          ] as const
        ).map(([value, label, detail, Icon]) => (
          <div className="card-shell p-4" key={label}>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                <Icon size={17} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="font-display text-2xl font-bold">{value}</div>
              </div>
              <span className="ml-auto text-[10px] text-muted-foreground">{detail}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-5 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-9 rounded-lg border bg-card px-3 text-xs font-semibold"
        >
          <option>Revenue</option>
          <option>Utilization</option>
        </select>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.3fr_.7fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {sorted.map((branch, index) => (
            <button
              key={branch.id}
              onClick={() => setSelected(branch)}
              className={cn(
                'card-shell p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md',
                selected.id === branch.id && 'border-cyan-400 ring-2 ring-cyan-100'
              )}
            >
              <div className="flex items-start justify-between">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Icons.MapPin size={17} />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  #{String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h2 className="mt-5 font-display text-base font-bold">{branch.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{branch.detail}</p>
              <div className="mt-4 flex items-center justify-between">
                <StatusBadge status={branch.status} />
                <span className="font-mono text-xs font-bold">{branch.amount}</span>
              </div>
              <div className="mt-4 h-1.5 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${92 - index * 5}%` }}
                />
              </div>
              <div className="mt-1.5 text-[10px] text-muted-foreground">{branch.meta}</div>
            </button>
          ))}
        </div>
        <div className="card-shell p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Branch snapshot</div>
              <h2 className="mt-1 font-display text-xl font-bold">{selected.name}</h2>
            </div>
            <Icons.TrendingUp size={20} className="text-emerald-500" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{selected.detail}</p>
          <div className="mt-6 space-y-4">
            {[
              ['Revenue', selected.amount || '₹0'],
              ['Services', selected.meta.split(' · ')[0]],
              ['Capacity', selected.meta.split(' · ')[1]],
              ['Network rank', selected.secondary || '—'],
            ].map(([key, value]) => (
              <div className="flex justify-between border-b pb-3 text-xs last:border-0" key={key}>
                <span className="text-muted-foreground">{key}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <Button
            className="mt-5 w-full"
            onClick={() =>
              downloadText(
                `${selected.name.toLowerCase().replaceAll(' ', '-')}-branch-report.csv`,
                `Metric,Value\nRevenue,${selected.amount}\nServices,${selected.meta.split(' · ')[0]}\n`
              )
            }
          >
            <Icons.Download size={14} />
            Export branch snapshot
          </Button>
        </div>
      </div>
    </>
  );
}
