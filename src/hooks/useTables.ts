import { useCallback } from "react";
import { DashboardAPI } from "../api/dashboard";
import { useFetch } from "./useFetch";

export function useProjectTables(projectId: string) {
  const fetchTables = useCallback(
    () => DashboardAPI.getProjectTables(projectId),
    [projectId]
  );

  return useFetch(fetchTables);
}
