import type { ProjectTable, TableRelation } from "../../types";
import { api } from "../client";
import { mockDB } from "../mock/mockServer";

export function getTableRelations(projectId: string): Promise<TableRelation[]> {
  //TODO: Optimize this logic later
  return api(async () => {
    const tables = mockDB.project_tables[projectId];

    if (!tables) {
      return [];
    }

    const relations: TableRelation[] = [];

    const sourceTables = tables.filter(
      (t: ProjectTable) => t.table_type === "source"
    );
    const derivedTables = tables.filter(
      (t: ProjectTable) => t.table_type === "derived"
    );

    derivedTables.forEach((derivedTable) => {
      sourceTables.forEach((sourceTable: ProjectTable) => {
        const hasCommonColumn = derivedTable.columns.some((derivedCol) =>
          sourceTable.columns.some(
            (sourceCol) =>
              sourceCol.column_name === derivedCol.column_name &&
              sourceCol.role === "lookup"
          )
        );

        if (hasCommonColumn) {
          relations.push({
            sourceTable: sourceTable.table_name,
            targetTable: derivedTable.table_name,
          });
        }
      });
    });

    return relations;
  });
}
