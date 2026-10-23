import { Metadata } from 'next';
import { PointUsageView } from '@/components/rewards/PointUsageView';

export const metadata: Metadata = {
  title: 'Point Usage | Box2Box Admin',
  description: 'Manage point redemption configuration and track usage analytics',
};

export default function PointUsagePage() {
  return <PointUsageView />;
}
