import { Metadata } from 'next';
import { PointRuleDetailView } from '@/components/rewards/PointRuleDetailView';

export const metadata: Metadata = {
  title: 'Point Earning Rule Details | Box2Box Admin',
  description: 'View point earning rule overview and user earning history',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PointRuleDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <PointRuleDetailView ruleId={id} />;
}
