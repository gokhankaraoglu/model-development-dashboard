import { useCallback } from "react";
import { DashboardAPI } from "../api/dashboard";
import { useFetch } from "./useFetch";

export function useTableRelations(projectId: string) {
  const fetchRelations = useCallback(
    () => DashboardAPI.getTableRelations(projectId),
    [projectId]
  );

  return useFetch(fetchRelations);
}
