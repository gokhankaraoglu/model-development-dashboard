import { useCallback } from "react";
import { DashboardAPI } from "../api/dashboard";
import { useFetch } from "./useFetch";

export function useProject(projectId: string) {
  const fetchProject = useCallback(
    () => DashboardAPI.getProject(projectId),
    [projectId]
  );

  return useFetch(fetchProject);
}
