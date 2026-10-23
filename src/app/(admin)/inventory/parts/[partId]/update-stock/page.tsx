import React, { Suspense } from 'react';
import { UpdatePartStockView } from '@/components/inventory/parts/UpdatePartStockView';

export const dynamic = 'force-dynamic';

export default async function UpdatePartStockPage({
  params,
}: {
  params: Promise<{ partId: string }>;
}) {
  const resolvedParams = await params;
  const partId = resolvedParams?.partId || 'bp-1';

  return (
    <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading...</div>}>
      <UpdatePartStockView partId={partId} />
    </Suspense>
  );
}
