import { use } from 'react';
import { Metadata } from 'next';
import { EditPromotionView } from '@/components/transactions/revenue/EditPromotionView';

export const metadata: Metadata = {
  title: 'Edit Promotion | Box2Box Admin',
  description: 'Update existing promotion configuration parameters',
};

export default function EditPromotionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <EditPromotionView promoId={resolvedParams?.id} />;
}
