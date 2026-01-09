import type { Approval, ComplianceChecklist } from "../types";

export const StatusColors: Record<string, string> = {
  Active: "bg-emerald-500",
  Review: "bg-amber-500",
  Approved: "bg-emerald-400",
  Draft: "bg-slate-500",
  Locked: "bg-red-500",
  Pending: "bg-amber-500",
  Rejected: "bg-red-500",
};

export const RoleColors: Record<string, string> = {
  lookup: "#3b82f6",
  time_id: "#8b5cf6",
  exog: "#10b981",
  not_used: "#6b7280",
  endog: "#f59e0b",
};

export const getStatusColor = (status: string) => {
  return StatusColors[status] || "bg-slate-500";
};

const TypeColorClasses: Record<string, string> = {
  ML: "bg-blue-500",
  TimeSeries: "bg-purple-500",
  Scorecard: "bg-green-500",
  AI: "bg-yellow-500",
};

export const getTypeColorClasses = (type: string) => {
  return TypeColorClasses[type] ?? "bg-blue-500";
};

export const formatOperationName = (name: string) => {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getApprovalIcon = (status: Approval["status"]) => {
  switch (status) {
    case "Pending":
      return "⏳";
    case "Approved":
      return "✅";
    case "Rejected":
      return "❌";
    default:
      return "❓";
  }
};

export const getStatusColorClass = (status: Approval["status"]) => {
  switch (status) {
    case "Approved":
      return "text-emerald-600 bg-emerald-50 ring-emerald-100";
    case "Rejected":
      return "text-red-600 bg-red-50 ring-red-100";
    case "Pending":
    default:
      return "text-amber-600 bg-amber-50 ring-amber-100";
  }
};

export const getComplianceStatusColorClass = (
  status: ComplianceChecklist["status"]
) => {
  switch (status) {
    case "completed":
      return "bg-emerald-500";
    case "in_progress":
      return "bg-amber-500";
    case "not_started":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};
