'use client';

import React, { use } from 'react';
import { InventoryBoxModelFormView } from '@/components/inventory/boxes/InventoryBoxModelFormView';

export default function EditBoxModelPage({
  params,
}: {
  params: Promise<{ modelId: string }>;
}) {
  const resolvedParams = use(params);
  const modelId = resolvedParams?.modelId || 'mybox-standard';

  return <InventoryBoxModelFormView mode="edit" modelId={modelId} />;
}
