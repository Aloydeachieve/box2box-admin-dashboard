import { Metadata } from 'next';
import { CreatePromotionView } from '@/components/transactions/revenue/CreatePromotionView';

export const metadata: Metadata = {
  title: 'New Promotion | Box2Box Admin',
  description: 'Create new promotion discount or disable fee rule',
};

export default function NewPromotionPage() {
  return <CreatePromotionView />;
}
