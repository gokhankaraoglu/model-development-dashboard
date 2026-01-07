import type { MockDB } from "../../types";
import sample from "../data/sample_data.json";

export const mockDB = {
  projects: sample.projects,
  project_tables: sample.project_tables,
  operations: sample.recent_operations,
  governance: sample.governance,
  lineage: sample.table_lineage,
} as MockDB;
