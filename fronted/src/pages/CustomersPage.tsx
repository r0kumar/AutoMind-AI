import { useState } from 'react';
import * as Icons from 'lucide-react';
import { initialRows } from '@/data/mockData';
import type { Row } from '@/types';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { RecordDialog } from '@/components/shared/RecordDialog';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';

export function CustomersPage() {
  const [records, setRecords] = useState<Row[]>(initialRows.customers);
  const [query, setQuery] = useState('');
  const [segment, setSegment] = useState('All customers');
  const [selected, setSelected] = useState<Row | null>(records[0]);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');

  const filtered = records.filter(
    (item) =>
      `${item.name} ${item.detail} ${item.secondary || ''}`.toLowerCase().includes(query.toLowerCase()) &&
      (segment === 'All customers' || item.status === segment)
  );

  const save = (record: Row) => {
    setRecords((current) => [record, ...current]);
    setSelected(record);
    setModal(false);
    setMessage('Customer profile added to the directory.');
    window.setTimeout(() => setMessage(''), 2200);
  };

  return (
    <>
      <PageHeader
        eyebrow="Workspace · CRM"
        title="Customers"
        description="Know who is coming back, who needs a nudge, and what every relationship is worth."
        action={() => setModal(true)}
        actionLabel="Add customer"
      />
      {message && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-semibold text-emerald-700">
          <Icons.CheckCircle2 size={15} />
          {message}
        </div>
      )}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {(
          [
            ['2,486', 'Total customers', '+14.1%', Icons.Users],
            ['68.4%', 'Retention rate', '+4.6%', Icons.RefreshCw],
            ['₹18,420', 'Avg. customer value', '+8.9%', Icons.IndianRupee],
            ['142', 'Need follow-up', 'This week', Icons.MessageSquareMore],
          ] as const
        ).map(([value, label, change, Icon]) => (
          <div className="card-shell p-4" key={label}>
            <div className="flex items-start justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-violet-50 text-violet-600">
                <Icon size={17} />
              </div>
              <span className="text-[11px] font-semibold text-emerald-600">{change}</span>
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
            data-testid="input-search-customers"
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search name, email, phone..."
          />
        </div>
        <select
          value={segment}
          onChange={(e) => setSegment(e.target.value)}
          className="h-10 rounded-lg border bg-card px-3 text-xs font-semibold outline-none"
        >
          <option>All customers</option>
          <option>Active</option>
          <option>At risk</option>
        </select>
        <Button variant="secondary" onClick={() => setSegment('At risk')}>
          <Icons.TriangleAlert size={15} />
          At-risk view
        </Button>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <div className="card-shell overflow-hidden">
          <div className="border-b px-5 py-4">
            <h2 className="font-display text-base font-bold">Customer directory</h2>
            <p className="mt-1 text-xs text-muted-foreground">Recent relationship activity across all branches</p>
          </div>
          <div className="divide-y">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={cn(
                  'flex w-full items-center gap-3 p-4 text-left hover:bg-muted',
                  selected?.id === item.id && 'bg-violet-50/50'
                )}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                  {item.name
                    .split(' ')
                    .map((x) => x[0])
                    .join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{item.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{item.detail}</div>
                </div>
                <div className="hidden text-right sm:block">
                  <div className="text-xs font-semibold">{item.meta.split(' · ')[0]}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">{item.secondary}</div>
                </div>
                <StatusBadge status={item.status} />
                <Icons.ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-sm text-muted-foreground">No customers match your search.</div>
          )}
          <div className="border-t px-5 py-3 text-xs text-muted-foreground">
            Showing {filtered.length} of {records.length} customer profiles
          </div>
        </div>
        <div className="space-y-5">
          <div className="card-shell p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                  Customer profile
                </div>
                <h2 className="mt-1 font-display text-lg font-bold">
                  {selected?.name || 'No customer selected'}
                </h2>
              </div>
              <Icons.UserRound size={20} className="text-violet-500" />
            </div>
            {selected ? (
              <>
                <div className="space-y-3 text-xs">
                  {[
                    ['Contact', selected.detail],
                    ['Phone', selected.secondary || '—'],
                    ['Vehicles', selected.meta.split(' · ')[0]],
                    ['Visits', selected.meta.split(' · ')[1] || 'New customer'],
                  ].map(([key, value]) => (
                    <div className="flex justify-between gap-4 border-b pb-3 last:border-0" key={key}>
                      <span className="text-muted-foreground">{key}</span>
                      <strong className="text-right">{value}</strong>
                    </div>
                  ))}
                </div>
                <Button
                  variant="secondary"
                  className="mt-4 w-full"
                  onClick={() => {
                    setMessage(`Conversation started with ${selected.name}.`);
                    window.setTimeout(() => setMessage(''), 2200);
                  }}
                >
                  <Icons.MessageCircle size={14} />
                  Start conversation
                </Button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Select a profile to see relationship details.</p>
            )}
          </div>
          <div className="card-shell p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold">Retention watchlist</h2>
              <Icons.HeartPulse size={17} className="text-rose-500" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Customers who have not returned within their expected interval
            </p>
            <div className="mt-5 space-y-3">
              {['Dev Malhotra', 'Priya Shah', 'Karan Mehra'].map((name, i) => (
                <div className="flex items-center gap-3" key={name}>
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-rose-50 text-[10px] font-bold text-rose-600">
                    {name
                      .split(' ')
                      .map((x) => x[0])
                      .join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold">{name}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {[72, 61, 48][i]} days since last visit
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-cyan-700" onClick={() => setQuery(name)}>
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modal && <RecordDialog title="Add customer" onClose={() => setModal(false)} onSave={save} />}
    </>
  );
}
