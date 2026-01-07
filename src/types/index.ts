export interface User {
  user_id: string;
  name: string;
  title?: string;
}

export interface Department {
  department_id: string;
  name: string;
}

export interface Project {
  project_id: string;
  project_name: string;
  project_type: "ML" | "TimeSeries" | "Scorecard" | "AI";
  status: "Active" | "Review" | "Approved" | "Draft" | "Locked";
  owner: User;
  governance_manager: User | null;
  department: Department;
  is_segmented: boolean;
  objectives: string;
  created_at: string;
  updated_at: string;
}

export interface Column {
  column_id: string;
  column_name: string;
  display_name: string;
  data_type: "string" | "numeric" | "datetime" | "categorical" | "boolean";
  role: "lookup" | "time_id" | "exog" | "not_used" | "endog";
}

export interface TableVersion {
  table_version_id: string;
  version_number: number;
  row_count: number;
  column_count: number;
  is_materialized: boolean;
  checkpoint_type: "raw_upload" | "user_manual" | "development_gate" | null;
  checkpoint_name?: string;
  parent_version_id?: string | null;
  created_at: string;
  created_by: string;
}

export interface ProjectTable {
  project_table_id: string;
  table_name: string;
  display_name: string;
  table_type: "source" | "derived";
  current_version_id: string;
  versions: TableVersion[];
  columns: Column[];
}

export interface Operation {
  operation_log_id: string;
  operation_type: "column_action" | "table_action";
  operation_name: string;
  input_parameters: Record<string, unknown>;
  executed_by: User;
  execution_timestamp: string;
  affected_table: string;
  output_table_version: string;
}

export interface Approval {
  approval_id: string;
  approval_type: string;
  status: "Pending" | "Approved" | "Rejected";
  approver: User & { role: string };
  requested_by?: User;
  created_at?: string;
  approved_at?: string;
  comments?: string | null;
}

export interface ComplianceChecklist {
  checklist_id: string;
  template_name: string;
  status: "not_started" | "in_progress" | "completed";
  completion_percentage: number;
  total_items: number;
  completed_items: number;
  assigned_to: User;
}

export interface Stakeholder {
  user_id: string;
  name: string;
  role: string;
}

export interface Governance {
  approvals: Approval[];
  compliance_checklist: ComplianceChecklist | null;
  stakeholders: Stakeholder[];
}

export interface DataStructure {
  projects: Project[];
  project_tables: Record<string, ProjectTable[]>;
  recent_operations: Record<string, Operation[]>;
  governance: Record<string, Governance>;
}

export interface TableRelation {
  sourceTable: string;
  targetTable: string;
}

export interface TableLineage {
  child_table: string;
  parent_table: string;
  parent_type: "source_dataset" | "derived_dataset";
}

export interface MockDB {
  projects: Project[];
  project_tables: Record<string, ProjectTable[]>;
  operations: Record<string, Operation[]>;
  governance: Record<string, Governance>;
  lineage: Record<string, TableLineage[]>;
}

export const StatusColors: Record<string, string> = {
  Active: "#16a34a",
  Review: "#f59e0b",
  Approved: "#10b981",
  Draft: "#6b7280",
  Locked: "#ef4444",
  Pending: "#f59e0b",
  Rejected: "#ef4444",
};

export const RoleColors: Record<string, string> = {
  lookup: "#3b82f6",
  time_id: "#8b5cf6",
  exog: "#10b981",
  not_used: "#6b7280",
  endog: "#f59e0b",
};
