import { Metadata } from 'next';
import { CreatePointRuleView } from '@/components/rewards/CreatePointRuleView';

export const metadata: Metadata = {
  title: 'Create Point Earning Rule | Box2Box Admin',
  description: 'Create and configure point earning rules and unlock conditions',
};

export default function CreatePointRulePage() {
  return <CreatePointRuleView />;
}
