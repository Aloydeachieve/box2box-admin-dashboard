import { use } from 'react';
import { Metadata } from 'next';
import { SubscriptionPlanDetailView } from '@/components/transactions/revenue/SubscriptionPlanDetailView';

export const metadata: Metadata = {
  title: 'Subscription Details | Box2Box Admin',
  description: 'View subscription plan subscribers and analytics',
};

export default function SubscriptionPlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <SubscriptionPlanDetailView planId={resolvedParams?.id} />;
}
