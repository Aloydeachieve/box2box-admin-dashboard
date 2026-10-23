import React, { Suspense } from 'react';
import { PartCategoryDetailView } from '@/components/inventory/parts/PartCategoryDetailView';

export const dynamic = 'force-dynamic';

export default async function PartCategoryDetailPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const resolvedParams = await params;
  const categoryId = resolvedParams?.categoryId || 'bpc-1';

  return (
    <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading...</div>}>
      <PartCategoryDetailView categoryId={categoryId} />
    </Suspense>
  );
}
