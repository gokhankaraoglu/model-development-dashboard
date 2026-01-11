import type { Operation } from "../../../types";
import { formatOperationName, formatTime } from "../../../utils";

interface OperationItemProps {
  operation: Operation;
}

const getOperationIcon = (operationType: string, operationName: string) => {
  if (operationType === "column_action") {
    switch (operationName) {
      case "log_transform":
      case "create_ratio":
        return "🧮";
      case "aggregate":
        return "📊";
      case "calculate_days_since":
        return "📅";
      case "moving_average":
        return "📈";
      default:
        return "⚙️";
    }
  } else if (operationType === "table_action") {
    switch (operationName) {
      case "remove_nulls":
        return "🧹";
      case "join":
        return "🔗";
      default:
        return "🗃️";
    }
  }
  return "⚡";
};

export const OperationItem = ({ operation }: OperationItemProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 flex flex-col items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg">
          {getOperationIcon(operation.operation_type, operation.operation_name)}
        </span>
        <div className="flex-1 w-px bg-slate-200" />
      </div>

      <div className="flex-1 rounded-lg border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-medium text-slate-900">
            {formatOperationName(operation.operation_name)}
          </span>
          <span className="text-xs text-slate-500">
            {formatTime(operation.execution_timestamp)}
          </span>
        </div>

        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1">
            {operation.operation_type}
          </span>
          <span>by {operation.executed_by.name}</span>
          <span>on {operation.affected_table}</span>
        </div>

        {operation.input_parameters &&
          Object.keys(operation.input_parameters).length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {Object.entries(operation.input_parameters).map(
                ([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5"
                  >
                    <span className="font-medium text-slate-700">{key}:</span>
                    <code className="text-[11px] text-slate-600">
                      {String(value)}
                    </code>
                  </span>
                )
              )}
            </div>
          )}
      </div>
    </div>
  );
};
