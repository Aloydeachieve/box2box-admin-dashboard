import { use } from 'react';
import { Metadata } from 'next';
import { RevenueRuleDetailView } from '@/components/transactions/revenue/RevenueRuleDetailView';

export const metadata: Metadata = {
  title: 'Revenue Rule Details | Box2Box Admin',
  description: 'View revenue configuration rule parameters, history, and transaction metrics',
};

export default function RevenueRuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <RevenueRuleDetailView ruleId={resolvedParams?.id} />;
}
