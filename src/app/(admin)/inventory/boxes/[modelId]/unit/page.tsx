import { redirect } from 'next/navigation';

export default async function UnitIndexPage({
  params,
}: {
  params: Promise<{ modelId: string }>;
}) {
  const resolved = await params;
  const modelId = resolved?.modelId || 'mybox-standard';
  redirect(`/inventory/boxes/${modelId}/unit/MyBox-123456`);
}
