import { use } from 'react';
import { Metadata } from 'next';
import { TransactionDetailView } from '@/components/transactions/TransactionDetailView';

export const metadata: Metadata = {
  title: 'Transaction Details | Box2Box Admin',
  description: 'View transaction details, payment breakdown, and activity history',
};

export default function TransactionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ type?: string; status?: string }>;
}) {
  const resolvedParams = use(params);
  const resolvedSearchParams = searchParams ? use(searchParams) : undefined;
  return (
    <TransactionDetailView
      transactionId={resolvedParams?.id}
      initialType={resolvedSearchParams?.type}
      initialStatus={resolvedSearchParams?.status}
    />
  );
}
