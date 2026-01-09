interface ErrorProps {
  error: string;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full rounded-2xl bg-white shadow-xl border border-red-200 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-red-50 flex items-center justify-center">
            <span
              className="h-2.5 w-2.5 rounded-full bg-red-500"
              aria-hidden="true"
            />
          </div>
          <div>
            <h1 className="text-sm font-semibold uppercase tracking-wide text-red-600">
              Something went wrong
            </h1>
            <p className="text-xs text-gray-600">
              An unexpected error occurred while rendering the dashboard.
            </p>
          </div>
        </div>

        <pre className="text-xs bg-gray-50 border border-gray-200 rounded-lg p-3 text-red-700 overflow-auto max-h-40">
          {error}
        </pre>

        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
          >
            Try again
          </button>
          <p className="text-[11px] text-gray-500">
            If this keeps happening, please refresh the page.
          </p>
        </div>
      </div>
    </div>
  );
}
