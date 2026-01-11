import dayjs from "dayjs";
import type { Operation } from "../../../types";
import { formatRelativeDate } from "../../../utils";
import { OperationItem } from ".";

interface OperationGroupProps {
  date: string;
  operations: Operation[];
}

export const OperationGroup = ({ date, operations }: OperationGroupProps) => {
  const sorted = [...operations].sort(
    (a, b) =>
      dayjs(b.execution_timestamp).valueOf() -
      dayjs(a.execution_timestamp).valueOf()
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span className="whitespace-nowrap">{formatRelativeDate(date)}</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <div className="space-y-3">
        {sorted.map((operation) => (
          <OperationItem
            key={operation.operation_log_id}
            operation={operation}
          />
        ))}
      </div>
    </div>
  );
};
