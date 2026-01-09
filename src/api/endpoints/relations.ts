import { TableTypes, type ProjectTable, type TableRelation } from "../../types";
import { api } from "../client";
import { mockDB } from "../mock/mockServer";

export function getTableRelations(projectId: string): Promise<TableRelation[]> {
  return api(async () => {
    const tables = mockDB.project_tables[projectId];

    if (!tables) {
      return [];
    }

    const relations: TableRelation[] = [];

    const sourceTables = tables.filter(
      (t: ProjectTable) => t.table_type === TableTypes.SOURCE
    );
    const derivedTables = tables.filter(
      (t: ProjectTable) => t.table_type === TableTypes.DERIVED
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
