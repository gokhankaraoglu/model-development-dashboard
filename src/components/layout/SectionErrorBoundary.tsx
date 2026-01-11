import type { ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { ErrorMessage } from "../ui";

export interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
  onRetry?: () => void;
}

function SectionFallback({
  resetErrorBoundary,
  error,
  sectionName,
  onRetry,
}: FallbackProps & { sectionName?: string; onRetry?: () => void }) {
  const label = sectionName ?? "this section";
  const detail = error?.message ?? "An unexpected error occurred.";

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
    resetErrorBoundary();
  };

  return (
    <ErrorMessage
      message={`Something went wrong while rendering ${label}: ${detail}`}
      onRetry={handleRetry}
    />
  );
}

export function SectionErrorBoundary({
  children,
  sectionName,
  onRetry,
}: SectionErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={(fallbackProps: FallbackProps) => (
        <SectionFallback
          {...fallbackProps}
          sectionName={sectionName}
          onRetry={onRetry}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export default SectionErrorBoundary;
