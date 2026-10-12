import React, { Suspense } from 'react';
import { InventoryBoxModelDetailView } from '@/components/inventory/boxes/InventoryBoxModelDetailView';

export const dynamic = 'force-dynamic';

export default async function InventoryBoxModelDetailPage({
  params,
}: {
  params: Promise<{ modelId: string }>;
}) {
  const resolvedParams = await params;
  const modelId = resolvedParams?.modelId || 'mybox-standard';

  return (
    <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading...</div>}>
      <InventoryBoxModelDetailView modelId={modelId} />
    </Suspense>
  );
}
