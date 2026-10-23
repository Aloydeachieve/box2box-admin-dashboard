import { Metadata } from 'next';
import { CreateAdminView } from '@/components/admin-mgt/CreateAdminView';

export const metadata: Metadata = {
  title: 'New Admin | Box2Box Admin',
  description: 'Create a new administrator and assign roles and branch access',
};

export default function NewAdminPage() {
  return <CreateAdminView />;
}
