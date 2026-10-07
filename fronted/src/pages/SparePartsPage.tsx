import { useState } from 'react';
import * as Icons from 'lucide-react';
import { initialRows } from '@/data/mockData';
import type { Row } from '@/types';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { RecordDialog } from '@/components/shared/RecordDialog';
import { Button } from '@/components/shared/Button';

export function SparePartsPage() {
  const [records, setRecords] = useState<Row[]>(initialRows['spare-parts']);
  const [query, setQuery] = useState('');
  const [stock, setStock] = useState('All inventory');
  const [modal, setModal] = useState(false);

  const filtered = records.filter(
    (item) =>
      `${item.name} ${item.detail} ${item.meta}`.toLowerCase().includes(query.toLowerCase()) &&
      (stock === 'All inventory' || item.status === stock)
  );

  return (
    <>
      <PageHeader
        eyebrow="Operations · Inventory"
        title="Spare parts"
        description="Keep the right parts moving to the right bays before they become urgent."
        action={() => setModal(true)}
        actionLabel="Add part"
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {(
          [
            ['₹18.6L', 'Inventory value', '+8.2%', Icons.Package],
            ['1,248', 'Units in stock', 'Across 12 branches', Icons.Boxes],
            ['18', 'Low stock SKUs', 'Needs reorder', Icons.TriangleAlert],
            ['94.2%', 'Fill rate', '+2.8%', Icons.BadgeCheck],
          ] as const
        ).map(([value, label, detail, Icon]) => (
          <div className="card-shell p-4" key={label}>
            <div className="flex items-start justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-amber-50 text-amber-600">
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
            data-testid="input-search-spare-parts"
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search parts, SKU, supplier..."
          />
        </div>
        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="h-10 rounded-lg border bg-card px-3 text-xs font-semibold outline-none"
        >
          <option>All inventory</option>
          <option>Healthy</option>
          <option>Low stock</option>
          <option>Critical</option>
        </select>
        <Button variant="secondary" onClick={() => setStock('Low stock')}>
          <Icons.AlertTriangle size={15} />
          Reorder queue
        </Button>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <div className="card-shell overflow-hidden">
          <div className="border-b px-5 py-4">
            <h2 className="font-display text-base font-bold">Inventory register</h2>
            <p className="mt-1 text-xs text-muted-foreground">Live stock position for the selected branch context</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Part</th>
                  <th className="px-5 py-3">SKU</th>
                  <th className="px-5 py-3">On hand</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/30">
                    <td className="px-5 py-4">
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{item.detail}</div>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-muted-foreground">
                      {item.meta.replace('SKU ', '')}
                    </td>
                    <td className="px-5 py-4 text-xs font-bold">{item.secondary}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          setRecords((current) =>
                            current.map((row) =>
                              row.id === item.id ? { ...row, status: 'Healthy', secondary: '24 in stock' } : row
                            )
                          )
                        }
                        className="text-[10px] font-bold text-cyan-700"
                      >
                        Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-5">
          <div className="card-shell p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Reorder queue</div>
                <h2 className="mt-1 font-display text-lg font-bold">3 urgent items</h2>
              </div>
              <Icons.ShoppingCart size={19} className="text-amber-500" />
            </div>
            <div className="mt-5 space-y-3">
              {[
                ['Front brake pad set · Creta', '6 units', 'Order 24'],
                ['AC compressor belt · City', '2 units', 'Order 12'],
                ['Coolant · Multi-brand', '4 units', 'Order 20'],
              ].map(([part, count, action]) => (
                <div className="rounded-lg border p-3" key={part}>
                  <div className="text-xs font-semibold">{part}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-rose-600">{count} remaining</span>
                    <button onClick={() => setModal(true)} className="text-[10px] font-bold text-cyan-700">
                      {action} <Icons.ArrowUpRight className="ml-1 inline" size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-shell p-5">
            <h2 className="font-display text-base font-bold">Stock movement</h2>
            <p className="mt-1 text-xs text-muted-foreground">Last 7 days</p>
            <div className="mt-5 flex h-24 items-end gap-2">
              {[42, 58, 48, 74, 62, 88, 69].map((height, i) => (
                <div className="flex flex-1 flex-col items-center gap-1" key={i}>
                  <div className="w-full rounded-t bg-amber-400" style={{ height: `${height}%` }} />
                  <span className="text-[9px] text-muted-foreground">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <RecordDialog
          title="Add part"
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
