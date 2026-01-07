import { DashboardAPI } from "../../../api/dashboard";
import { useFetch } from "../../../hooks/useFetch";

export function useGovernance(projectId: string) {
  return useFetch(() => DashboardAPI.getGovernance(projectId));
}
