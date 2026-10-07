import { useState } from 'react';
import * as Icons from 'lucide-react';
import { initialRows } from '@/data/mockData';
import type { Row } from '@/types';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { RecordDialog } from '@/components/shared/RecordDialog';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';

export function AppointmentsPage() {
  const [records, setRecords] = useState<Row[]>(initialRows.appointments);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All appointments');
  const [date, setDate] = useState('Today');
  const [view, setView] = useState<'timeline' | 'agenda'>('timeline');
  const [selected, setSelected] = useState<Row | null>(records[1]);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');

  const filtered = records.filter(
    (item) =>
      `${item.name} ${item.detail} ${item.secondary || ''}`.toLowerCase().includes(query.toLowerCase()) &&
      (status === 'All appointments' || item.status === status) &&
      (date === 'All dates' || item.meta.startsWith(date))
  );

  const save = (record: Row) => {
    setRecords((current) => [record, ...current]);
    setModal(false);
    setMessage('Appointment added to today’s schedule.');
    window.setTimeout(() => setMessage(''), 2200);
  };

  return (
    <>
      <PageHeader
        eyebrow="Workspace · Scheduling"
        title="Appointments"
        description="Shape the day before the first vehicle reaches a bay."
        action={() => setModal(true)}
        actionLabel="New appointment"
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
            ['184', 'Booked this month', '+12.8%', Icons.CalendarDays],
            ['28', 'Today’s arrivals', '6 awaiting', Icons.LogIn],
            ['92%', 'Confirmation rate', '+4.2%', Icons.MessageCircle],
            ['14 min', 'Avg. check-in time', '-2 min', Icons.Timer],
          ] as const
        ).map(([value, label, change, Icon]) => (
          <div className="card-shell p-4" key={label}>
            <div className="flex items-start justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-50 text-cyan-600">
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
            data-testid="input-search-appointments"
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search customer, plate, service..."
          />
        </div>
        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-10 rounded-lg border bg-card px-3 text-xs font-semibold outline-none"
        >
          <option>Today</option>
          <option>Tomorrow</option>
          <option>All dates</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 rounded-lg border bg-card px-3 text-xs font-semibold outline-none"
        >
          <option>All appointments</option>
          <option>Confirmed</option>
          <option>In service</option>
          <option>Waiting</option>
          <option>Rescheduled</option>
        </select>
        <div className="ml-auto flex items-center gap-1 rounded-lg border bg-card p-1">
          <button
            onClick={() => setView('timeline')}
            className={cn(
              'grid h-8 w-8 place-items-center rounded-md',
              view === 'timeline' ? 'bg-muted text-foreground' : 'text-muted-foreground'
            )}
          >
            <Icons.CalendarClock size={16} />
          </button>
          <button
            onClick={() => setView('agenda')}
            className={cn(
              'grid h-8 w-8 place-items-center rounded-md',
              view === 'agenda' ? 'bg-muted text-foreground' : 'text-muted-foreground'
            )}
          >
            <Icons.List size={16} />
          </button>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_.8fr]">
        <div className="card-shell overflow-hidden">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="font-display text-base font-bold">
                {date === 'All dates' ? 'All scheduled visits' : `${date}'s schedule`}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">{filtered.length} appointments match your view</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
              Live schedule
            </span>
          </div>
          {view === 'timeline' ? (
            <div className="divide-y">
              {filtered.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={cn(
                    'flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-cyan-50/40',
                    selected?.id === item.id && 'bg-cyan-50/60'
                  )}
                >
                  <div className="w-14 text-center">
                    <div className="font-mono text-xs font-bold text-slate-800">{item.meta.split(' · ')[1]}</div>
                    <div className="mt-1 text-[10px] text-muted-foreground">{item.meta.split(' · ')[0]}</div>
                  </div>
                  <div className="relative flex flex-1 items-center gap-3">
                    <div
                      className={cn(
                        'h-10 w-1 rounded-full',
                        index % 3 === 0 ? 'bg-cyan-500' : index % 3 === 1 ? 'bg-amber-400' : 'bg-violet-400'
                      )}
                    />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{item.name}</div>
                      <div className="mt-1 truncate text-xs text-muted-foreground">
                        {item.secondary} · {item.detail}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={item.status} />
                  <Icons.ChevronRight size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3">Time</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Service</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelected(item)}
                      className="cursor-pointer hover:bg-muted"
                    >
                      <td className="px-5 py-4 font-mono text-xs">{item.meta}</td>
                      <td className="px-5 py-4 text-sm font-semibold">{item.name}</td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">{item.secondary}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {filtered.length === 0 && (
            <div className="p-12 text-center text-sm text-muted-foreground">
              No appointments match this schedule.
            </div>
          )}
        </div>
        <div className="space-y-5">
          <div className="card-shell p-5">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-600">Selected visit</div>
                <h2 className="mt-1 font-display text-lg font-bold">{selected?.name || 'Choose an appointment'}</h2>
              </div>
              <Icons.MoreHorizontal size={17} className="text-muted-foreground" />
            </div>
            {selected ? (
              <>
                <div className="rounded-lg bg-muted p-3 text-xs">
                  <div className="font-semibold">{selected.secondary}</div>
                  <div className="mt-1 text-muted-foreground">{selected.detail}</div>
                  <div className="mt-2 font-mono text-[10px]">{selected.meta}</div>
                </div>
                <div className="my-5 space-y-3">
                  {[
                    ['Advisor', 'Priya Menon'],
                    ['Bay', 'Bay 04'],
                    ['Reminder', 'Sent 18h ago'],
                  ].map(([key, value]) => (
                    <div className="flex justify-between border-b pb-3 text-xs last:border-0" key={key}>
                      <span className="text-muted-foreground">{key}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => setMessage(`Reminder sent to ${selected.name}.`)}
                  >
                    <Icons.Send size={14} />
                    Send reminder
                  </Button>
                  <Button variant="secondary" onClick={() => setSelected(null)}>
                    Clear
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a visit from the schedule to view its bay and reminder status.
              </p>
            )}
          </div>
          <div className="card-shell p-5">
            <h2 className="font-display text-base font-bold">Bay capacity</h2>
            <p className="mt-1 text-xs text-muted-foreground">Appointments by arrival window</p>
            <div className="mt-5 space-y-4">
              {[
                ['Morning · 08–12', 82, '18 / 22 bays'],
                ['Afternoon · 12–16', 68, '15 / 22 bays'],
                ['Evening · 16–20', 43, '9 / 21 bays'],
              ].map(([label, value, count]) => (
                <div key={String(label)}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span>{label}</span>
                    <span className="font-mono text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-cyan-500" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modal && <RecordDialog title="New appointment" onClose={() => setModal(false)} onSave={save} />}
    </>
  );
}
