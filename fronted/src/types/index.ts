export interface Row {
  id: string;
  name: string;
  detail: string;
  meta: string;
  status: string;
  amount?: string;
  secondary?: string;
}

export interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}
