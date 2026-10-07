import { useState } from 'react';
import * as Icons from 'lucide-react';
import { initialRows } from '@/data/mockData';
import type { Row } from '@/types';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { RecordDialog } from '@/components/shared/RecordDialog';
import { Button } from '@/components/shared/Button';
import { downloadText } from '@/lib/download';
import { cn } from '@/lib/utils';

export function BillingPage() {
  const [records, setRecords] = useState<Row[]>(initialRows.billing);
  const [filter, setFilter] = useState('All invoices');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Row | null>(records[1]);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');

  const filtered = records.filter(
    (item) =>
      `${item.name} ${item.detail} ${item.id}`.toLowerCase().includes(query.toLowerCase()) &&
      (filter === 'All invoices' || item.status === filter)
  );

  const markPaid = (id: string) => {
    setRecords((current) =>
      current.map((item) => (item.id === id ? { ...item, status: 'Paid', meta: item.meta.replace('Due', 'Paid') } : item))
    );
    setMessage('Payment status updated.');
    window.setTimeout(() => setMessage(''), 2200);
  };

  const downloadInvoice = (item: Row) =>
    downloadText(
      `${item.id.toLowerCase()}.csv`,
      `Invoice,Customer,Amount,Status\n${item.id},${item.name},${item.amount},${item.status}\n`
    );

  return (
    <>
      <PageHeader
        eyebrow="Operations · Finance"
        title="Billing & payments"
        description="Keep invoices, collections, and service revenue moving together."
        action={() => setModal(true)}
        actionLabel="Create invoice"
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
            ['₹24.8L', 'Collected this month', '+9.6%', Icons.IndianRupee],
            ['₹3.6L', 'Outstanding', '18 invoices', Icons.Clock3],
            ['₹1.2L', 'Overdue', 'Needs follow-up', Icons.TriangleAlert],
            ['96.4%', 'Collection rate', '+2.1%', Icons.BadgeCheck],
          ] as const
        ).map(([value, label, detail, Icon]) => (
          <div className="card-shell p-4" key={label}>
            <div className="flex items-start justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-violet-50 text-violet-600">
                <Icon size={17} />
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground">{detail}</span>
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
            data-testid="input-search-billing"
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search invoice or customer..."
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 rounded-lg border bg-card px-3 text-xs font-semibold outline-none"
        >
          <option>All invoices</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
        <Button
          variant="secondary"
          onClick={() => downloadText('billing-summary.csv', 'Status,Count\nPaid,184\nPending,18\nOverdue,6\n')}
        >
          <Icons.Download size={15} />
          Export summary
        </Button>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <div className="card-shell overflow-hidden">
          <div className="border-b px-5 py-4">
            <h2 className="font-display text-base font-bold">Invoice register</h2>
            <p className="mt-1 text-xs text-muted-foreground">Payments linked to completed job cards</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Invoice</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelected(item)}
                    className={cn(
                      'cursor-pointer hover:bg-violet-50/30',
                      selected?.id === item.id && 'bg-violet-50/50'
                    )}
                  >
                    <td className="px-5 py-4">
                      <div className="font-mono text-xs font-bold">{item.id}</div>
                      <div className="mt-1 text-[10px] text-muted-foreground">{item.meta}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{item.detail}</div>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs font-bold">{item.amount}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Icons.ChevronRight size={16} className="text-muted-foreground" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-sm text-muted-foreground">No invoices match this filter.</div>
          )}
        </div>
        <div className="card-shell p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-violet-600">Invoice detail</div>
              <h2 className="mt-1 font-display text-xl font-bold">{selected?.id || 'Select an invoice'}</h2>
            </div>
            <Icons.ReceiptIndianRupee size={22} className="text-violet-500" />
          </div>
          {selected ? (
            <>
              <div className="mt-5 rounded-lg bg-muted p-4">
                <div className="text-sm font-semibold">{selected.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{selected.detail}</div>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-xs text-muted-foreground">Total due</span>
                  <span className="font-mono text-xl font-bold">{selected.amount}</span>
                </div>
              </div>
              <div className="my-5 space-y-3 text-xs">
                {[
                  ['Job card', selected.secondary || '—'],
                  ['Payment method', selected.meta.split(' · ')[1] || '—'],
                  ['Status', selected.status],
                ].map(([key, value]) => (
                  <div className="flex justify-between border-b pb-3 last:border-0" key={key}>
                    <span className="text-muted-foreground">{key}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1" onClick={() => downloadInvoice(selected)}>
                  <Icons.Download size={14} />
                  Invoice
                </Button>
                {selected.status !== 'Paid' && (
                  <Button className="flex-1" onClick={() => markPaid(selected.id)}>
                    <Icons.Check size={14} />
                    Mark paid
                  </Button>
                )}
              </div>
            </>
          ) : (
            <p className="mt-5 text-sm text-muted-foreground">Select an invoice to review payment details.</p>
          )}
        </div>
      </div>
      {modal && (
        <RecordDialog
          title="Create invoice"
          onClose={() => setModal(false)}
          onSave={(record) => {
            const invoice = {
              ...record,
              id: `INV-${2049 + records.length}`,
              status: 'Pending',
              amount: record.amount || '₹0',
            };
            setRecords((current) => [invoice, ...current]);
            setSelected(invoice);
            setModal(false);
          }}
        />
      )}
    </>
  );
}
