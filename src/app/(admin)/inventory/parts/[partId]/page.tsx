import React, { Suspense } from 'react';
import { PartDetailView } from '@/components/inventory/parts/PartDetailView';
import { PartUnitDetailView } from '@/components/inventory/parts/PartUnitDetailView';
import { EditPartStockView } from '@/components/inventory/parts/EditPartStockView';
import { UpdatePartStockView } from '@/components/inventory/parts/UpdatePartStockView';

export const dynamic = 'force-dynamic';

export default async function PartDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ partId: string }>;
  searchParams?: Promise<{ view?: string; unitId?: string; loc?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const partId = resolvedParams?.partId || 'bp-1';
  const view = resolvedSearchParams?.view;

  if (view === 'unit-detail') {
    return (
      <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading...</div>}>
        <PartUnitDetailView partId={partId} unitId={resolvedSearchParams?.unitId} />
      </Suspense>
    );
  }

  if (view === 'edit-stock') {
    return (
      <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading...</div>}>
        <EditPartStockView partId={partId} unitId={resolvedSearchParams?.unitId} />
      </Suspense>
    );
  }

  if (view === 'update-stock') {
    return (
      <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading...</div>}>
        <UpdatePartStockView partId={partId} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading...</div>}>
      <PartDetailView partId={partId} />
    </Suspense>
  );
}
