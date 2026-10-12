import React from 'react';
import { InventoryAccessoriesView } from '@/components/inventory/accessories/InventoryAccessoriesView';

export const metadata = {
  title: 'Inventory - Accessories | Box2Box Admin',
  description: 'View and manage all box accessories, stock, and categories',
};

export default function InventoryAccessoriesPage() {
  return <InventoryAccessoriesView />;
}
