import * as Icons from 'lucide-react';
import type { Row, NavGroup } from '../types';

export const initialRows: Record<string, Row[]> = {
  appointments: [
    { id: 'apt-1048', name: 'Ananya Mehta', detail: 'MH 12 QX 4218 · Honda City', meta: 'Today · 09:30', status: 'Confirmed', secondary: 'General service' },
    { id: 'apt-1049', name: 'Rohan Kapoor', detail: 'DL 3C AT 7821 · Hyundai Creta', meta: 'Today · 11:00', status: 'In service', secondary: 'Brake inspection' },
    { id: 'apt-1050', name: 'Mihir Shah', detail: 'GJ 01 RK 0991 · Tata Nexon', meta: 'Today · 14:15', status: 'Waiting', secondary: 'AC diagnostics' },
    { id: 'apt-1051', name: 'Sara Thomas', detail: 'KA 05 MN 2198 · Toyota Camry', meta: 'Tomorrow · 10:00', status: 'Confirmed', secondary: 'Oil & filter change' },
    { id: 'apt-1052', name: 'Dev Malhotra', detail: 'MH 14 TR 6303 · Mahindra XUV700', meta: 'Tomorrow · 16:30', status: 'Rescheduled', secondary: 'Wheel alignment' },
  ],
  customers: [
    { id: 'cus-001', name: 'Ananya Mehta', detail: 'ananya.mehta@email.com', meta: '4 vehicles · 12 visits', status: 'Active', secondary: '+91 98765 42108' },
    { id: 'cus-002', name: 'Rohan Kapoor', detail: 'rohan.kapoor@email.com', meta: '2 vehicles · 8 visits', status: 'Active', secondary: '+91 98201 11940' },
    { id: 'cus-003', name: 'Sara Thomas', detail: 'sara.thomas@email.com', meta: '1 vehicle · 5 visits', status: 'Active', secondary: '+91 99001 88210' },
    { id: 'cus-004', name: 'Dev Malhotra', detail: 'dev.malhotra@email.com', meta: '3 vehicles · 6 visits', status: 'At risk', secondary: '+91 98194 56130' },
  ],
  vehicles: [
    { id: 'veh-4218', name: 'MH 12 QX 4218', detail: 'Honda City · 2021', meta: 'Last service 12 Jun 2024', status: 'Due soon', secondary: 'Ananya Mehta' },
    { id: 'veh-7821', name: 'DL 3C AT 7821', detail: 'Hyundai Creta · 2022', meta: 'Last service 04 Jul 2024', status: 'In service', secondary: 'Rohan Kapoor' },
    { id: 'veh-0991', name: 'GJ 01 RK 0991', detail: 'Tata Nexon EV · 2023', meta: 'Last service 28 May 2024', status: 'Healthy', secondary: 'Mihir Shah' },
    { id: 'veh-2198', name: 'KA 05 MN 2198', detail: 'Toyota Camry · 2019', meta: 'Last service 18 Apr 2024', status: 'Overdue', secondary: 'Sara Thomas' },
  ],
  'service-jobs': [
    { id: 'JOB-2084', name: 'Full periodic service', detail: 'Ananya Mehta · MH 12 QX 4218', meta: 'Arjun Nair · Bay 04', status: 'In progress', amount: '₹8,450' },
    { id: 'JOB-2083', name: 'Brake pad replacement', detail: 'Rohan Kapoor · DL 3C AT 7821', meta: 'Neel Joshi · Bay 02', status: 'Awaiting approval', amount: '₹12,800' },
    { id: 'JOB-2082', name: 'AC diagnostics', detail: 'Mihir Shah · GJ 01 RK 0991', meta: 'Priya Menon · Bay 07', status: 'Inspection', amount: '₹1,950' },
    { id: 'JOB-2081', name: 'Wheel alignment', detail: 'Dev Malhotra · MH 14 TR 6303', meta: 'Arjun Nair · Bay 01', status: 'Completed', amount: '₹2,600' },
  ],
  'job-cards': [
    { id: 'JC-7742', name: 'Digital job card · JC-7742', detail: 'Honda City · Ananya Mehta', meta: 'Opened 09:34 · Bay 04', status: 'In progress', amount: '₹8,450' },
    { id: 'JC-7741', name: 'Digital job card · JC-7741', detail: 'Hyundai Creta · Rohan Kapoor', meta: 'Opened 08:55 · Bay 02', status: 'Awaiting approval', amount: '₹12,800' },
    { id: 'JC-7740', name: 'Digital job card · JC-7740', detail: 'Tata Nexon · Mihir Shah', meta: 'Opened yesterday · Bay 07', status: 'Inspection', amount: '₹1,950' },
  ],
  'spare-parts': [
    { id: 'part-001', name: 'Honda 0W-20 Synthetic Oil', detail: 'Lubricants · Motul India', meta: 'SKU MOT-020-HN', status: 'Healthy', secondary: '42 in stock' },
    { id: 'part-002', name: 'Front brake pad set · Creta', detail: 'Braking · Hyundai Genuine', meta: 'SKU HYU-BP-442', status: 'Low stock', secondary: '6 in stock' },
    { id: 'part-003', name: 'Cabin air filter · Nexon EV', detail: 'Filters · Tata Motors', meta: 'SKU TAT-CF-119', status: 'Healthy', secondary: '28 in stock' },
    { id: 'part-004', name: 'AC compressor belt · City', detail: 'Engine · Gates India', meta: 'SKU GAT-AC-218', status: 'Critical', secondary: '2 in stock' },
  ],
  'service-history': [
    { id: 'SH-10920', name: 'Periodic maintenance', detail: 'MH 12 QX 4218 · Ananya Mehta', meta: '12 Jun 2024 · Arjun Nair', status: 'Completed', amount: '₹8,450', secondary: 'Oil, filters, inspection' },
    { id: 'SH-10919', name: 'Brake inspection', detail: 'DL 3C AT 7821 · Rohan Kapoor', meta: '04 Jul 2024 · Neel Joshi', status: 'Completed', amount: '₹1,200', secondary: 'Front axle' },
    { id: 'SH-10918', name: 'Software update', detail: 'GJ 01 RK 0991 · Mihir Shah', meta: '28 May 2024 · Priya Menon', status: 'Completed', amount: '₹0', secondary: 'Battery management' },
  ],
  billing: [
    { id: 'INV-2048', name: 'Ananya Mehta', detail: 'Full periodic service · MH 12 QX 4218', meta: 'Issued today · UPI', status: 'Paid', amount: '₹8,450', secondary: 'JC-7742' },
    { id: 'INV-2047', name: 'Rohan Kapoor', detail: 'Brake pad replacement · DL 3C AT 7821', meta: 'Due 18 Jul · Card', status: 'Pending', amount: '₹12,800', secondary: 'JC-7741' },
    { id: 'INV-2046', name: 'Mihir Shah', detail: 'AC diagnostics · GJ 01 RK 0991', meta: 'Due 16 Jul · Cash', status: 'Overdue', amount: '₹1,950', secondary: 'JC-7740' },
    { id: 'INV-2045', name: 'Sara Thomas', detail: 'Oil & filter change · KA 05 MN 2198', meta: 'Issued 15 Jul · Card', status: 'Paid', amount: '₹3,200', secondary: 'JC-7739' },
  ],
  branches: [
    { id: 'br-001', name: 'Andheri West', detail: 'Mumbai · 8 service bays', meta: '1,248 services · 92.4% utilization', status: 'Top performer', amount: '₹48.2L', secondary: 'Rank #1' },
    { id: 'br-002', name: 'Koramangala', detail: 'Bengaluru · 6 service bays', meta: '982 services · 87.1% utilization', status: 'Stable', amount: '₹36.8L', secondary: 'Rank #2' },
    { id: 'br-003', name: 'Vastrapur', detail: 'Ahmedabad · 5 service bays', meta: '694 services · 74.3% utilization', status: 'Needs focus', amount: '₹22.4L', secondary: 'Rank #3' },
    { id: 'br-004', name: 'Delhi', detail: 'New Delhi · 7 service bays', meta: '1,106 services · 89.6% utilization', status: 'Stable', amount: '₹41.5L', secondary: 'Rank #4' },
    { id: 'br-005', name: 'Mumbai', detail: 'Mumbai · 9 service bays', meta: '1,384 services · 93.1% utilization', status: 'Top performer', amount: '₹52.7L', secondary: 'Rank #5' },
    { id: 'br-006', name: 'Chennai', detail: 'Chennai · 6 service bays', meta: '918 services · 84.8% utilization', status: 'Stable', amount: '₹33.9L', secondary: 'Rank #6' },
    { id: 'br-007', name: 'Hyderabad', detail: 'Hyderabad · 6 service bays', meta: '874 services · 82.5% utilization', status: 'Stable', amount: '₹31.6L', secondary: 'Rank #7' },
    { id: 'br-008', name: 'Pune', detail: 'Pune · 5 service bays', meta: '806 services · 80.2% utilization', status: 'Stable', amount: '₹28.8L', secondary: 'Rank #8' },
    { id: 'br-009', name: 'Kolkata', detail: 'Kolkata · 5 service bays', meta: '712 services · 77.9% utilization', status: 'Needs focus', amount: '₹24.1L', secondary: 'Rank #9' },
    { id: 'br-010', name: 'Jaipur', detail: 'Jaipur · 4 service bays', meta: '584 services · 73.4% utilization', status: 'Needs focus', amount: '₹19.8L', secondary: 'Rank #10' },
    { id: 'br-011', name: 'Lucknow', detail: 'Lucknow · 4 service bays', meta: '526 services · 71.8% utilization', status: 'Needs focus', amount: '₹17.9L', secondary: 'Rank #11' },
    { id: 'br-012', name: 'Chandigarh', detail: 'Chandigarh · 4 service bays', meta: '498 services · 76.1% utilization', status: 'Stable', amount: '₹18.6L', secondary: 'Rank #12' },
  ],
};

export const navGroups: NavGroup[] = [
  {
    label: 'Workspace',
    items: [
      { path: '/dashboard', label: 'Overview', icon: Icons.LayoutDashboard },
      { path: '/appointments', label: 'Appointments', icon: Icons.CalendarDays },
      { path: '/customers', label: 'Customers', icon: Icons.Users },
      { path: '/vehicles', label: 'Vehicles', icon: Icons.CarFront },
    ],
  },
  {
    label: 'Operations',
    items: [
      { path: '/service-jobs', label: 'Service jobs', icon: Icons.Wrench },
      { path: '/job-cards', label: 'Digital job cards', icon: Icons.ClipboardCheck },
      { path: '/spare-parts', label: 'Spare parts', icon: Icons.PackageSearch },
      { path: '/billing', label: 'Billing & payments', icon: Icons.CreditCard },
      { path: '/service-history', label: 'Service history', icon: Icons.History },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { path: '/branches', label: 'Branches', icon: Icons.Network },
      { path: '/analytics', label: 'Analytics', icon: Icons.BarChart3 },
      { path: '/ai-insights', label: 'AI insights', icon: Icons.Sparkles },
      { path: '/reports', label: 'Reports', icon: Icons.FileBarChart },
      { path: '/settings', label: 'Settings', icon: Icons.Settings2 },
    ],
  },
];
