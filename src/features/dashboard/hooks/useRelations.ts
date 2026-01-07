import { DashboardAPI } from "../../../api/dashboard";
import { useFetch } from "../../../hooks/useFetch";

export function useTableRelations(projectId: string) {
  return useFetch(() => DashboardAPI.getTableRelations(projectId));
}
