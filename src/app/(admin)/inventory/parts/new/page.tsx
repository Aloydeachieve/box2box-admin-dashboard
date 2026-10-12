import React from 'react';
import { NewPartView } from '@/components/inventory/parts/NewPartView';

export const metadata = {
  title: 'New Part | Box2Box Admin',
  description: 'Create a new box part',
};

export default function NewPartPage() {
  return <NewPartView />;
}
