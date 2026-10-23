import { Metadata } from 'next';
import { RewardsConfigView } from '@/components/rewards/RewardsConfigView';

export const metadata: Metadata = {
  title: 'Rewards Configuration | Box2Box Admin',
  description: 'Configure points, badges, referrals and reward rules',
};

export default function RewardsPage() {
  return <RewardsConfigView />;
}
