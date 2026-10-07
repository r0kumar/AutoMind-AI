import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/shared/Button';
import { downloadText } from '@/lib/download';

export function Reports() {
  const [date, setDate] = useState('01 Jun 2024 — 30 Jun 2024');
  const [customOpen, setCustomOpen] = useState(false);
  const [message, setMessage] = useState('');

  const reportTypes = [
    { title: 'Revenue report', body: 'Revenue by branch, service type, and payment status.', icon: Icons.IndianRupee, updated: 'Generated 2h ago' },
    { title: 'Service report', body: 'Job completion, bay utilization, and technician throughput.', icon: Icons.Wrench, updated: 'Generated yesterday' },
    { title: 'Inventory report', body: 'Stock movement, usage, and reorder recommendations.', icon: Icons.Package, updated: 'Generated yesterday' },
    { title: 'Customer report', body: 'Retention, visits, and customer value cohorts.', icon: Icons.Users, updated: 'Generated 2 days ago' },
    { title: 'Branch report', body: 'Side-by-side performance across your service network.', icon: Icons.Network, updated: 'Generated 2 days ago' },
  ];

  const downloadReport = (title: string) => {
    downloadText(`${title.toLowerCase().replaceAll(' ', '-')}.csv`, `Report,Period,Status\n${title},"${date}",Generated\n`);
    setMessage(`${title} downloaded for ${date}.`);
  };

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Reports"
        description="Turn operational activity into shareable, board-ready views."
        action={() => setCustomOpen((v) => !v)}
        actionLabel="Custom report"
      />
      {customOpen && (
        <div className="mb-5 rounded-xl border border-cyan-200 bg-cyan-50/70 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex-1 text-xs font-semibold text-cyan-950">
              Report name
              <input
                className="mt-1.5 h-10 w-full rounded-lg border border-cyan-200 bg-white px-3 text-sm outline-none focus:border-cyan-500"
                defaultValue="Operations snapshot"
              />
            </label>
            <label className="flex-1 text-xs font-semibold text-cyan-950">
              Include
              <select className="mt-1.5 h-10 w-full rounded-lg border border-cyan-200 bg-white px-3 text-sm outline-none focus:border-cyan-500">
                <option>All branches</option>
                <option>Selected branch</option>
                <option>Service operations only</option>
              </select>
            </label>
            <Button
              onClick={() => {
                downloadReport('custom-operations-report');
                setCustomOpen(false);
              }}
            >
              Build report <Icons.FileOutput size={15} />
            </Button>
          </div>
        </div>
      )}
      {message && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-semibold text-emerald-700">
          <Icons.CheckCircle2 size={15} />
          {message}
        </div>
      )}
      <div className="mb-6 flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Icons.CalendarRange size={16} className="text-cyan-600" /> Report period
        </div>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          data-testid="input-report-date"
          className="h-9 flex-1 rounded-lg border bg-background px-3 text-xs outline-none focus:border-cyan-500"
        />
        <Button
          variant="secondary"
          onClick={() => {
            setDate('01 Jul 2024 — 16 Jul 2024');
            setMessage('Report period updated.');
          }}
        >
          Apply dates
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.title}
              className="card-shell group p-5 transition-shadow hover:shadow-[var(--shadow-md)]"
            >
              <div className="mb-7 flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-700">
                  <Icon size={18} />
                </div>
                <button
                  onClick={() => downloadReport(report.title)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
                  aria-label={`Download ${report.title}`}
                >
                  <Icons.MoreHorizontal size={17} />
                </button>
              </div>
              <h2 className="font-display font-bold">{report.title}</h2>
              <p className="mt-2 min-h-10 text-xs leading-relaxed text-muted-foreground">{report.body}</p>
              <div className="mt-5 flex items-center justify-between border-t pt-4">
                <span className="text-[10px] text-muted-foreground">{report.updated}</span>
                <button
                  onClick={() => downloadReport(report.title)}
                  data-testid={`button-download-${report.title.toLowerCase().replaceAll(' ', '-')}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700"
                >
                  <Icons.Download size={14} />
                  Download
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 rounded-xl bg-slate-900 p-5 text-white sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-300">
            <Icons.FileOutput size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[.17em]">Export center</span>
          </div>
          <h3 className="mt-2 font-display text-lg font-bold">Need a complete data export?</h3>
          <p className="mt-1 text-xs text-slate-400">Package all workspace records into a single CSV archive.</p>
        </div>
        <Button
          variant="primary"
          className="mt-4 sm:mt-0"
          onClick={() => downloadReport('workspace-export')}
        >
          <Icons.Download size={15} />
          Export workspace
        </Button>
      </div>
    </>
  );
}
