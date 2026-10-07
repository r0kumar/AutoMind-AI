import { type ReactNode, useState } from 'react';
import * as Icons from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { navGroups, initialRows } from '@/data/mockData';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

export function AppShell({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [branch, setBranch] = useState('All branches');
  const [profileOpen, setProfileOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const activeLabel = navGroups.flatMap((g) => g.items).find((i) => i.path === location)?.label || 'Overview';
  const searchMatches = navGroups
    .flatMap((g) => g.items)
    .filter((item) => item.label.toLowerCase().includes(globalSearch.toLowerCase()));

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 lg:flex',
          collapsed ? 'w-[76px]' : 'w-[248px]'
        )}
      >
        <div className={cn('flex h-[74px] items-center border-b border-sidebar-border px-5', collapsed && 'justify-center px-0')}>
          <Logo dark />
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-5">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-6">
              <div
                className={cn(
                  'mb-2 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-500',
                  collapsed && 'text-center text-[8px]'
                )}
              >
                {collapsed ? group.label.slice(0, 1) : group.label}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = location === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    data-testid={`link-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                    className={cn(
                      'group mb-1 flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors',
                      active
                        ? 'bg-cyan-400 text-slate-950 shadow-sm shadow-cyan-400/15'
                        : 'text-slate-400 hover:bg-sidebar-accent hover:text-white',
                      collapsed && 'justify-center px-0'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon size={17} strokeWidth={active ? 2.4 : 1.8} />
                    <span className={cn(collapsed && 'hidden')}>{item.label}</span>
                    {item.label === 'AI insights' && !collapsed && (
                      <span
                        className={cn(
                          'ml-auto rounded-full px-1.5 py-0.5 text-[9px]',
                          active ? 'bg-slate-900/15 text-slate-900' : 'bg-cyan-400/15 text-cyan-300'
                        )}
                      >
                        BETA
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
        <div className={cn('border-t border-sidebar-border p-3', collapsed && 'px-2')}>
          <Link
            href="/settings"
            className={cn(
              'flex items-center gap-3 rounded-lg p-2.5 text-slate-400 hover:bg-sidebar-accent hover:text-white',
              collapsed && 'justify-center'
            )}
          >
            <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-700 text-xs font-bold text-cyan-300">
              RK
            </div>
            <div className={cn('min-w-0', collapsed && 'hidden')}>
              <div className="truncate text-xs font-semibold text-slate-200">Rohit Kumar</div>
              <div className="truncate text-[10px] text-slate-500">Operations lead</div>
            </div>
            <Icons.ChevronRight size={15} className={cn('ml-auto', collapsed && 'hidden')} />
          </Link>
        </div>
        <button
          onClick={() => setCollapsed((v) => !v)}
          data-testid="button-collapse-sidebar"
          className="absolute -right-3 top-[77px] grid h-6 w-6 place-items-center rounded-full border bg-card text-muted-foreground shadow-sm hover:text-foreground"
        >
          <Icons.ChevronLeft size={14} className={cn('transition-transform', collapsed && 'rotate-180')} />
        </button>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-[min(88vw,320px)] flex-col bg-sidebar text-sidebar-foreground transition-transform lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-[74px] shrink-0 items-center border-b border-sidebar-border px-5">
          <Logo dark />
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="ml-auto rounded-lg p-2 text-slate-400 hover:bg-sidebar-accent hover:text-white"
          >
            <Icons.X size={19} />
          </button>
        </div>
        <div className="overflow-y-auto px-3 py-4">
          <label className="mb-5 block px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Branch context
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-2 h-10 w-full rounded-lg border border-sidebar-border bg-sidebar-accent px-3 text-xs font-semibold text-slate-200 outline-none"
            >
              <option>All branches</option>
              {initialRows.branches.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
          </label>
          {navGroups.map((group) => (
            <div key={group.label} className="mb-6">
              <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">
                {group.label}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'mb-1 flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm',
                      location === item.path ? 'bg-cyan-400 text-slate-950' : 'text-slate-400 hover:bg-sidebar-accent'
                    )}
                  >
                    <Icon size={17} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={cn('min-w-0 transition-[padding] duration-300', collapsed ? 'lg:pl-[76px]' : 'lg:pl-[248px]')}>
        <header className="sticky top-0 z-20 flex h-[74px] items-center border-b bg-background/90 px-4 backdrop-blur-md sm:px-7">
          <button
            onClick={() => setMobileOpen(true)}
            data-testid="button-open-mobile-nav"
            className="mr-3 rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
          >
            <Icons.Menu size={21} />
          </button>
          <div className="hidden text-[13px] font-medium text-muted-foreground sm:block">{activeLabel}</div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <div className="relative hidden lg:block">
              <div className="input-shell flex w-[220px]">
                <Icons.Search size={16} className="mr-2 text-muted-foreground" />
                <input
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  data-testid="input-global-search"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder="Search anything"
                />
              </div>
              {globalSearch && (
                <div className="absolute right-0 top-12 z-30 w-64 rounded-xl border bg-card p-2 shadow-lg">
                  <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Go to
                  </div>
                  {searchMatches.length ? (
                    searchMatches.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setGlobalSearch('')}
                        className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold hover:bg-muted"
                      >
                        <item.icon size={15} className="text-cyan-600" />
                        {item.label}
                      </Link>
                    ))
                  ) : (
                    <div className="px-2 py-3 text-xs text-muted-foreground">No matching workspace pages</div>
                  )}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setNoticeOpen((v) => !v)}
                data-testid="button-notifications"
                className="relative grid h-10 w-10 place-items-center rounded-lg border bg-card text-muted-foreground hover:bg-muted"
              >
                <Icons.Bell size={17} />
                <span className={cn('absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-500 ring-2 ring-card', noticeOpen && 'hidden')} />
              </button>
              {noticeOpen && (
                <div className="absolute right-0 top-12 z-30 w-72 rounded-xl border bg-card p-3 shadow-lg">
                  <div className="flex items-center justify-between px-2 pb-2">
                    <span className="text-sm font-bold">Notifications</span>
                    <button onClick={() => setNoticeOpen(false)} className="text-[10px] font-semibold text-cyan-600">
                      Mark read
                    </button>
                  </div>
                  {['Brake pads are low in stock', 'New appointment request received', 'Weekly report is ready'].map((n, i) => (
                    <button
                      key={n}
                      onClick={() => {
                        setNoticeOpen(false);
                        setLocation(i === 0 ? '/spare-parts' : i === 1 ? '/appointments' : '/reports');
                      }}
                      className="flex w-full gap-2 rounded-lg p-2 text-left hover:bg-muted"
                    >
                      <span className={cn('mt-1 h-2 w-2 shrink-0 rounded-full', i === 0 ? 'bg-amber-500' : 'bg-cyan-500')} />
                      <span className="text-xs text-muted-foreground">
                        {n}
                        <span className="mt-1 block text-[10px] text-slate-400">{i + 1}h ago</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              data-testid="select-branch"
              className="hidden h-10 rounded-lg border bg-card px-3 text-xs font-semibold outline-none md:block"
            >
              <option>All branches</option>
              {initialRows.branches.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                data-testid="button-profile-menu"
                className="flex items-center gap-2 rounded-lg p-1.5 pr-2 hover:bg-muted"
              >
                <div className="hidden text-right sm:block">
                  <div className="text-xs font-semibold text-foreground">Rohit Kumar</div>
                  <div className="text-[10px] text-muted-foreground">Operations lead</div>
                </div>
                <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-xs font-bold text-cyan-300">
                  RK
                </div>
                <Icons.ChevronDown size={14} className="hidden text-muted-foreground sm:block" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 z-30 w-44 rounded-xl border bg-card p-1.5 shadow-lg">
                  <Link href="/settings" className="flex rounded-lg px-3 py-2 text-xs hover:bg-muted">
                    Account settings
                  </Link>
                  <button
                    onClick={() => setLocation('/login')}
                    className="flex w-full rounded-lg px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1540px] px-4 py-6 sm:px-7 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
