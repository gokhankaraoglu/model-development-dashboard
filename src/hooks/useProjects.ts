import { useCallback } from "react";
import { DashboardAPI } from "../api/dashboard";
import { useFetch } from "./useFetch";

export function useProjects() {
  return useFetch(DashboardAPI.getProjects);
}

export function useProject(projectId: string) {
  const fetchProject = useCallback(
    () => DashboardAPI.getProject(projectId),
    [projectId]
  );

  return useFetch(fetchProject);
}
