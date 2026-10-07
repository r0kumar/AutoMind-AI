import { useState } from 'react';
import * as Icons from 'lucide-react';
import { initialRows } from '@/data/mockData';
import type { Row } from '@/types';
import { PageHeader } from '@/components/shared/PageHeader';
import { RecordDialog } from '@/components/shared/RecordDialog';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';

export function ServiceJobsPage() {
  const [records, setRecords] = useState<Row[]>(initialRows['service-jobs']);
  const [filter, setFilter] = useState('All jobs');
  const [modal, setModal] = useState(false);
  const stages = ['Inspection', 'In progress', 'Awaiting approval', 'Completed'];
  const stageTone = [
    'bg-amber-50 text-amber-700',
    'bg-cyan-50 text-cyan-700',
    'bg-violet-50 text-violet-700',
    'bg-emerald-50 text-emerald-700',
  ];

  const moveNext = (id: string) =>
    setRecords((current) =>
      current.map((item) => {
        const index = stages.indexOf(item.status);
        return item.id === id ? { ...item, status: stages[Math.min(index + 1, stages.length - 1)] } : item;
      })
    );

  return (
    <>
      <PageHeader
        eyebrow="Operations · Live floor"
        title="Service jobs"
        description="Move every vehicle from inspection to pickup with less handoff friction."
        action={() => setModal(true)}
        actionLabel="Create service job"
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {(
          [
            ['42', 'Active jobs', 'Across all bays', Icons.Wrench],
            ['18', 'In progress', '43% of active jobs', Icons.LoaderCircle],
            ['7', 'Awaiting approval', '₹48,200 value', Icons.Clock3],
          ] as const
        ).map(([value, label, detail, Icon]) => (
          <div className="card-shell p-4" key={label}>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-amber-50 text-amber-600">
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
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icons.Filter size={15} />
          <span>Workboard view</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-9 rounded-lg border bg-card px-3 text-xs font-semibold text-foreground"
          >
            <option>All jobs</option>
            {stages.map((stage) => (
              <option key={stage}>{stage}</option>
            ))}
          </select>
        </div>
        <Button variant="secondary" onClick={() => setRecords(initialRows['service-jobs'])}>
          <Icons.RefreshCw size={14} />
          Reset demo board
        </Button>
      </div>
      <div className="grid gap-4 xl:grid-cols-4">
        {stages.map((stage, stageIndex) => {
          const stageItems = records.filter(
            (item) => (filter === 'All jobs' || filter === stage) && item.status === stage
          );
          return (
            <div className="min-h-[360px] rounded-xl bg-slate-100/75 p-3" key={stage}>
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={cn('rounded-full px-2 py-1 text-[10px] font-bold', stageTone[stageIndex])}>
                    {stage}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">{stageItems.length}</span>
                </div>
                <button className="rounded p-1 text-muted-foreground hover:bg-white">
                  <Icons.MoreHorizontal size={15} />
                </button>
              </div>
              <div className="space-y-3">
                {stageItems.map((item) => (
                  <div className="rounded-xl border bg-card p-4 shadow-sm" key={item.id}>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold text-muted-foreground">{item.id}</span>
                      <button
                        onClick={() => moveNext(item.id)}
                        title="Move to next stage"
                        className="rounded-md p-1 text-cyan-700 hover:bg-cyan-50"
                      >
                        <Icons.ArrowRight size={14} />
                      </button>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold">{item.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                      <span className="text-[10px] text-muted-foreground">{item.meta}</span>
                      <span className="font-mono text-xs font-bold">{item.amount}</span>
                    </div>
                  </div>
                ))}
                {stageItems.length === 0 && (
                  <div className="rounded-lg border border-dashed border-slate-300 p-5 text-center text-xs text-muted-foreground">
                    No jobs in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {modal && (
        <RecordDialog
          title="Create service job"
          onClose={() => setModal(false)}
          onSave={(record) => {
            setRecords((current) => [{ ...record, status: 'Inspection' }, ...current]);
            setModal(false);
          }}
        />
      )}
    </>
  );
}
