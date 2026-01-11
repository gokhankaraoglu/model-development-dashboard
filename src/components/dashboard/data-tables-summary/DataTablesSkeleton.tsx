import { Skeleton } from "../../ui";

export const DataTablesSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-6 pb-3 border-b-2 border-gray-100">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="hidden md:block">
        <div className="grid grid-cols-6 gap-0 border-b-2 border-gray-200 bg-gray-100">
          <Skeleton className="h-5 w-28 m-4" />
          <Skeleton className="h-5 w-16 m-4" />
          <Skeleton className="h-5 w-16 m-4" />
          <Skeleton className="h-5 w-16 m-4" />
          <Skeleton className="h-5 w-16 m-4" />
          <Skeleton className="h-5 w-20 m-4" />
        </div>

        {[1, 2, 3].map((row) => (
          <div
            key={row}
            className="grid grid-cols-6 gap-0 border-b border-gray-200"
          >
            <div className="p-4 flex items-center gap-3">
              <Skeleton className="h-4 w-4" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="p-4 flex items-center">
              <Skeleton className="h-6 w-20 rounded" />
            </div>
            <div className="p-4 flex items-center">
              <Skeleton className="h-4 w-8" />
            </div>
            <div className="p-4 flex items-center">
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="p-4 flex items-center">
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="p-4 flex items-center justify-end gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-7 w-24 rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden space-y-3">
        {[1, 2, 3].map((row) => (
          <div
            key={row}
            className="border border-gray-200 rounded-lg p-4 space-y-3"
          >
            <div className="space-y-1">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-20 rounded" />
              <Skeleton className="h-7 w-24 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
