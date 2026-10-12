import React from 'react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const metadata = {
  title: 'Box2Box Admin Dashboard',
  description: 'Enterprise smart locker management platform',
};

export default function AdminRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
