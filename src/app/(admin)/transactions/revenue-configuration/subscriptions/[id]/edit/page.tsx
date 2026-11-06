import { use } from 'react';
import { Metadata } from 'next';
import { EditSubscriptionPlanView } from '@/components/transactions/revenue/EditSubscriptionPlanView';

export const metadata: Metadata = {
  title: 'Edit Plan | Box2Box Admin',
  description: 'Update subscription plan parameters and pricing',
};

export default function EditSubscriptionPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <EditSubscriptionPlanView planId={resolvedParams?.id} />;
}
