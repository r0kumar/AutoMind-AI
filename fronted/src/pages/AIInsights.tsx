import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { cn } from '@/lib/utils';

export function AIInsights() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [refreshed, setRefreshed] = useState(false);

  const insights = [
    {
      icon: Icons.CalendarClock,
      title: 'Tuesday capacity gap',
      body: 'Andheri West is tracking 14% above its normal Tuesday demand. Move one technician from Vastrapur between 10:00 and 15:00.',
      tag: 'Demand prediction',
      confidence: '92%',
      tone: 'cyan',
    },
    {
      icon: Icons.PackageCheck,
      title: 'Brake pad stockout risk',
      body: 'Front brake pad sets for Hyundai Creta will reach safety stock in 6 days at current usage. Recommended order: 24 units.',
      tag: 'Inventory recommendation',
      confidence: '87%',
      tone: 'amber',
    },
    {
      icon: Icons.TriangleAlert,
      title: 'Recurring AC issue cluster',
      body: 'AC performance complaints on 2021–22 Honda City vehicles are 2.1× higher in Mumbai than the network average.',
      tag: 'Vehicle issue insight',
      confidence: '81%',
      tone: 'violet',
    },
    {
      icon: Icons.MapPinned,
      title: 'Regional service opportunity',
      body: 'EV service demand around Koramangala is growing faster than available bay capacity. Consider a dedicated EV slot.',
      tag: 'Business recommendation',
      confidence: '76%',
      tone: 'emerald',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="AI co-pilot · Demo data"
        title="AI insights"
        description="Signals distilled from your operational data. Review recommendations before acting."
        action={() => {
          setRefreshed(true);
          window.setTimeout(() => setRefreshed(false), 1800);
        }}
        actionLabel="Refresh insights"
      />
      {refreshed && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2.5 text-xs font-semibold text-cyan-700">
          <Icons.RefreshCw size={15} className="animate-spin" />
          Signals refreshed from the demo data layer.
        </div>
      )}
      <div className="mb-5 rounded-xl border border-cyan-200 bg-cyan-50/70 p-4">
        <div className="flex gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-500 text-slate-950">
            <Icons.Sparkles size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-900">Demo intelligence layer</div>
            <p className="mt-1 text-xs leading-relaxed text-cyan-800/80">
              These recommendations are realistic static examples for the AutoMind AI experience. No live AI model
              or business data is connected.
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {insights
          .filter((item) => !dismissed.includes(item.title))
          .map((item, i) => {
            const Icon = item.icon;
            const isReviewed = reviewed.includes(item.title);
            return (
              <div
                className="card-shell animate-rise p-5"
                key={item.title}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="mb-7 flex items-start justify-between">
                  <div
                    className={cn(
                      'grid h-10 w-10 place-items-center rounded-xl',
                      item.tone === 'cyan' && 'bg-cyan-50 text-cyan-600',
                      item.tone === 'amber' && 'bg-amber-50 text-amber-600',
                      item.tone === 'violet' && 'bg-violet-50 text-violet-600',
                      item.tone === 'emerald' && 'bg-emerald-50 text-emerald-600'
                    )}
                  >
                    <Icon size={19} />
                  </div>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold text-muted-foreground">
                    {item.confidence} confidence
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">
                  {item.tag}
                </span>
                <h2 className="mt-2 font-display text-lg font-bold">{item.title}</h2>
                <p className="mt-2 min-h-[48px] text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                <div className="mt-5 flex items-center gap-2 border-t pt-4">
                  <button
                    onClick={() =>
                      setReviewed((current) =>
                        current.includes(item.title)
                          ? current.filter((title) => title !== item.title)
                          : [...current, item.title]
                      )
                    }
                    className="text-xs font-semibold text-cyan-700"
                  >
                    {isReviewed ? 'Reviewed' : 'Review recommendation'}{' '}
                    <Icons.ArrowRight className="ml-1 inline" size={13} />
                  </button>
                  <button
                    onClick={() => setDismissed((current) => [...current, item.title])}
                    className="ml-auto text-xs text-muted-foreground hover:text-foreground"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      {dismissed.length > 0 && (
        <button onClick={() => setDismissed([])} className="mt-4 text-xs font-semibold text-cyan-700">
          Restore dismissed insights
        </button>
      )}
      <div className="mt-5 grid gap-5 xl:grid-cols-[.8fr_1.2fr]">
        <div className="card-shell bg-slate-900 p-5 text-white">
          <div className="flex items-center gap-2 text-cyan-300">
            <Icons.Sparkles size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[.18em]">What AI is watching</span>
          </div>
          <div className="mt-6 space-y-4">
            {['Maintenance predictions', 'Spare-part demand', 'Branch performance', 'Regional demand'].map(
              (x, i) => (
                <div className="flex items-center gap-3" key={x}>
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span className="text-sm text-slate-300">{x}</span>
                  <span className="ml-auto font-mono text-[10px] text-slate-500">
                    {['08 signals', '03 alerts', '12 metrics', '05 regions'][i]}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
        <div className="card-shell p-5">
          <h2 className="font-display text-base font-bold">Recommendation impact</h2>
          <p className="mt-1 text-xs text-muted-foreground">Estimated operational upside, demo projection</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {[
              ['+18%', 'Faster triage'],
              ['-11%', 'Idle bay time'],
              ['+₹2.4L', 'Protected revenue'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-bold text-cyan-700">{n}</div>
                <div className="mt-1 text-xs text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
