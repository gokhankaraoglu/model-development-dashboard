import { formatDate } from "../../../utils/date";
import type { Approval } from "../../../types";
import { getApprovalIcon, getStatusColorClass } from "../../../utils";

interface ApprovalsListProps {
  approvals: Approval[];
}

export function ApprovalsList({ approvals }: ApprovalsListProps) {
  const pendingCount = approvals.filter((a) => a.status === "Pending").length;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Pending approvals
        </h3>
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
          {pendingCount} pending
        </span>
      </div>

      {approvals.length === 0 ? (
        <p className="text-sm text-gray-500">
          No approvals required at this time.
        </p>
      ) : (
        <div className="space-y-3">
          {approvals.map((approval) => {
            const statusClass = getStatusColorClass(approval.status);

            return (
              <div
                key={approval.approval_id}
                className="rounded-lg border border-gray-100 bg-gray-50/60 p-3"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg">
                      {getApprovalIcon(approval.status)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {approval.approval_type}
                      </span>
                      <span
                        className={`mt-1 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${statusClass}`}
                      >
                        {approval.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2 text-xs text-gray-600 sm:grid-cols-3">
                  <div>
                    <span className="font-medium text-gray-700">Approver:</span>{" "}
                    <span>
                      {approval.approver?.name} ({approval.approver?.role})
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Requested by:
                    </span>{" "}
                    <span>{approval.requested_by?.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Requested:
                    </span>{" "}
                    <span>
                      {approval.created_at && formatDate(approval.created_at)}
                    </span>
                  </div>
                  {approval.approved_at && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Approved:
                      </span>{" "}
                      <span>{formatDate(approval.approved_at)}</span>
                    </div>
                  )}
                </div>

                {approval.comments && (
                  <div className="mt-2 border-t border-gray-100 pt-2 text-xs text-gray-600">
                    <span className="font-medium text-gray-700">Comments:</span>{" "}
                    <span>{approval.comments}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ApprovalsList;
