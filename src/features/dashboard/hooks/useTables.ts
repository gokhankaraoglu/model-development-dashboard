import { DashboardAPI } from "../../../api/dashboard";
import { useFetch } from "../../../hooks/useFetch";

export function useProjectTables(projectId: string) {
  return useFetch(() => DashboardAPI.getProjectTables(projectId));
}
