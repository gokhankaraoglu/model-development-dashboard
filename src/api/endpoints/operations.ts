import type { Operation } from "../../types";
import { api } from "../client";
import { mockDB } from "../mock/mockServer";

export function getRecentOperations(projectId: string): Promise<Operation[]> {
  return api(async () => {
    if (!projectId) throw new Error(`Operations for project not found`);
    const operations = mockDB.operations[projectId];
    if (!operations) {
      return [];
    }

    return operations;
  });
}
