import type { ReactNode } from "react";

type LoadingProps = {
  title?: string;
  description?: string;
  fullscreen?: boolean;
  icon?: ReactNode;
};

export function Loading({
  title = "Preparing your workspace",
  description = "We're loading your projects and preparing the dashboard overview. This usually takes just a moment.",
  fullscreen = true,
  icon,
}: LoadingProps) {
  return (
    <div
      className={
        fullscreen
          ? "min-h-screen bg-gray-50 flex items-center justify-center px-4"
          : "w-full flex items-center justify-center px-4 py-6"
      }
    >
      <div className="max-w-lg w-full rounded-2xl bg-white shadow-xl border border-emerald-200 p-6 space-y-3 text-gray-900">
        <div className="flex items-center gap-3">
          {icon ?? (
            <span
              className="h-2.5 w-2.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
          )}
          <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-900">
            {title}
          </h2>
        </div>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
    </div>
  );
}

export default Loading;
