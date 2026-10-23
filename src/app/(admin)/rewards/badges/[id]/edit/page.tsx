import { Metadata } from 'next';
import { EditBadgeView } from '@/components/rewards/EditBadgeView';

export const metadata: Metadata = {
  title: 'Edit Badge | Box2Box Admin',
  description: 'Update existing reward badge rules, requirement, and points',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBadgePage({ params }: PageProps) {
  const { id } = await params;
  return <EditBadgeView badgeId={id} />;
}
