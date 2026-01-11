interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="flex flex-col items-center justify-center px-6 py-12 text-center bg-white rounded-xl border border-red-500 text-red-600 shadow-sm"
      role="alert"
    >
      <div className="text-4xl mb-4">⚠️</div>
      <div className="max-w-md">
        <h3 className="text-lg font-semibold mb-2 text-red-600">Error</h3>
        <p className="text-sm mb-4 text-slate-500">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
