import React from 'react';
import { InventoryBoxesView } from '@/components/inventory/boxes/InventoryBoxesView';

export const metadata = {
  title: 'Inventory - Boxes | Box2Box Admin',
  description: 'Manage box models and stock by location across the network',
};

export default function InventoryPage() {
  return <InventoryBoxesView />;
}
