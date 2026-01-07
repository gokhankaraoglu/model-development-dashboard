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
