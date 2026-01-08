import dayjs from "dayjs";
import type { Operation } from "../../../types";
import { EmptyState } from "../../ui/EmptyState";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { useRecentOperations } from "../../../hooks/useOperations";
import OperationsTimelineSkeleton from "./OperationsTimelineSkeleton";
import { OperationGroup } from "./OperationGroup";
import { useAppSelector } from "../../../store/hooks";
import { selectedProjectId } from "../../../store/selectors";

interface GroupedOperations {
  date: string;
  operations: Operation[];
}

export const OperationsTimeline = () => {
  const currentProjectId = useAppSelector(selectedProjectId);
  const {
    data: operations,
    loading,
    error,
    refetch,
  } = useRecentOperations(currentProjectId);

  if (loading) return <OperationsTimelineSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!operations) return <EmptyState />;
  if (operations.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Operations
          </h2>
          <span className="text-xs text-slate-500">0 operations</span>
        </div>
        <p className="text-center text-slate-500 italic py-6">
          No recent operations found.
        </p>
      </div>
    );
  }

  const groupedOperations = operations.reduce<GroupedOperations[]>(
    (groups, operation) => {
      const dateKey = dayjs(operation.execution_timestamp)
        .startOf("day")
        .format("YYYY-MM-DD");

      const existingGroup = groups.find((group) => group.date === dateKey);
      if (existingGroup) {
        existingGroup.operations.push(operation);
      } else {
        groups.push({ date: dateKey, operations: [operation] });
      }

      return groups;
    },
    []
  );

  groupedOperations.sort(
    (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 space-y-6">
      <div className="flex justify-between items-center pb-3 border-b border-slate-200">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
          Recent Operations Timeline
        </h2>
        <span className="text-xs sm:text-sm text-slate-500">
          Last {operations.length} operations
        </span>
      </div>

      <div className="space-y-6">
        {groupedOperations.map((group) => (
          <OperationGroup
            key={group.date}
            date={group.date}
            operations={group.operations}
          />
        ))}
      </div>

      {operations.length >= 10 && (
        <div className="pt-3 border-t border-slate-200 flex justify-center">
          <button className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
            View All Operations
          </button>
        </div>
      )}
    </div>
  );
};
