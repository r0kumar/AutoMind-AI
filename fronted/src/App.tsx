import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppShell } from '@/components/layout/AppShell';

// Pages
import NotFound from '@/pages/not-found';
import { Marketing } from '@/pages/Marketing';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { AppointmentsPage } from '@/pages/AppointmentsPage';
import { CustomersPage } from '@/pages/CustomersPage';
import { VehiclesPage } from '@/pages/VehiclesPage';
import { ServiceJobsPage } from '@/pages/ServiceJobsPage';
import { JobCardsPage } from '@/pages/JobCardsPage';
import { SparePartsPage } from '@/pages/SparePartsPage';
import { BillingPage } from '@/pages/BillingPage';
import { ServiceHistoryPage } from '@/pages/ServiceHistoryPage';
import { BranchesPage } from '@/pages/BranchesPage';
import { Analytics } from '@/pages/Analytics';
import { AIInsights } from '@/pages/AIInsights';
import { Reports } from '@/pages/Reports';
import { Settings } from '@/pages/Settings';

const queryClient = new QueryClient();

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Marketing} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard">
        <AppShell>
          <Dashboard />
        </AppShell>
      </Route>
      <Route path="/appointments">
        <AppShell>
          <AppointmentsPage />
        </AppShell>
      </Route>
      <Route path="/customers">
        <AppShell>
          <CustomersPage />
        </AppShell>
      </Route>
      <Route path="/vehicles">
        <AppShell>
          <VehiclesPage />
        </AppShell>
      </Route>
      <Route path="/service-jobs">
        <AppShell>
          <ServiceJobsPage />
        </AppShell>
      </Route>
      <Route path="/job-cards">
        <AppShell>
          <JobCardsPage />
        </AppShell>
      </Route>
      <Route path="/spare-parts">
        <AppShell>
          <SparePartsPage />
        </AppShell>
      </Route>
      <Route path="/billing">
        <AppShell>
          <BillingPage />
        </AppShell>
      </Route>
      <Route path="/service-history">
        <AppShell>
          <ServiceHistoryPage />
        </AppShell>
      </Route>
      <Route path="/branches">
        <AppShell>
          <BranchesPage />
        </AppShell>
      </Route>
      <Route path="/analytics">
        <AppShell>
          <Analytics />
        </AppShell>
      </Route>
      <Route path="/ai-insights">
        <AppShell>
          <AIInsights />
        </AppShell>
      </Route>
      <Route path="/reports">
        <AppShell>
          <Reports />
        </AppShell>
      </Route>
      <Route path="/settings">
        <AppShell>
          <Settings />
        </AppShell>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ErrorBoundary resetKey={window.location.pathname}>
            <AppRouter />
          </ErrorBoundary>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;