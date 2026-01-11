import { Skeleton } from "../../ui";

export default function ProjectHeaderSkeleton() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
      <div className="flex justify-between items-start mb-6 flex-wrap gap-6">
        <div className="flex-1 min-w-72 space-y-3">
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-2 flex-wrap">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-md" />
            <Skeleton className="h-6 w-32 rounded-md" />
          </div>
        </div>

        <div className="flex gap-12 flex-wrap">
          <div className="flex flex-col gap-3">
            <div className="space-y-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-3">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="h-3 w-10/12" />
        </div>
      </div>
    </div>
  );
}
