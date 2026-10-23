import { Metadata } from 'next';
import { use } from 'react';
import { EditAdminView } from '@/components/admin-mgt/EditAdminView';

export const metadata: Metadata = {
  title: 'Edit Admin | Box2Box Admin',
  description: 'Update administrator details, assigned permissions, and branch access',
};

export default function EditAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <EditAdminView adminId={resolvedParams?.id} />;
}
