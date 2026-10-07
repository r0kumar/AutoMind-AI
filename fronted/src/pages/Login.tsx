import * as Icons from 'lucide-react';
import { useLocation } from 'wouter';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/shared/Button';

export function Login() {
  const [, setLocation] = useLocation();

  return (
    <div className="grid min-h-[100dvh] bg-[#f5f8fa] lg:grid-cols-[.9fr_1.1fr]">
      <div className="relative hidden overflow-hidden bg-slate-900 p-10 lg:block">
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full border border-cyan-400/15" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full border border-cyan-400/10" />
        <Logo dark />
        <div className="relative mt-40 max-w-md">
          <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            Service intelligence
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.03] tracking-tight text-white">
            A clearer view of every vehicle, bay, and branch.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-slate-400">
            AutoMind AI gives modern service teams the confidence to move from daily activity to better decisions.
          </p>
        </div>
        <div className="absolute bottom-10 text-[10px] text-slate-500">
          © 2024 AutoMind AI · Frontend demo environment
        </div>
      </div>
      <div className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-[420px]">
          <div className="mb-12 lg:hidden">
            <Logo />
          </div>
          <div className="mb-8">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-600">Welcome back</div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Sign in to AutoMind</h2>
            <p className="mt-2 text-sm text-muted-foreground">Your operational picture is waiting.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLocation('/dashboard');
            }}
            className="space-y-4"
          >
            <label className="block text-xs font-semibold">
              Work email
              <input
                type="email"
                required
                defaultValue="rohit@apexautocare.in"
                data-testid="input-login-email"
                className="mt-1.5 h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10"
              />
            </label>
            <label className="block text-xs font-semibold">
              Password
              <div className="input-shell mt-1.5 bg-white">
                <input
                  type="password"
                  required
                  defaultValue="password"
                  data-testid="input-login-password"
                  className="w-full bg-transparent text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => alert('Password visibility toggled in demo')}
                  className="text-muted-foreground"
                >
                  <Icons.Eye size={16} />
                </button>
              </div>
            </label>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" defaultChecked className="accent-cyan-500" /> Remember me
              </label>
              <button
                type="button"
                onClick={() => alert('Reset link flow is demo-only')}
                className="font-semibold text-cyan-700"
              >
                Forgot password?
              </button>
            </div>
            <Button type="submit" className="mt-3 h-11 w-full">
              Sign in <Icons.ArrowRight size={16} />
            </Button>
          </form>
          <div className="my-7 flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-400">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>
          <button
            onClick={() => setLocation('/dashboard')}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border bg-card text-xs font-bold hover:bg-muted"
          >
            <Icons.Command size={15} />
            Continue with workspace demo
          </button>
          <p className="mt-8 text-center text-[10px] leading-relaxed text-muted-foreground">
            By continuing, you agree to AutoMind’s demo terms and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
