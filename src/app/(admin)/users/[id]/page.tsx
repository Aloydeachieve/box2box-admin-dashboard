'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UserProfileDetailView } from '@/components/dashboard/users/UserProfileDetailView';
import { useAdmin } from '@/components/layout/AdminContext';

export default function UserProfileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = (params?.id as string) || '1';
  const { isLightMode } = useAdmin();

  return (
    <UserProfileDetailView
      userId={userId}
      isLightMode={isLightMode}
      onBack={() => router.push('/users')}
      onSeeMoreActivity={() => router.push(`/users/${userId}/activity`)}
      onSelectActivity={(id) => router.push(`/users/${userId}/activity/${id}`)}
    />
  );
}
