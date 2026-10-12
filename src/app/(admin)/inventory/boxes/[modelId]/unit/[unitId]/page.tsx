import React, { Suspense } from 'react';
import { InventoryUnitDetailView } from '@/components/inventory/boxes/InventoryUnitDetailView';

export const dynamic = 'force-dynamic';

export default async function InventoryUnitDetailPage({
  params,
}: {
  params: Promise<{ modelId: string; unitId: string }>;
}) {
  const resolvedParams = await params;
  const modelId = resolvedParams?.modelId || 'mybox-standard';
  const unitId = resolvedParams?.unitId || 'MyBox-123456';

  return (
    <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading unit details...</div>}>
      <InventoryUnitDetailView modelId={modelId} unitId={unitId} />
    </Suspense>
  );
}
