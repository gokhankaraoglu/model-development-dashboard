import type { ComplianceChecklist as ComplianceChecklistType } from "../../../types";
import { getComplianceStatusColorClass } from "../../../utils/formatters";

interface ComplianceChecklistProps {
  checklist: ComplianceChecklistType;
}

export function ComplianceChecklist({ checklist }: ComplianceChecklistProps) {
  const badgeColorClass = getComplianceStatusColorClass(checklist.status);

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Compliance checklist
        </h3>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize text-white ${badgeColorClass}`}
        >
          {checklist.status.replace("_", " ")}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span className="font-medium">{checklist.template_name}</span>
          <span className="text-xs text-gray-500">
            Assigned to:{" "}
            <span className="font-medium text-gray-700">
              {checklist.assigned_to?.name}
            </span>
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              {checklist.completed_items} of {checklist.total_items} items
              completed
            </span>
            <span className="font-medium text-gray-700">
              {checklist.completion_percentage}%
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${badgeColorClass}`}
              style={{ width: `${checklist.completion_percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceChecklist;
