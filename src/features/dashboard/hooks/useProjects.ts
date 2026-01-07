import { DashboardAPI } from "../../../api/dashboard";
import { useFetch } from "../../../hooks/useFetch";

export function useProjects() {
  return useFetch(DashboardAPI.getProjects);
}

export function useProject(projectId: string) {
  return useFetch(() => DashboardAPI.getProject(projectId));
}
