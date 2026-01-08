import { useState } from "react";
import { useProjectTables } from "../../../hooks/useTables";
import { EmptyState } from "../../ui/EmptyState";
import { ErrorMessage } from "../../ui/ErrorMessage";
import DataTablesSkeleton from "./DataTablesSkeleton";
import { ExpandableRow } from "./ExpandableRow";
import { useAppSelector } from "../../../store/hooks";
import { selectedProjectId } from "../../../store/selectors";

export const DataTablesSummary = () => {
  const currentProjectId = useAppSelector(selectedProjectId);
  const {
    data: tables,
    loading,
    error,
    refetch,
  } = useProjectTables(currentProjectId);

  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());

  if (loading) return <DataTablesSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!tables) return <EmptyState />;

  const toggleExpand = (tableId: string) => {
    const newExpanded = new Set(expandedTables);
    if (newExpanded.has(tableId)) {
      newExpanded.delete(tableId);
    } else {
      newExpanded.add(tableId);
    }
    setExpandedTables(newExpanded);
  };

  const columns = [
    "Table Name",
    "Type",
    "Version",
    "Rows",
    "Columns",
    "Actions",
  ];

  return (
    <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-6 pb-3 border-b-2 border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">
          Data Tables Summary
        </h2>
        <span className="text-gray-600">{tables.length} tables</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              {columns.map((label) => (
                <th
                  key={label}
                  className="bg-gray-100 p-4 text-left font-semibold text-gray-900 border-b-2 border-gray-200 text-sm"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <ExpandableRow
                key={table.project_table_id}
                table={table}
                isExpanded={expandedTables.has(table.project_table_id)}
                onToggle={() => toggleExpand(table.project_table_id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
