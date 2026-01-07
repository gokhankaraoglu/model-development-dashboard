import type { ProjectTable } from "../../types";
import { api } from "../client";
import { mockDB } from "../mock/mockServer";

export function getProjectTables(projectId: string): Promise<ProjectTable[]> {
  return api(async () => {
    const tables = mockDB.project_tables[projectId];
    if (!tables) {
      throw new Error(`Tables for project ${projectId} not found`);
    }
    return tables;
  });
}
