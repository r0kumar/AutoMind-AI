import { useState } from 'react';
import * as Icons from 'lucide-react';
import { initialRows } from '@/data/mockData';
import type { Row } from '@/types';
import { Button } from './Button';

export interface RecordDialogProps {
  title: string;
  onClose: () => void;
  onSave: (record: Row) => void;
}

export function RecordDialog({ title, onClose, onSave }: RecordDialogProps) {
  const [name, setName] = useState('');
  const [branch, setBranch] = useState(initialRows.branches[0].name);
  const [status, setStatus] = useState('Confirmed');
  const [notes, setNotes] = useState('');
  const isJob = title.toLowerCase().includes('job') || title.toLowerCase().includes('card');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[.18em] text-cyan-600">
              Workspace form
            </div>
            <h2 className="mt-1 font-display text-xl font-bold">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
          >
            <Icons.X size={18} />
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold sm:col-span-2">
            Name or customer
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-dialog-name"
              className="mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-cyan-500"
              placeholder={isJob ? 'e.g. Full periodic service' : 'Start typing...'}
            />
          </label>
          <label className="text-xs font-semibold">
            Branch
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none"
            >
              {initialRows.branches.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold">
            Status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none"
            >
              <option>Confirmed</option>
              <option>In progress</option>
              <option>Draft</option>
              <option>Healthy</option>
              <option>Stable</option>
            </select>
          </label>
          <label className="text-xs font-semibold sm:col-span-2">
            Notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1.5 min-h-20 w-full resize-none rounded-lg border bg-background p-3 text-sm outline-none focus:border-cyan-500"
              placeholder="Add context for your team..."
            />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              onSave({
                id: `new-${Date.now()}`,
                name: name.trim() || 'Untitled workspace record',
                detail: `${branch} · ${notes.trim() || 'Added from workspace'}`,
                meta: 'Created just now',
                status,
                secondary: notes.trim() || 'New record',
                amount: isJob ? '₹0' : undefined,
              })
            }
            testId="button-save-dialog"
          >
            <Icons.Check size={15} />
            Save to workspace
          </Button>
        </div>
      </div>
    </div>
  );
}
