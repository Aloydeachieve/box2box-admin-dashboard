import React from 'react';
import { NewAccessoryView } from '@/components/inventory/accessories/NewAccessoryView';

export const metadata = {
  title: 'New Accessory | Box2Box Admin',
  description: 'Create and provision a new box accessory model',
};

export default function NewAccessoryPage() {
  return <NewAccessoryView />;
}
