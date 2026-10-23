import React from 'react';
import { OrdersView } from '@/components/orders/OrdersView';

export const metadata = {
  title: 'Orders | Box2Box Admin',
  description: 'Manage hardware orders lifecycle from purchase to delivery',
};

export default function OrdersPage() {
  return <OrdersView />;
}
