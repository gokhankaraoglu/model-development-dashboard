import { type ProjectTable, type TableRelation } from "../../types";
import { api } from "../client";
import { mockDB } from "../mock/mockServer";

export function getTableRelations(projectId: string): Promise<TableRelation[]> {
  return api(async () => {
    const tables = mockDB.project_tables[projectId];
    const lineage = mockDB.lineage[projectId];

    if (!tables || !lineage) {
      return [];
    }

    const validTableNames = new Set(
      tables.map((t: ProjectTable) => t.table_name)
    );

    const relations: TableRelation[] = lineage
      .filter(
        (entry) =>
          validTableNames.has(entry.parent_table) &&
          validTableNames.has(entry.child_table)
      )
      .map((entry) => ({
        sourceTable: entry.parent_table,
        derivedTable: entry.child_table,
      }));

    return relations;
  });
}
