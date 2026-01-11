import type { ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { ErrorPage } from ".";

interface GlobalErrorBoundaryProps {
  children: ReactNode;
}

function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const detail = error
    ? `${error.name}: ${error.message}`
    : "An unexpected error occurred while rendering the application.";

  return <ErrorPage error={detail} reset={resetErrorBoundary} />;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}

export default GlobalErrorBoundary;
