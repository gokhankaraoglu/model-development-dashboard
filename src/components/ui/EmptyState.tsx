interface EmptyStateProps {
  message?: string;
  className?: string;
}

export function EmptyState({
  message = "No data available.",
  className = "",
}: EmptyStateProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
      <div
        className={[
          "text-center text-slate-500 italic px-6 py-6 sm:py-8",
          className,
        ].join(" ")}
      >
        {message}
      </div>
    </div>
  );
}
