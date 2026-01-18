import type { ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { ErrorPage } from ".";

interface GlobalErrorBoundaryProps {
  children: ReactNode;
}

function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  let detail = "An unexpected error occurred while rendering the application.";

  if (error instanceof Error) {
    detail = `${error.name}: ${error.message}`;
  }

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
