import { useState } from 'react';
import * as Icons from 'lucide-react';
import { initialRows } from '@/data/mockData';
import type { Row } from '@/types';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { RecordDialog } from '@/components/shared/RecordDialog';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';

export function JobCardsPage() {
  const [records, setRecords] = useState<Row[]>(initialRows['job-cards']);
  const [selected, setSelected] = useState<Row>(records[0]);
  const [checked, setChecked] = useState<string[]>(['Vehicle exterior', 'Fluid levels']);
  const [filter, setFilter] = useState('All cards');
  const [modal, setModal] = useState(false);
  const checklist = ['Vehicle exterior', 'Fluid levels', 'Brake system', 'Tyres & alignment', 'Customer approval'];
  const visible = records.filter((item) => filter === 'All cards' || item.status === filter);

  return (
    <>
      <PageHeader
        eyebrow="Operations · Inspections"
        title="Digital job cards"
        description="Capture evidence, approvals, and technician notes in one auditable service story."
        action={() => setModal(true)}
        actionLabel="New job card"
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {(
          [
            ['24', 'Open inspections', '8 need review', Icons.ClipboardCheck],
            ['86%', 'Checklist completion', '+6.4% this week', Icons.ListChecks],
            ['₹1.8L', 'Pending approvals', '12 customers', Icons.Signature],
          ] as const
        ).map(([value, label, detail, Icon]) => (
          <div className="card-shell p-4" key={label}>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-50 text-cyan-600">
                <Icon size={17} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="font-display text-2xl font-bold">{value}</div>
              </div>
              <span className="ml-auto text-right text-[10px] text-muted-foreground">{detail}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-5 flex items-center gap-3">
        <div className="input-shell flex-1 max-w-[330px]">
          <Icons.Search size={16} className="mr-2 text-muted-foreground" />
          <input placeholder="Search job cards..." className="w-full bg-transparent text-sm outline-none" />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 rounded-lg border bg-card px-3 text-xs font-semibold outline-none"
        >
          <option>All cards</option>
          <option>In progress</option>
          <option>Awaiting approval</option>
          <option>Inspection</option>
        </select>
      </div>
      <div className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]">
        <div className="card-shell overflow-hidden">
          <div className="border-b px-5 py-4">
            <h2 className="font-display text-base font-bold">Open job cards</h2>
            <p className="mt-1 text-xs text-muted-foreground">Select a card to continue its inspection</p>
          </div>
          <div className="divide-y">
            {visible.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelected(item);
                  setChecked(['Vehicle exterior', 'Fluid levels']);
                }}
                className={cn('w-full p-4 text-left hover:bg-cyan-50/40', selected.id === item.id && 'bg-cyan-50/70')}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold">{item.id}</span>
                  <StatusBadge status={item.status} />
                </div>
                <div className="mt-3 text-sm font-semibold">{item.detail}</div>
                <div className="mt-1 text-xs text-muted-foreground">{item.meta}</div>
                <div className="mt-3 flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">Checklist progress</span>
                  <strong>{selected.id === item.id ? `${checked.length}/5` : '2/5'}</strong>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-cyan-500"
                    style={{ width: `${((selected.id === item.id ? checked.length : 2) / 5) * 100}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="card-shell p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-3 border-b pb-5 sm:flex-row sm:items-start">
            <div>
              <div className="font-mono text-[10px] font-bold text-cyan-600">{selected.id}</div>
              <h2 className="mt-1 font-display text-xl font-bold">{selected.detail}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {selected.name} · {selected.meta}
              </p>
            </div>
            <StatusBadge status={selected.status} />
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold">Inspection checklist</h3>
              <p className="mt-1 text-xs text-muted-foreground">Tap an item as the technician completes it.</p>
            </div>
            <span className="font-mono text-xs font-bold text-cyan-700">{checked.length}/5 done</span>
          </div>
          <div className="mt-4 divide-y rounded-lg border">
            {checklist.map((item) => (
              <label className="flex cursor-pointer items-center gap-3 p-3 text-xs hover:bg-muted" key={item}>
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={() =>
                    setChecked((current) =>
                      current.includes(item) ? current.filter((x) => x !== item) : [...current, item]
                    )
                  }
                  className="h-4 w-4 accent-cyan-500"
                />
                <span className={cn(checked.includes(item) && 'font-semibold line-through text-muted-foreground')}>
                  {item}
                </span>
                {checked.includes(item) && <Icons.CheckCircle2 size={15} className="ml-auto text-emerald-500" />}
              </label>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-slate-900 p-4 text-white">
            <div className="flex items-center gap-2 text-cyan-300">
              <Icons.MessageSquareText size={15} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Technician note</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Front brake wear is above threshold. Recommend replacement before next long-distance trip.
            </p>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setChecked(checklist)}>
              Complete checklist
            </Button>
            <Button
              onClick={() =>
                setRecords((current) =>
                  current.map((item) => (item.id === selected.id ? { ...item, status: 'Awaiting approval' } : item))
                )
              }
            >
              <Icons.Send size={14} />
              Request approval
            </Button>
          </div>
        </div>
      </div>
      {modal && (
        <RecordDialog
          title="New job card"
          onClose={() => setModal(false)}
          onSave={(record) => {
            const next = { ...record, id: `JC-${7743 + records.length}`, status: 'Inspection' };
            setRecords((current) => [next, ...current]);
            setSelected(next);
            setModal(false);
          }}
        />
      )}
    </>
  );
}
