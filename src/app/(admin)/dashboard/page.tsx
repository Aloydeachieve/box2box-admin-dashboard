'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SlidableStats } from '@/components/dashboard/SlidableStats';
import { HeatMapCard } from '@/components/dashboard/HeatMapCard';
import { ChartsSection } from '@/components/dashboard/ChartsSection';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { DashboardTables } from '@/components/dashboard/DashboardTables';

export default function DashboardOverviewPage() {
  const router = useRouter();

  const handleNavigate = (section: string) => {
    switch (section) {
      case 'users':
        router.push('/users');
        break;
      case 'box_mgt':
      case 'boxes':
        router.push('/box-management');
        break;
      case 'box_regt':
        router.push('/box-registration');
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Top Section: Slidable Stats on Left + Heat Map Card on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.45fr) minmax(0, 1fr)',
          gap: '16px',
        }}
        className="top-overview-grid"
      >
        {/* Slidable Stats Card */}
        <SlidableStats />

        {/* Heat Map Card */}
        <HeatMapCard />
      </div>

      {/* Charts Section: User Distribution, User Growth, Revenue */}
      <ChartsSection />

      {/* Quick Actions Grid: Exactly 3 columns x 2 rows */}
      <QuickActions onSelectAction={handleNavigate} />

      {/* Tables Section: New Users, Recent Box, Recent Inventory */}
      <DashboardTables onNavigateToSection={handleNavigate} />
    </>
  );
}
