'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ActivityHistoryPageView } from '@/components/dashboard/users/ActivityHistoryPageView';
import { useAdmin } from '@/components/layout/AdminContext';

export default function UserActivityHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params?.id as string;
  const { isLightMode } = useAdmin();

  return (
    <ActivityHistoryPageView
      isLightMode={isLightMode}
      onBack={() => router.push(`/users/${userId}`)}
      onSelectActivity={(id) => router.push(`/users/${userId}/activity/${id}`)}
    />
  );
}
