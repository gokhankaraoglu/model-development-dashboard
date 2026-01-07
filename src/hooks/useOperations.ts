import { useCallback } from "react";
import { DashboardAPI } from "../api/dashboard";
import { useFetch } from "./useFetch";

export function useRecentOperations(projectId: string) {
  const fetchOperations = useCallback(
    () => DashboardAPI.getRecentOperations(projectId),
    [projectId]
  );

  return useFetch(fetchOperations);
}
