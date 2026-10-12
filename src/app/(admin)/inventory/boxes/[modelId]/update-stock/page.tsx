import React, { Suspense } from 'react';
import { InventoryBoxModelDetailView } from '@/components/inventory/boxes/InventoryBoxModelDetailView';

export const dynamic = 'force-dynamic';

export default async function UpdateStockRoutePage({
  params,
}: {
  params: Promise<{ modelId: string }>;
}) {
  const resolved = await params;
  const modelId = resolved?.modelId || 'mybox-standard';

  return (
    <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading...</div>}>
      <InventoryBoxModelDetailView modelId={modelId} initialViewMode="update_stock" />
    </Suspense>
  );
}
