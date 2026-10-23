import React, { Suspense } from 'react';
import { PartUnitDetailView } from '@/components/inventory/parts/PartUnitDetailView';

export const dynamic = 'force-dynamic';

export default async function PartUnitDetailPage({
  params,
}: {
  params: Promise<{ partId: string; unitId: string }>;
}) {
  const resolvedParams = await params;
  const partId = resolvedParams?.partId || 'bp-1';
  const unitId = resolvedParams?.unitId || 'MBX-789012';

  return (
    <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading...</div>}>
      <PartUnitDetailView partId={partId} unitId={unitId} />
    </Suspense>
  );
}
