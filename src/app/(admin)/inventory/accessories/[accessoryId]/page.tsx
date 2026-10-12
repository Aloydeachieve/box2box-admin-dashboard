import React, { Suspense } from 'react';
import { AccessoryDetailView } from '@/components/inventory/accessories/AccessoryDetailView';

export const dynamic = 'force-dynamic';

export default async function AccessoryDetailPage({
  params,
}: {
  params: Promise<{ accessoryId: string }>;
}) {
  const resolvedParams = await params;
  const accessoryId = resolvedParams?.accessoryId || 'acc-1';

  return (
    <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading...</div>}>
      <AccessoryDetailView accessoryId={accessoryId} />
    </Suspense>
  );
}
