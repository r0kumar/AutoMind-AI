import * as Icons from 'lucide-react';
import { Button } from './Button';

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: () => void;
  actionLabel?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  actionLabel = 'Add new',
}: PageHeaderProps) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-600">
          {eyebrow || 'Workspace'}
          <span className="h-px w-5 bg-cyan-400" />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-[29px]">
          {title}
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      {action && (
        <Button onClick={action} testId={`button-${actionLabel.toLowerCase().replaceAll(' ', '-')}`}>
          <Icons.Plus size={16} />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
