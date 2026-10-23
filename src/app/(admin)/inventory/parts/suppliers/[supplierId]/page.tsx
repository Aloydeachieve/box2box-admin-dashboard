import React, { Suspense } from 'react';
import { PartSupplierDetailView } from '@/components/inventory/parts/PartSupplierDetailView';

export const dynamic = 'force-dynamic';

export default async function PartSupplierDetailPage({
  params,
}: {
  params: Promise<{ supplierId: string }>;
}) {
  const resolvedParams = await params;
  const supplierId = resolvedParams?.supplierId || 'bpsup-1';

  return (
    <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading...</div>}>
      <PartSupplierDetailView supplierId={supplierId} />
    </Suspense>
  );
}
