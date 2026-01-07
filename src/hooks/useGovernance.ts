import { useCallback } from "react";
import { DashboardAPI } from "../api/dashboard";
import { useFetch } from "./useFetch";

export function useGovernance(projectId: string) {
  const fetchGovernance = useCallback(
    () => DashboardAPI.getGovernance(projectId),
    [projectId]
  );

  return useFetch(fetchGovernance);
}
