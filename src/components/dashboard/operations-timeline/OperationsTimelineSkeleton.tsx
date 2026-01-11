import { Skeleton } from "../../ui";

export const OperationsTimelineSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 space-y-6">
      <div className="flex justify-between items-center pb-3 border-b border-slate-200">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="space-y-6">
        {[1, 2].map((group) => (
          <div key={group} className="space-y-3">
            <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-500">
              <Skeleton className="h-3 w-16" />
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="space-y-3">
              {[1, 2].map((op) => (
                <div key={op} className="flex items-start gap-4">
                  <div className="mt-1 flex flex-col items-center gap-2">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex-1 w-px bg-slate-200" />
                  </div>

                  <div className="flex-1 rounded-lg border border-slate-200 bg-white p-3 sm:p-4 shadow-sm space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-16" />
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-24" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                      <Skeleton className="h-5 w-24 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
