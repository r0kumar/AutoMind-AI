import { useState } from 'react';
import * as Icons from 'lucide-react';
import { initialRows } from '@/data/mockData';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { RecordDialog } from '@/components/shared/RecordDialog';
import { Button } from '@/components/shared/Button';

export function ServiceHistoryPage() {
  const [query, setQuery] = useState('');
  const [vehicle, setVehicle] = useState('All vehicles');
  const [modal, setModal] = useState(false);

  const filtered = initialRows['service-history'].filter(
    (item) =>
      `${item.name} ${item.detail} ${item.secondary || ''}`.toLowerCase().includes(query.toLowerCase()) &&
      (vehicle === 'All vehicles' || item.detail.includes(vehicle))
  );

  return (
    <>
      <PageHeader
        eyebrow="Operations · Records"
        title="Service history"
        description="Every visit, part, and recommendation — ready when your team needs context."
        action={() => setModal(true)}
        actionLabel="Log service"
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {(
          [
            ['10,920', 'Completed visits', 'This year', Icons.History],
            ['4.7 / 5', 'Service experience', '+0.3 rating', Icons.Star],
            ['82%', 'Repeat service rate', '+5.8%', Icons.Repeat2],
          ] as const
        ).map(([value, label, detail, Icon]) => (
          <div className="card-shell p-4" key={label}>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-700">
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
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="input-shell flex-1 sm:max-w-[340px]">
          <Icons.Search size={16} className="mr-2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-testid="input-search-service-history"
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search service, vehicle, customer..."
          />
        </div>
        <select
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          className="h-10 rounded-lg border bg-card px-3 text-xs font-semibold outline-none"
        >
          <option>All vehicles</option>
          <option>MH 12 QX 4218</option>
          <option>DL 3C AT 7821</option>
          <option>GJ 01 RK 0991</option>
        </select>
        <Button
          variant="secondary"
          onClick={() => {
            setQuery('');
            setVehicle('All vehicles');
          }}
        >
          <Icons.RotateCcw size={15} />
          Clear
        </Button>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
        <div className="card-shell p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-bold">Vehicle service timeline</h2>
              <p className="mt-1 text-xs text-muted-foreground">The latest completed work across your register</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
              Audited
            </span>
          </div>
          <div className="space-y-0">
            {filtered.map((item, index) => (
              <div className="flex gap-4" key={item.id}>
                <div className="flex w-5 flex-col items-center">
                  <span className="z-10 mt-1 h-3 w-3 rounded-full border-2 border-white bg-cyan-500 ring-1 ring-cyan-200" />
                  {index < filtered.length - 1 && <span className="h-full w-px bg-border" />}
                </div>
                <div className="mb-5 flex-1 rounded-xl border p-4 transition-colors hover:bg-muted">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <div>
                      <div className="font-mono text-[10px] font-bold text-cyan-700">
                        {item.meta.split(' · ')[0]}
                      </div>
                      <h3 className="mt-1 text-sm font-semibold">{item.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <StatusBadge status={item.status} />
                      <div className="mt-2 font-mono text-xs font-bold">{item.amount}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 border-t pt-3 text-[10px] text-muted-foreground">
                    <Icons.UserRound size={13} />
                    {item.meta.split(' · ')[1]}
                    <span>·</span>
                    {item.secondary}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No service history matches those filters.
            </div>
          )}
        </div>
        <div className="space-y-5">
          <div className="card-shell bg-slate-900 p-5 text-white">
            <div className="flex items-center gap-2 text-cyan-300">
              <Icons.Sparkles size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Context for advisors</span>
            </div>
            <h2 className="mt-5 font-display text-xl font-bold">Use history to make the next visit feel personal.</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Customers with a complete service story approve recommended work 23% faster in the demo data.
            </p>
            <Button variant="primary" className="mt-6" onClick={() => setModal(true)}>
              <Icons.Plus size={14} />
              Log a visit
            </Button>
          </div>
          <div className="card-shell p-5">
            <h2 className="font-display text-base font-bold">Most serviced makes</h2>
            <div className="mt-5 space-y-3">
              {[
                ['Honda', '37%', '1,042 visits'],
                ['Hyundai', '26%', '732 visits'],
                ['Tata', '18%', '506 visits'],
                ['Other', '19%', '534 visits'],
              ].map(([make, share, count]) => (
                <div key={make}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="font-semibold">{make}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-slate-800" style={{ width: share }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modal && <RecordDialog title="Log service" onClose={() => setModal(false)} onSave={() => setModal(false)} />}
    </>
  );
}
