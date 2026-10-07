import { useState } from 'react';
import * as Icons from 'lucide-react';
import { Link } from 'wouter';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

export function DashboardPreview() {
  return (
    <div className="relative mx-auto mt-20 max-w-6xl text-left">
      <div className="absolute inset-x-12 -bottom-5 h-16 rounded-full bg-cyan-500/15 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-300/80 bg-white shadow-[0_28px_80px_rgba(20,43,70,.16)]">
        <div className="flex h-10 items-center gap-2 border-b bg-slate-50 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <div className="mx-auto rounded-md bg-white px-16 py-1 text-[8px] text-slate-400 shadow-sm">
            app.automind.ai/dashboard
          </div>
        </div>
        <div className="grid min-h-[370px] grid-cols-[150px_1fr]">
          <div className="bg-slate-900 p-4">
            <div className="mb-7 flex items-center gap-2 text-[10px] font-bold text-white">
              <img src="/logo.png" alt="AutoMind AI" className="h-5 w-5 rounded object-cover" />
              AutoMind <span className="text-cyan-300">AI</span>
            </div>
            {['Overview', 'Appointments', 'Customers', 'Vehicles', 'Service jobs', 'Analytics'].map((x, i) => (
              <div
                key={x}
                className={cn(
                  'mb-1 rounded px-2 py-2 text-[9px]',
                  i === 0 ? 'bg-cyan-400 font-bold text-slate-900' : 'text-slate-400'
                )}
              >
                {x}
              </div>
            ))}
          </div>
          <div className="bg-[#f5f8fa] p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[.18em] text-cyan-600">
                  Tuesday, 16 July 2024
                </div>
                <div className="mt-1 font-display text-lg font-bold text-slate-900">Good morning, Aarav</div>
              </div>
              <div className="hidden rounded-md border bg-white px-3 py-2 text-[9px] text-slate-500 sm:block">
                All branches⌄
              </div>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-3">
              {[
                ['Appointments', '184'],
                ['Active services', '42'],
                ['Completed', '638'],
                ['Revenue', '₹24.8L'],
              ].map(([a, b]) => (
                <div className="rounded-lg border bg-white p-3 shadow-sm" key={a}>
                  <div className="text-[8px] text-slate-400">{a}</div>
                  <div className="mt-2 font-display text-base font-bold text-slate-900">{b}</div>
                  <div className="mt-1 text-[8px] font-bold text-emerald-600">↑ 12.8%</div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-[1.35fr_1fr] gap-3">
              <div className="rounded-lg border bg-white p-4">
                <div className="text-[10px] font-bold text-slate-800">Service volume</div>
                <div className="mt-1 text-[8px] text-slate-400">Completed work orders by week</div>
                <div className="mt-5 flex h-24 items-end gap-2 border-b px-2">
                  {[28, 42, 36, 62, 48, 76, 66, 90, 72, 97].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-cyan-400/80" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <div className="text-[10px] font-bold text-slate-800">Service status</div>
                <div className="mt-5 space-y-3">
                  {[
                    ['In progress', 62],
                    ['Inspection', 30],
                    ['Ready', 48],
                  ].map(([x, h]) => (
                    <div key={String(x)}>
                      <div className="mb-1 text-[8px] text-slate-500">{x}</div>
                      <div className="h-1.5 rounded bg-slate-100">
                        <div className="h-full rounded bg-slate-800" style={{ width: `${h}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Marketing() {
  const [menu, setMenu] = useState(false);
  const featureItems = [
    { name: 'Appointments', icon: Icons.CalendarDays, copy: 'Fill the bays without the back-and-forth.' },
    { name: 'Job cards', icon: Icons.ClipboardCheck, copy: 'Digital inspections that move with the vehicle.' },
    { name: 'Vehicles', icon: Icons.CarFront, copy: 'A complete service story for every registration.' },
    { name: 'Customers', icon: Icons.Users, copy: 'Build trust with context at every visit.' },
    { name: 'Inventory', icon: Icons.PackageSearch, copy: 'Know what is moving before it runs out.' },
    { name: 'Multi-branch', icon: Icons.Network, copy: 'Compare every location from one view.' },
    { name: 'Analytics', icon: Icons.BarChart3, copy: 'See the patterns behind the numbers.' },
    { name: 'AI insights', icon: Icons.Sparkles, copy: 'Make the next good decision sooner.' },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#f7f9fb] text-slate-900">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200/70 bg-[#f7f9fb]/90 backdrop-blur-lg">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-xs font-semibold text-slate-500 lg:flex">
            <a href="#product" className="hover:text-slate-900">
              Product
            </a>
            <a href="#solutions" className="hover:text-slate-900">
              Solutions
            </a>
            <a href="#workflow" className="hover:text-slate-900">
              Workflow
            </a>
            <a href="#insights" className="hover:text-slate-900">
              AI insights
            </a>
            <a href="#pricing" className="hover:text-slate-900">
              Pricing
            </a>
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <Link href="/login" className="px-3 text-xs font-bold text-slate-600 hover:text-slate-900">
              Log in
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-3.5 text-xs font-bold text-white hover:bg-slate-800"
            >
              Get started <Icons.ArrowUpRight size={14} />
            </Link>
          </div>
          <button onClick={() => setMenu((v) => !v)} className="rounded-lg p-2 text-slate-600 sm:hidden">
            <Icons.Menu size={20} />
          </button>
        </div>
        {menu && (
          <div className="border-t bg-[#f7f9fb] p-4 sm:hidden">
            <div className="mx-auto flex max-w-sm flex-col gap-3 text-sm font-semibold">
              <a href="#product" onClick={() => setMenu(false)}>
                Product
              </a>
              <a href="#solutions" onClick={() => setMenu(false)}>
                Solutions
              </a>
              <Link href="/login">Log in</Link>
              <Link href="/dashboard" className="rounded-lg bg-slate-900 px-4 py-2.5 text-center text-white">
                Get started
              </Link>
            </div>
          </div>
        )}
      </header>
      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-48">
          <div className="absolute left-1/2 top-20 -z-0 h-[600px] w-[850px] -translate-x-1/2 rounded-full bg-cyan-100/60 blur-3xl" />
          <div className="relative mx-auto max-w-6xl text-center">
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.17em] text-cyan-700">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              Built for the service floor
            </div>
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold leading-[.98] tracking-[-.045em] text-slate-950 sm:text-7xl lg:text-[88px]">
              Smarter service centers.
              <br />
              <span className="text-cyan-500">Powered by AI.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
              Manage vehicle servicing, customers, branches, and operations while turning service data into
              powerful business insights.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 text-sm font-bold text-white shadow-lg shadow-slate-900/15 hover:bg-slate-800"
              >
                Explore the workspace <Icons.ArrowUpRight size={16} />
              </Link>
              <button
                onClick={() => alert('Demo request noted — this is a frontend preview.')}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-card px-6 text-sm font-bold text-slate-800 hover:bg-slate-50"
              >
                Request a demo <Icons.PlayCircle size={16} />
              </button>
            </div>
          </div>
          <DashboardPreview />
        </section>
        <section className="border-y border-slate-200 bg-white py-7">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <p className="text-center text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">
              Visual placeholders · not partnerships
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-bold tracking-tight text-slate-400 sm:gap-x-16">
              <span>Hero MotoCorp</span>
              <span>HONDA</span>
              <span>Mahindra</span>
              <span>TATA MOTORS</span>
              <span>HYUNDAI</span>
              <span>TVS</span>
              <span>BAJAJ</span>
            </div>
          </div>
        </section>
        <section id="solutions" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-600">
                From noise to signal
              </div>
              <h2 className="max-w-md font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                The floor is busy.
                <br />
                Your decisions shouldn’t be.
              </h2>
            </div>
            <p className="max-w-lg text-lg leading-relaxed text-slate-500">
              Spreadsheets, disconnected tools, and gut feel create blind spots. AutoMind gives every branch one calm
              operating picture — from the first appointment to the final report.
            </p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-900 p-6 text-white md:translate-y-7">
              <Icons.TriangleAlert className="mb-16 text-amber-300" size={23} />
              <h3 className="font-display text-xl font-bold">Activity without clarity</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Missed handoffs, late approvals, and a daily scramble for the latest number.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <Icons.GitBranch className="mb-16 text-cyan-600" size={23} />
              <h3 className="font-display text-xl font-bold">One operating layer</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                The people, vehicles, parts, and bays that keep your network moving — connected.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-sm md:translate-y-7">
              <Icons.Sparkles className="mb-16 text-violet-500" size={23} />
              <h3 className="font-display text-xl font-bold">Decisions with signal</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                AI surfaces patterns early, so managers can act before a bottleneck becomes a backlog.
              </p>
            </div>
          </div>
        </section>
        <section id="product" className="bg-slate-900 px-5 py-24 text-white lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-xl">
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-300">
                Everything in its lane
              </div>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                A sharper way to run the network.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-400">
                Eight focused modules, one shared source of truth. Give your service team fewer clicks and your
                leadership a clearer view.
              </p>
            </div>
            <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-slate-700 bg-slate-700 sm:grid-cols-2 lg:grid-cols-4">
              {featureItems.map(({ name, icon: Icon, copy }) => (
                <div key={name} className="bg-slate-900 p-6 transition-colors hover:bg-slate-800">
                  <Icon size={20} className="mb-12 text-cyan-300" />
                  <h3 className="font-display font-bold">{name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="workflow" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-600">
                A steady rhythm
              </div>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">From intake to insight.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              A workflow designed around how service teams actually work.
            </p>
          </div>
          <div className="mt-16 grid gap-0 md:grid-cols-4">
            {[
              ['01', 'Collect data', 'Bring appointments, vehicles, and customer context into focus.'],
              ['02', 'Manage operations', 'Keep every job, technician, part, and bay in sync.'],
              ['03', 'Analyze data', 'Measure throughput, retention, and branch performance.'],
              ['04', 'Generate insights', 'Spot opportunities before they become problems.'],
            ].map(([n, title, copy], i) => (
              <div
                className="relative border-l border-slate-300 py-2 pl-6 pr-7 md:border-t md:border-l-0 md:pt-7"
                key={n}
              >
                <div className="mb-14 font-mono text-xs text-cyan-600">{n}</div>
                <h3 className="font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{copy}</p>
                {i < 3 && (
                  <Icons.ArrowRight
                    className="absolute -right-3 top-6 hidden bg-[#f7f9fb] text-slate-300 md:block"
                    size={20}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
        <section id="insights" className="bg-[#eaf6f8] px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-700">
                The intelligence layer
              </div>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Ask better questions
                <br />
                of your service data.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
                AutoMind AI turns operational history into practical recommendations — not black-box scores.
              </p>
              <div className="mt-8 space-y-3">
                {['Maintenance trends', 'Demand predictions', 'Inventory alerts'].map((x) => (
                  <div className="flex items-center gap-3 text-sm font-semibold" key={x}>
                    <div className="grid h-7 w-7 place-items-center rounded-full bg-white text-cyan-600 shadow-sm">
                      <Icons.Check size={14} />
                    </div>
                    {x}
                    <Icons.ArrowUpRight size={14} className="ml-auto text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-2xl shadow-cyan-900/10 sm:p-8">
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full border border-cyan-400/10" />
              <div className="relative">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Icons.Sparkles size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[.17em]">AutoMind signal · demo</span>
                </div>
                <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800/80 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">This week’s recommendation</span>
                    <span className="rounded-full bg-cyan-400/15 px-2 py-1 text-[10px] text-cyan-300">
                      92% confidence
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold leading-tight">
                    Protect Tuesday’s capacity at Andheri West.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    Demand is trending 14% above normal. Shift one technician from Vastrapur to keep projected wait
                    time under 24 minutes.
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-4">
                    <span className="text-[11px] text-slate-500">Based on 90 days of service activity</span>
                    <Icons.ArrowUpRight className="text-cyan-300" size={17} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="mx-auto max-w-7xl px-5 py-24 text-center lg:px-8 lg:py-32">
          <div className="mx-auto max-w-xl">
            <div className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-600">
              Build for the next bay
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Turn service data into business intelligence.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-500">
              Start with a clearer day-to-day. Grow into a smarter network.
            </p>
            <Link
              href="/dashboard"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-cyan-500 px-6 text-sm font-bold text-slate-950 hover:bg-cyan-400"
            >
              Enter the demo workspace <Icons.ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-white px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-slate-500">
              A focused operating system for modern automotive service centers.
            </p>
          </div>
          {[
            ['Product', 'Dashboard', 'Job cards', 'Analytics'],
            ['Solutions', 'Service centers', 'Multi-branch', 'Operations'],
            ['Resources', 'Insights', 'Reports', 'Help center'],
            ['Company', 'About', 'Contact', 'Privacy'],
          ].map(([title, ...links]) => (
            <div key={title}>
              <div className="mb-4 text-xs font-bold">{title}</div>
              {links.map((link) => (
                <a key={link} href="#product" className="mb-2 block text-xs text-slate-500 hover:text-slate-900">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-slate-200 pt-5 text-[10px] text-slate-400 sm:flex-row sm:justify-between">
          <span>© 2024 AutoMind AI. Frontend demo.</span>
          <span>Made for teams who keep people moving.</span>
        </div>
      </footer>
    </div>
  );
}
