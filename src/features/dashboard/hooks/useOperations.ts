import { DashboardAPI } from "../../../api/dashboard";
import { useFetch } from "../../../hooks/useFetch";

export function useRecentOperations(projectId: string) {
  return useFetch(() => DashboardAPI.getRecentOperations(projectId));
}
