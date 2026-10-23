import { Metadata } from 'next';
import { EditPointRuleView } from '@/components/rewards/EditPointRuleView';

export const metadata: Metadata = {
  title: 'Edit Point Earning Rule | Box2Box Admin',
  description: 'Update existing point earning rule settings and rewards',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPointRulePage({ params }: PageProps) {
  const { id } = await params;
  return <EditPointRuleView ruleId={id} />;
}
