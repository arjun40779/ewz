'use client';

import { VisualEditing } from '@sanity/visual-editing/react';

interface VisualEditingProviderProps {
  readonly children: React.ReactNode;
  readonly isEnabled?: boolean;
}

export default function VisualEditingProvider({
  children,
  isEnabled = false,
}: VisualEditingProviderProps) {
  return (
    <>
      {children}
      {isEnabled && <VisualEditing portal />}
    </>
  );
}

