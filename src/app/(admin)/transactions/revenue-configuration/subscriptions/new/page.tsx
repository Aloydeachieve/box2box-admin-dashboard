import { Metadata } from 'next';
import { CreateSubscriptionPlanView } from '@/components/transactions/revenue/CreateSubscriptionPlanView';

export const metadata: Metadata = {
  title: 'New Plan | Box2Box Admin',
  description: 'Create new subscription plan and duration options',
};

export default function NewSubscriptionPlanPage() {
  return <CreateSubscriptionPlanView />;
}
