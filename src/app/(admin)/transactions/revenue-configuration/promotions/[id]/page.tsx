import { use } from 'react';
import { Metadata } from 'next';
import { PromotionDetailView } from '@/components/transactions/revenue/PromotionDetailView';

export const metadata: Metadata = {
  title: 'Promotion Details | Box2Box Admin',
  description: 'View promotion transaction history and performance analytics',
};

export default function PromotionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <PromotionDetailView promoId={resolvedParams?.id} />;
}
