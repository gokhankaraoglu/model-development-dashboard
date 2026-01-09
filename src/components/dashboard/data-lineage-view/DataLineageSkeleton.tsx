import { Skeleton } from "../../ui/Skeleton";

export function DataLineageSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
      <div className="mb-4 flex items-center justify-between pb-3 border-b border-gray-100">
        <Skeleton className="h-5 w-40" />
        <div className="flex gap-5 text-xs text-gray-600">
          <span className="inline-flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-md" />
            <Skeleton className="h-3 w-20" />
          </span>
          <span className="inline-flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-md" />
            <Skeleton className="h-3 w-20" />
          </span>
        </div>
      </div>

      <div className="relative mt-2 min-h-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-start gap-4">
            <div className="flex gap-16">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-32 rounded-lg" />
                ))}
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-32 rounded-lg" />
                ))}
              </div>
            </div>
            <Skeleton className="h-6 w-64 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
