import { getProjects, getProject } from "./endpoints/projects";
import { getProjectTables } from "./endpoints/tables";
import { getRecentOperations } from "./endpoints/operations";
import { getGovernance } from "./endpoints/governances";
import { getTableRelations } from "./endpoints/relations";

export const DashboardAPI = {
  getProjects,
  getProject,
  getProjectTables,
  getRecentOperations,
  getGovernance,
  getTableRelations,
};
