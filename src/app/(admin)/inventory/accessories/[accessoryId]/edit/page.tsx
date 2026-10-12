import React from 'react';
import { EditAccessoryView } from '@/components/inventory/accessories/EditAccessoryView';

interface EditAccessoryPageProps {
  params: Promise<{
    accessoryId: string;
  }>;
}

export default async function EditAccessoryPage({ params }: EditAccessoryPageProps) {
  const resolvedParams = await params;
  return <EditAccessoryView accessoryId={resolvedParams.accessoryId} />;
}
