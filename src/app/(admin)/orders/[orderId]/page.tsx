import React from 'react';
import { OrderDetailView } from '@/components/orders/detail/OrderDetailView';

export const metadata = {
  title: 'Order Details | Box2Box Admin',
  description: 'View and manage hardware order details and payment schedule',
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const resolvedParams = await params;
  return <OrderDetailView orderId={resolvedParams.orderId} />;
}
