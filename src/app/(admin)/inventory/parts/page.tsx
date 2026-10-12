import React from 'react';
import { InventoryPartsView } from '@/components/inventory/parts/InventoryPartsView';

export const metadata = {
  title: 'Inventory - Parts | Box2Box Admin',
  description: 'View and manage all box parts, stock, categories, and suppliers',
};

export default function InventoryPartsPage() {
  return <InventoryPartsView />;
}
