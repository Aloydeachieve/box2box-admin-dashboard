import { use } from 'react';
import { Metadata } from 'next';
import { EditRevenueRuleView } from '@/components/transactions/revenue/EditRevenueRuleView';

export const metadata: Metadata = {
  title: 'Edit Rule | Box2Box Admin',
  description: 'Update revenue configuration rule details and parameters',
};

export default function EditRevenueRulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <EditRevenueRuleView ruleId={resolvedParams?.id} />;
}
