import dayjs from "dayjs";
import type { Operation } from "../../../types";
import { EmptyState } from "../../ui/EmptyState";
import { ErrorMessage } from "../../ui/ErrorMessage";
import { useRecentOperations } from "../../../hooks/useOperations";
import OperationsTimelineSkeleton from "./OperationsTimelineSkeleton";
import { OperationGroup } from "./OperationGroup";
import { useAppSelector } from "../../../store/hooks";
import { selectedProjectId } from "../../../store/selectors";
import { DashboardCard } from "../../layout/DashboardCard";
import { AllOperationsModal } from "./AllOperationsModal";

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
  if (!operations || operations.length === 0)
    return (
      <EmptyState
        title="Recent Operations Timeline"
        headerRight={
          <span className="text-xs sm:text-sm text-slate-500">
            0 operations
          </span>
        }
        message="No recent operations found."
      />
    );

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
    <DashboardCard
      title="Recent Operations Timeline"
      headerRight={
        <span className="text-xs sm:text-sm text-slate-500">
          Last {operations.length} operations
        </span>
      }
    >
      <div className="space-y-6">
        {groupedOperations.map((group) => (
          <OperationGroup
            key={group.date}
            date={group.date}
            operations={group.operations}
          />
        ))}
      </div>

      {operations.length > 0 && <AllOperationsModal operations={operations} />}
    </DashboardCard>
  );
};
