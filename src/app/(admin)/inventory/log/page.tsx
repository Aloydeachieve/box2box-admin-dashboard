import React, { Suspense } from 'react';
import { InventoryLogView } from '@/components/inventory/log/InventoryLogView';

export const metadata = {
  title: 'Inventory Log | Box2Box Admin',
  description: 'View and manage all stock, inventory levels, and parts logs',
};

export default function InventoryLogPage() {
  return (
    <Suspense fallback={<div style={{ padding: '24px', color: '#8E8E93' }}>Loading Inventory Log...</div>}>
      <InventoryLogView />
    </Suspense>
  );
}
