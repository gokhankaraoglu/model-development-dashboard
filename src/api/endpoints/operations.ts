import type { Operation } from "../../types";
import { api } from "../client";
import { mockDB } from "../mock/mockServer";

export function getRecentOperations(projectId: string): Promise<Operation[]> {
  return api(async () => {
    const operations = mockDB.operations[projectId];
    if (!operations) {
      throw new Error(`Governance data for project ${projectId} not found`);
    }

    return operations.slice(0, 10);
  });
}
