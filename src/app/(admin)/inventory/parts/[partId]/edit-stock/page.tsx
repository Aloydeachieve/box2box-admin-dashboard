import React, { Suspense } from 'react';
import { EditPartStockView } from '@/components/inventory/parts/EditPartStockView';

export const dynamic = 'force-dynamic';

export default async function EditPartStockRoutePage({
  params,
}: {
  params: Promise<{ partId: string }>;
}) {
  const resolvedParams = await params;
  const partId = resolvedParams?.partId || 'bp-1';

  return (
    <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading...</div>}>
      <EditPartStockView partId={partId} />
    </Suspense>
  );
}
