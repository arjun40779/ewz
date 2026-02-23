'use client';

interface VisualEditingProviderProps {
  readonly children: React.ReactNode;
  readonly isEnabled?: boolean;
}

export default function VisualEditingProvider({
  children,
  isEnabled = false,
}: VisualEditingProviderProps) {
  // Simple provider for now - can be extended later with actual visual editing
  return <>{children}</>;
}

