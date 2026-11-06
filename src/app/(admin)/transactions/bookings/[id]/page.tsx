import { use } from 'react';
import { Metadata } from 'next';
import { BookingDetailView } from '@/components/transactions/BookingDetailView';

export const metadata: Metadata = {
  title: 'Booking Details | Box2Box Admin',
  description: 'View booking order, location, payment, tracking information, and activity feed',
};

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <BookingDetailView bookingId={resolvedParams?.id} />;
}
