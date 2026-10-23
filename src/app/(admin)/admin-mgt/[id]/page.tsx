'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { AdminDetailView } from '@/components/admin-mgt/AdminDetailView';

export default function AdminDetailPage() {
  const params = useParams();
  const adminId = typeof params?.id === 'string' ? params.id : 'adm-1';

  return <AdminDetailView adminId={adminId} />;
}
