'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { EditBranchView } from '@/components/admin-mgt/EditBranchView';

export default function EditBranchPage() {
  const params = useParams();
  const branchId = typeof params?.id === 'string' ? params.id : 'br-1';

  return <EditBranchView branchId={branchId} />;
}
