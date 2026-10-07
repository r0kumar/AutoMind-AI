import { useState } from 'react';
import * as Icons from 'lucide-react';
import { initialRows } from '@/data/mockData';
import type { Row } from '@/types';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { RecordDialog } from '@/components/shared/RecordDialog';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';

export function VehiclesPage() {
  const [records, setRecords] = useState<Row[]>(initialRows.vehicles);
  const [query, setQuery] = useState('');
  const [health, setHealth] = useState('All vehicles');
  const [selected, setSelected] = useState<Row | null>(records[0]);
  const [modal, setModal] = useState(false);

  const filtered = records.filter(
    (item) =>
      `${item.name} ${item.detail} ${item.secondary || ''}`.toLowerCase().includes(query.toLowerCase()) &&
      (health === 'All vehicles' || item.status === health)
  );

  return (
    <>
      <PageHeader
        eyebrow="Workspace · Fleet"
        title="Vehicles"
        description="Track service intervals, ownership, and the next best action for every registration."
        action={() => setModal(true)}
        actionLabel="Add vehicle"
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {(
          [
            ['2,914', 'Vehicles tracked', '+9.2%', Icons.CarFront],
            ['186', 'Due in 30 days', 'Attention', Icons.CalendarClock],
            ['42', 'In service now', 'Across 12 bays', Icons.Wrench],
            ['91%', 'Service history complete', '+3.1%', Icons.FileCheck2],
          ] as const
        ).map(([value, label, detail, Icon]) => (
          <div className="card-shell p-4" key={label}>
            <div className="flex items-start justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
                <Icon size={17} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {detail}
              </span>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">{label}</div>
            <div className="mt-1 font-display text-2xl font-bold">{value}</div>
          </div>
        ))}
      </div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="input-shell flex-1 sm:max-w-[340px]">
          <Icons.Search size={16} className="mr-2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-testid="input-search-vehicles"
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search registration, model, owner..."
          />
        </div>
        <select
          value={health}
          onChange={(e) => setHealth(e.target.value)}
          className="h-10 rounded-lg border bg-card px-3 text-xs font-semibold outline-none"
        >
          <option>All vehicles</option>
          <option>Healthy</option>
          <option>Due soon</option>
          <option>In service</option>
          <option>Overdue</option>
        </select>
        <Button variant="secondary" onClick={() => setHealth('Due soon')}>
          <Icons.CalendarClock size={15} />
          Due soon
        </Button>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <div className="card-shell overflow-hidden">
          <div className="border-b px-5 py-4">
            <h2 className="font-display text-base font-bold">Vehicle register</h2>
            <p className="mt-1 text-xs text-muted-foreground">Service health across the network</p>
          </div>
          <div className="divide-y">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={cn(
                  'flex w-full items-center gap-3 p-4 text-left hover:bg-blue-50/40',
                  selected?.id === item.id && 'bg-blue-50/50'
                )}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-100 text-blue-700">
                  <Icons.CarFront size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-sm font-bold">{item.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{item.detail}</div>
                </div>
                <div className="hidden text-right sm:block">
                  <div className="text-xs font-semibold">{item.secondary}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">{item.meta}</div>
                </div>
                <StatusBadge status={item.status} />
                <Icons.ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <div className="card-shell p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Vehicle health</div>
                <h2 className="mt-1 font-display text-lg font-bold">{selected?.name || 'Select a vehicle'}</h2>
              </div>
              <Icons.Gauge size={20} className="text-blue-500" />
            </div>
            {selected ? (
              <>
                <div className="rounded-lg bg-muted p-3">
                  <div className="text-sm font-semibold">{selected.detail}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Owner · {selected.secondary}</div>
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    ['Service due', selected.status === 'Overdue' ? 'Now' : '18 days'],
                    ['Last visit', selected.meta.replace('Last service ', '')],
                    ['Odometer', '48,260 km'],
                  ].map(([key, value]) => (
                    <div className="flex justify-between text-xs" key={key}>
                      <span className="text-muted-foreground">{key}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <div className="mb-1.5 flex justify-between text-[10px]">
                    <span className="font-semibold">Interval progress</span>
                    <span className="text-muted-foreground">72%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full w-[72%] rounded-full bg-blue-500" />
                  </div>
                </div>
                <Button className="mt-5 w-full" onClick={() => setModal(true)}>
                  <Icons.CalendarPlus size={14} />
                  Book service
                </Button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a vehicle to view its maintenance profile.
              </p>
            )}
          </div>
          <div className="card-shell p-5">
            <h2 className="font-display text-base font-bold">Maintenance queue</h2>
            <div className="mt-4 space-y-3">
              {[
                ['Overdue inspections', '18 vehicles', 'bg-rose-50 text-rose-700'],
                ['Due this week', '42 vehicles', 'bg-amber-50 text-amber-700'],
                ['Healthy interval', '2,854 vehicles', 'bg-emerald-50 text-emerald-700'],
              ].map(([label, count, tone]) => (
                <div className="flex items-center justify-between rounded-lg p-3 text-xs" key={label}>
                  <span>{label}</span>
                  <span className={cn('rounded-full px-2 py-1 font-bold', tone)}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <RecordDialog
          title="Add vehicle"
          onClose={() => setModal(false)}
          onSave={(record) => {
            setRecords((current) => [record, ...current]);
            setModal(false);
          }}
        />
      )}
    </>
  );
}
