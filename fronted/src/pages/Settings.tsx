import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';

export function Settings() {
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState({ email: true, reminders: true, digest: false, compact: false });
  const [activeSection, setActiveSection] = useState('Business profile');
  const toggle = (key: keyof typeof toggles) => setToggles((x) => ({ ...x, [key]: !x[key] }));

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Shape AutoMind AI around the way your service network works."
      />
      <div className="grid gap-5 xl:grid-cols-[220px_1fr]">
        <div className="card-shell h-fit p-2">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Settings
          </div>
          {['Business profile', 'Branches', 'Notifications', 'Appearance', 'Preferences'].map((x, i) => (
            <button
              key={x}
              onClick={() => setActiveSection(x)}
              className={cn(
                'flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition-colors',
                activeSection === x
                  ? 'bg-cyan-50 font-bold text-cyan-800'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <span className="grid h-5 w-5 place-items-center rounded bg-muted font-mono text-[9px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              {x}
            </button>
          ))}
        </div>
        <div className="space-y-5">
          <div className="flex items-center justify-between rounded-xl border border-cyan-200 bg-cyan-50/70 px-4 py-3 text-xs text-cyan-900">
            <span>
              <strong>{activeSection}</strong> settings
            </span>
            <span className="text-cyan-700">Changes apply to this demo workspace</span>
          </div>
          <section className="card-shell p-5 sm:p-6">
            <div className="mb-5 border-b pb-4">
              <h2 className="font-display text-base font-bold">Business profile</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                This information appears on customer communications and reports.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold">
                Business name
                <input
                  defaultValue="Apex Auto Care Network"
                  className="mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-cyan-500"
                />
              </label>
              <label className="text-xs font-semibold">
                Industry
                <select
                  defaultValue="Multi-brand service center"
                  className="mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none"
                >
                  <option>Multi-brand service center</option>
                  <option>OEM dealership</option>
                </select>
              </label>
              <label className="text-xs font-semibold">
                Support email
                <input
                  defaultValue="ops@apexautocare.in"
                  className="mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-cyan-500"
                />
              </label>
              <label className="text-xs font-semibold">
                Timezone
                <select
                  defaultValue="Asia/Kolkata"
                  className="mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none"
                >
                  <option>Asia/Kolkata (IST)</option>
                  <option>Asia/Singapore (SGT)</option>
                </select>
              </label>
            </div>
          </section>
          <section className="card-shell p-5 sm:p-6">
            <div className="mb-5 border-b pb-4">
              <h2 className="font-display text-base font-bold">Notifications</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Choose where AutoMind sends important operational signals.
              </p>
            </div>
            {[
              ['email', 'Email alerts', 'Critical stock and appointment changes'],
              ['reminders', 'Appointment reminders', 'Send customers a reminder 24 hours before service'],
              ['digest', 'Weekly operations digest', 'A Monday morning summary for managers'],
            ].map(([key, title, body]) => (
              <div className="flex items-center justify-between border-b py-4 last:border-0" key={key}>
                <div>
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{body}</div>
                </div>
                <button
                  onClick={() => toggle(key as keyof typeof toggles)}
                  data-testid={`toggle-${key}`}
                  className={cn(
                    'relative h-6 w-11 rounded-full transition-colors',
                    toggles[key as keyof typeof toggles] ? 'bg-cyan-500' : 'bg-slate-200'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
                      toggles[key as keyof typeof toggles] ? 'left-6' : 'left-1'
                    )}
                  />
                </button>
              </div>
            ))}
          </section>
          <section className="card-shell p-5 sm:p-6">
            <div className="mb-5 border-b pb-4">
              <h2 className="font-display text-base font-bold">Preferences</h2>
              <p className="mt-1 text-xs text-muted-foreground">Fine tune the workspace experience for your team.</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Compact data tables</div>
                <div className="mt-1 text-xs text-muted-foreground">Show more rows with less vertical spacing</div>
              </div>
              <button
                onClick={() => toggle('compact')}
                data-testid="toggle-compact"
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  toggles.compact ? 'bg-cyan-500' : 'bg-slate-200'
                )}
              >
                <span
                  className={cn(
                    'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
                    toggles.compact ? 'left-6' : 'left-1'
                  )}
                />
              </button>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => {
                  setSaved(true);
                  setTimeout(() => setSaved(false), 1800);
                }}
                testId="button-save-settings"
              >
                {saved ? (
                  <>
                    <Icons.Check size={15} />
                    Saved
                  </>
                ) : (
                  'Save changes'
                )}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
