import { Metadata } from 'next';
import { CreateBadgeView } from '@/components/rewards/CreateBadgeView';

export const metadata: Metadata = {
  title: 'Create Badge | Box2Box Admin',
  description: 'Create and configure new reward badges and unlock rules',
};

export default function CreateBadgePage() {
  return <CreateBadgeView />;
}
