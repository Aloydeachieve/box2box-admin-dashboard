import { Metadata } from 'next';
import { BadgeDetailView } from '@/components/rewards/BadgeDetailView';

export const metadata: Metadata = {
  title: 'Badge Details | Box2Box Admin',
  description: 'View reward badge requirements and user unlock history',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BadgeDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <BadgeDetailView badgeId={id} />;
}
