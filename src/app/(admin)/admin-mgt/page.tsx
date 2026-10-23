import { Metadata } from 'next';
import { AdminManagementView } from '@/components/admin-mgt/AdminManagementView';

export const metadata: Metadata = {
  title: 'Admin Management | Box2Box Admin',
  description: 'Manage administrators, assign roles, and control access across branches',
};

export default function AdminManagementPage() {
  return <AdminManagementView />;
}
