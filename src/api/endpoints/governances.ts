import type { Governance } from "../../types";
import { api } from "../client";
import { mockDB } from "../mock/mockServer";

export function getGovernance(projectId: string): Promise<Governance> {
  return api(async () => {
    const governance = mockDB.governance[projectId];
    if (!governance) {
      throw new Error(`Governance data for project ${projectId} not found`);
    }
    return governance;
  });
}
