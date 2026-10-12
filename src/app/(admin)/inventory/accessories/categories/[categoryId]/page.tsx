import React from 'react';
import { CategoryDetailView } from '@/components/inventory/accessories/CategoryDetailView';

interface CategoryDetailPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const resolvedParams = await params;
  return <CategoryDetailView categoryId={resolvedParams.categoryId} />;
}
